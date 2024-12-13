package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"strings"
)

func GetTypingRacesCount(userId string, dateFrom, dateTill *string) (int, error) {
	var count int
	queryParts := []string{`SELECT COUNT(*) FROM "TypingRacePlayers" WHERE userid = $1`}
	queryArgs := []interface{}{userId}
	paramCount := 1

	// dynamic query building for date range filtering
	if dateFrom != nil && *dateFrom != "" {
		paramCount++
		queryParts = append(queryParts, fmt.Sprintf("AND date >= $%d::DATE", paramCount))
		queryArgs = append(queryArgs, *dateFrom)
	}

	if dateTill != nil && *dateTill != "" {
		paramCount++
		queryParts = append(queryParts, fmt.Sprintf("AND date <= $%d::DATE", paramCount))
		queryArgs = append(queryArgs, *dateTill)
	}

	query := strings.Join(queryParts, " ")

	err := db.DB.QueryRow(query, queryArgs...).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("error querying TypingRaces count: %w", err)
	}

	return count, nil
}

func GetTypingRaces(userId string, page, itemsPerPage int, dateFrom, dateTill *string) ([]types.Lobby, error) {
	// Calculate offset for pagination
	offset := 0
	if page > 0 {
		offset = page * itemsPerPage
	}

	query := `
	SELECT trp.typingRacePlayerId, trp.typingRaceId, trp.username, trp.userId, trp.role,
		trp.place, trp.mistakeCount, trp.wpm,
		tr.typingRaceSettingsId, TO_CHAR(tr.date, 'YYYY-MM-DD') AS date, trs.textType, trs.textId, trs.customText,
		trs.maxPlayerCount, trs.time
	FROM "TypingRacePlayers" trp
	JOIN "TypingRaces" tr ON trp.typingRaceId = tr.typingRaceId
	JOIN "TypingRaceSettings" trs ON tr.typingRaceSettingsId = trs.typingRaceSettingsId
	WHERE trp.userId = $1`

	queryParts := []string{query}
	queryArgs := []interface{}{userId}
	paramCount := 1

	if dateFrom != nil && *dateFrom != "" {
		paramCount++
		queryParts = append(queryParts, fmt.Sprintf("AND tr.date >= $%d::DATE", paramCount))
		queryArgs = append(queryArgs, *dateFrom)
	}

	if dateTill != nil && *dateTill != "" {
		paramCount++
		queryParts = append(queryParts, fmt.Sprintf("AND tr.date <= $%d::DATE", paramCount))
		queryArgs = append(queryArgs, *dateTill)
	}

	// Add pagination parameters
	paramCount++
	queryParts = append(queryParts, fmt.Sprintf("ORDER BY tr.typingRaceId ASC LIMIT $%d", paramCount))
	queryArgs = append(queryArgs, itemsPerPage)

	paramCount++
	queryParts = append(queryParts, fmt.Sprintf("OFFSET $%d", paramCount))
	queryArgs = append(queryArgs, offset)

	// Combine all query parts
	query = strings.Join(queryParts, " ")

	rows, err := db.DB.Query(query, queryArgs...)
	if err != nil {
		return nil, fmt.Errorf("error executing query: %w", err)
	}
	defer rows.Close()

	lobbiesMap := make(map[string]*types.Lobby)

	for rows.Next() {
		var player types.Player
		var lobbySetting types.LobbySettings
		var lobbyId string
		var date string

		var textId sql.NullInt64
		var customText sql.NullString
		var userId sql.NullString

		err := rows.Scan(
			&player.LobbyId,
			&lobbyId,
			&player.Username,
			&userId,
			&player.Role,
			&player.Place,
			&player.MistakeCount,
			&player.Wpm,
			&lobbySetting.LobbySettingsId,
			&date,
			&lobbySetting.TextType,
			&textId,
			&customText,
			&lobbySetting.MaxPlayerCount,
			&lobbySetting.Time,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning row: %w", err)
		}

		// Handle nullable fields
		if userId.Valid {
			player.UserId = &userId.String
		} else {
			player.UserId = nil
		}

		if textId.Valid {
			tempInt := int(textId.Int64)
			lobbySetting.TextId = &tempInt
		} else {
			lobbySetting.TextId = nil
		}

		if customText.Valid {
			lobbySetting.CustomText = &customText.String
		} else {
			lobbySetting.CustomText = nil
		}

		// Populate or create a new lobby in the map
		lobby, exists := lobbiesMap[lobbyId]
		if !exists {
			lobby = &types.Lobby{
				LobbyId:       lobbyId,
				LobbySettings: lobbySetting,
				Date:          date,
				Players:       []types.Player{},
			}
			lobbiesMap[lobbyId] = lobby
		}
		lobby.Players = append(lobby.Players, player)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	var races []types.Lobby
	for _, lobby := range lobbiesMap {
		races = append(races, *lobby)
	}

	// handle case where requested page has no results
	if len(races) == 0 && page > 0 {
		return nil, fmt.Errorf("no records available for page %d", page)
	}

	return races, nil
}

func PostTypingRaceSettings(typingRaceSettings types.LobbySettings) (int, error) {
	// textId based on the settings
	var textId interface{}
	if typingRaceSettings.TextType == "custom" {
		textId = nil
	} else {
		textId = typingRaceSettings.TextId
	}

	var typingRaceSettingsId int
	err := db.DB.QueryRow(`
		INSERT INTO "TypingRaceSettings" (textType, textId, customText, maxPlayerCount, time)
		VALUES ($1, $2, $3, $4, $5) RETURNING typingRaceSettingsId;
	`, typingRaceSettings.TextType, textId, typingRaceSettings.CustomText, typingRaceSettings.MaxPlayerCount, typingRaceSettings.Time).Scan(&typingRaceSettingsId)
	if err != nil {
		return 0, fmt.Errorf("failed to insert TypingRaceSettings: %v", err)
	}

	return typingRaceSettingsId, nil
}

func PostTypingRacePlayers(typingRaceId string, typingRaceSettingsId int, typingRacePlayers []types.Player) error {
	for _, player := range typingRacePlayers {
		_, err := db.DB.Exec(`
			INSERT INTO "TypingRacePlayers" (typingRacePlayerId, typingRaceId, username, userId, role, place, mistakeCount, wpm, typingRaceSettingsId)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
		`, player.PlayerId, typingRaceId, player.Username, player.UserId, player.Role, player.Place, player.MistakeCount, player.Wpm, typingRaceSettingsId)
		if err != nil {
			return fmt.Errorf("failed to insert TypingRacePlayer: %v", err)
		}
	}

	return nil
}

func PostTypingRace(typingRace *types.Lobby, typingRaceSettings types.LobbySettings, typingRacePlayers []types.Player) error {

	var typingRaceSettingsId int
	var textId interface{}
	if typingRaceSettings.TextType == "custom" {
		textId = nil
	} else {
		textId = typingRaceSettings.TextId
	}

	err := db.DB.QueryRow(`
		INSERT INTO "TypingRaceSettings" (textType, textId, customText, maxPlayerCount, time)
		VALUES ($1, $2, $3, $4, $5) RETURNING typingRaceSettingsId;
	`, typingRaceSettings.TextType, textId, typingRaceSettings.CustomText, typingRaceSettings.MaxPlayerCount, typingRaceSettings.Time).Scan(&typingRaceSettingsId)
	if err != nil {
		return fmt.Errorf("failed to insert TypingRaceSettings: %v", err)
	}

	_, err = db.DB.Exec(`
		INSERT INTO "TypingRaces" (typingRaceId, typingRaceSettingsId, date)
		VALUES ($1, $2, $3) RETURNING typingRaceId;
	`, typingRace.LobbyId, typingRaceSettingsId, typingRace.Date)
	if err != nil {
		return fmt.Errorf("failed to insert TypingRace: %v", err)
	}

	for _, player := range typingRacePlayers {
		var userId interface{}
		if player.UserId == nil {
			userId = nil
		} else {
			userId = player.UserId
		}
		_, err = db.DB.Exec(`
			INSERT INTO "TypingRacePlayers" (typingRacePlayerId, typingRaceId, username, userId, role, place, mistakeCount, wpm)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
		`, player.PlayerId, typingRace.LobbyId, player.Username, userId, player.Role, player.Place, player.MistakeCount, player.Wpm)
		if err != nil {
			return fmt.Errorf("failed to insert TypingRacePlayer: %v", err)
		}
	}

	return nil
}
