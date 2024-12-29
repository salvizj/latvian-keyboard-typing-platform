package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"strings"
)

// GetTypingRacesCount gets typing race count by userID and date
func GetTypingRacesCount(userID string, dateFrom, dateTill *string) (int, error) {
	var count int
	queryParts := []string{`SELECT COUNT(*) FROM "TypingRacePlayers" WHERE userid = $1`}
	queryArgs := []interface{}{userID}
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

// GetTypingRaces gets typing races objects based on userID, page, itemsPerPage and date
func GetTypingRaces(userID string, page, itemsPerPage int, dateFrom, dateTill *string) ([]types.Lobby, error) {
	offset := 0
	if page > 0 {
		offset = page * itemsPerPage
	}

	query := `
    SELECT
    	trp.typingRacePlayerId,
    	trp.typingRaceId,
    	trp.username,
    	trp.userId,
    	trp.role,
    	trp.place,
    	trp.mistakeCount,
    	trp.wpm,
    	tr.typingRaceSettingsId,
    	TO_CHAR(tr.date, 'YYYY-MM-DD') AS date,
    	trs.textType,
    	trs.textId,
    	trs.customText,
    	trs.maxPlayerCount,
    	trs.time
	FROM "TypingRaces" tr
	JOIN "TypingRacePlayers" trp ON tr.typingRaceId = trp.typingRaceId
	JOIN "TypingRaceSettings" trs ON tr.typingRaceSettingsId = trs.				typingRaceSettingsId
	WHERE tr.typingRaceId IN (
    	SELECT 
		DISTINCT tr.typingRaceId
    	FROM "TypingRaces" tr
    	JOIN "TypingRacePlayers" trp ON tr.typingRaceId = trp.typingRaceId
    	WHERE trp.userId = $1
    	ORDER BY tr.typingRaceId DESC
    	LIMIT $2 OFFSET $3
	)
	ORDER BY tr.typingRaceId DESC`

	rows, err := db.DB.Query(query, userID, itemsPerPage, offset)
	if err != nil {
		return nil, fmt.Errorf("error executing query to get races: %w", err)
	}
	defer rows.Close()

	lobbiesMap := make(map[string]*types.Lobby)

	for rows.Next() {
		var player types.Player
		var lobbySetting types.LobbySettings
		var raceID string
		var date string

		err := rows.Scan(
			&player.PlayerID,
			&raceID,
			&player.Username,
			&player.UserID,
			&player.Role,
			&player.Place,
			&player.MistakeCount,
			&player.Wpm,
			&lobbySetting.LobbySettingsID,
			&date,
			&lobbySetting.TextType,
			&lobbySetting.TextID,
			&lobbySetting.CustomText,
			&lobbySetting.MaxPlayerCount,
			&lobbySetting.Time,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning player row: %w", err)
		}

		if lobbySetting.TextID != nil {
			writersText, err := GetWritersText(*lobbySetting.TextID)
			if err != nil {
				return nil, fmt.Errorf("error fetching writers text: %w", err)
			}
			lobbySetting.WritersText = &writersText
		}

		lobby, exists := lobbiesMap[raceID]
		if !exists {
			lobby = &types.Lobby{
				LobbyID:       raceID,
				LobbySettings: lobbySetting,
				Date:          date,
				Players:       []types.Player{},
			}
			lobbiesMap[raceID] = lobby
		}
		lobby.Players = append(lobby.Players, player)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	races := make([]types.Lobby, 0, len(lobbiesMap))
	for _, lobby := range lobbiesMap {
		races = append(races, *lobby)
	}

	return races, nil
}

// PostTypingRaceSettings inserts typing race settings
func PostTypingRaceSettings(typingRaceSettings types.LobbySettings) (int, error) {
	// textID based on the settings
	var textID interface{}
	if typingRaceSettings.TextType == "custom" {
		textID = nil
	} else {
		textID = typingRaceSettings.TextID
	}

	var typingRaceSettingsID int
	err := db.DB.QueryRow(`
		INSERT INTO "TypingRaceSettings" (textType, textId, customText, maxPlayerCount, time)
		VALUES ($1, $2, $3, $4, $5) RETURNING typingRaceSettingsId;
	`, typingRaceSettings.TextType, textID, typingRaceSettings.CustomText, typingRaceSettings.MaxPlayerCount, typingRaceSettings.Time).Scan(&typingRaceSettingsID)
	if err != nil {
		return 0, fmt.Errorf("failed to insert TypingRaceSettings: %v", err)
	}

	return typingRaceSettingsID, nil
}

// PostTypingRacePlayers inserts typing race players
func PostTypingRacePlayers(typingRaceID string, typingRaceSettingsID int, typingRacePlayers []types.Player) error {
	for _, player := range typingRacePlayers {
		_, err := db.DB.Exec(`
			INSERT INTO "TypingRacePlayers" (typingRacePlayerId, typingRaceId, username, userId, role, place, mistakeCount, wpm, typingRaceSettingsId)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
		`, player.PlayerID, typingRaceID, player.Username, player.UserID, player.Role, player.Place, player.MistakeCount, player.Wpm, typingRaceSettingsID)
		if err != nil {
			return fmt.Errorf("failed to insert TypingRacePlayer: %v", err)
		}
	}

	return nil
}

// PostTypingRace inserts typing race data
func PostTypingRace(typingRace *types.Lobby, typingRaceSettings types.LobbySettings, typingRacePlayers []types.Player) error {

	var typingRaceSettingsID int
	var textID interface{}
	if typingRaceSettings.TextType == "custom" {
		textID = nil
	} else {
		textID = typingRaceSettings.TextID
	}

	err := db.DB.QueryRow(`
		INSERT INTO "TypingRaceSettings" (textType, textId, customText, maxPlayerCount, time)
		VALUES ($1, $2, $3, $4, $5) RETURNING typingRaceSettingsId;
	`, typingRaceSettings.TextType, textID, typingRaceSettings.CustomText, typingRaceSettings.MaxPlayerCount, typingRaceSettings.Time).Scan(&typingRaceSettingsID)
	if err != nil {
		return fmt.Errorf("failed to insert TypingRaceSettings: %v", err)
	}

	_, err = db.DB.Exec(`
		INSERT INTO "TypingRaces" (typingRaceId, typingRaceSettingsId, date)
		VALUES ($1, $2, $3) RETURNING typingRaceId;
	`, typingRace.LobbyID, typingRaceSettingsID, typingRace.Date)
	if err != nil {
		return fmt.Errorf("failed to insert TypingRace: %v", err)
	}

	for _, player := range typingRacePlayers {
		var userID interface{}
		if player.UserID == nil {
			userID = nil
		} else {
			userID = player.UserID
		}
		_, err = db.DB.Exec(`
			INSERT INTO "TypingRacePlayers" (typingRacePlayerId, typingRaceId, username, userId, role, place, mistakeCount, wpm)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
		`, player.PlayerID, typingRace.LobbyID, player.Username, userID, player.Role, player.Place, player.MistakeCount, player.Wpm)
		if err != nil {
			return fmt.Errorf("failed to insert TypingRacePlayer: %v", err)
		}
	}

	return nil
}
