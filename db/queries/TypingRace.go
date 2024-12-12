package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"log"
	"strings"
)

func GetTypingRacesCount(userId string, dateFrom, dateTill *string) (int, error) {
	var count int
	queryParts := []string{`SELECT COUNT(*) FROM "TypingRacePlayers" WHERE userid = $1`}
	queryArgs := []interface{}{userId}
	paramCount := 1

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

func GetTypingRaces(userId string, page, itemsPerPage int, dateFrom, dateTill *string) ([]types.Player, []types.LobbySettings, []types.Lobby, error) {

	// calculate offset for pagination
	offset := 0
	if page > 0 {
		offset = page * itemsPerPage
	}

	// base query
	query := `
    SELECT trp.typingRacePlayerId, trp.typingRaceId, trp.username, trp.userId, trp.role,
           trp.place, trp.mistakeCount, trp.wpm, trp.typingRaceSettingsId,
           tr.typingRaceSettingsId, TO_CHAR(tr.date, 'YYYY-MM-DD') AS date, trs.textType, trs.textId, trs.customText,
           trs.maxPlayerCount, trs.time
    FROM "TypingRacePlayers" trp
    JOIN "TypingRaces" tr ON trp.typingRaceId = tr.typingRaceId
    JOIN "TypingRaceSettings" trs ON tr.typingRaceSettingsId = trs.typingRaceSettingsId
    WHERE trp.userid = $1`

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

	// add ordering, LIMIT, and OFFSET
	paramCount++
	queryParts = append(queryParts, fmt.Sprintf("ORDER BY tr.typingRaceId ASC LIMIT $%d", paramCount))
	queryArgs = append(queryArgs, itemsPerPage)

	paramCount++
	queryParts = append(queryParts, fmt.Sprintf("OFFSET $%d", paramCount))
	queryArgs = append(queryArgs, offset)

	// combine all query parts
	query = strings.Join(queryParts, " ")

	rows, err := db.DB.Query(query, queryArgs...)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("error executing query: %w", err)
	}
	defer rows.Close()

	// slices to hold the data from the query
	var players []types.Player
	var settings []types.LobbySettings
	var races []types.Lobby

	// iterate over the query results
	for rows.Next() {
		var player types.Player
		var setting types.LobbySettings
		var race types.Lobby

		err := rows.Scan(
			&player.LobbyId, &player.Username, &player.UserId, &player.Role,
			&player.Place, &player.MistakeCount, &player.Wpm, &player.LobbySettingsid, &race.Date, &setting.TextType, &setting.TextId,
			&setting.CustomText, &setting.MaxPlayerCount, &setting.Time,
		)
		if err != nil {
			return nil, nil, nil, fmt.Errorf("error scanning row: %w", err)
		}

		players = append(players, player)
		settings = append(settings, setting)
		races = append(races, race)
	}

	if err := rows.Err(); err != nil {
		return nil, nil, nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	// check if there are any results when page > 0
	if len(players) == 0 && page > 0 {
		return nil, nil, nil, fmt.Errorf("no records available for page %d", page)
	}

	return players, settings, races, nil
}

func PostTypingRaceSettings(typingRaceSettings types.LobbySettings) (int, error) {
	// Set textId based on the settings
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

func PostTypingRace(typingRace types.Lobby, typingRaceSettings types.LobbySettings, typingRacePlayers []types.Player) error {

	log.Printf("Received TypingRace: %+v", typingRace)
	log.Printf("Received TypingRaceSettings: %+v", typingRaceSettings)
	log.Printf("Received TypingRacePlayers: %+v", typingRacePlayers)

	// insert TypingRaceSettings and get its ID
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
		return fmt.Errorf("failed to insert TypingRaceSettings: %v", err)
	}

	// insert TypingRace and get its ID
	var typingRaceId string
	err = db.DB.QueryRow(`
		INSERT INTO "TypingRaces" (typingRaceId, typingSettingsId, date)
		VALUES ($1, $2, $3) RETURNING typingRaceId;
	`, typingRace.LobbyId, typingRaceSettingsId, typingRace.Date).Scan(&typingRaceId)
	if err != nil {
		return fmt.Errorf("failed to insert TypingRace: %v", err)
	}

	// insert TypingRacePlayers
	for _, player := range typingRacePlayers {
		_, err = db.DB.Exec(`
			INSERT INTO "TypingRacePlayers" (typingRacePlayerId, typingRaceId, username, userId, role, place, mistakeCount, wpm, typingRaceSettingsId)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
		`, player.LobbyId, typingRaceId, player.Username, player.UserId, player.Role, player.Place, player.MistakeCount, player.Wpm, typingRaceSettingsId)
		if err != nil {
			return fmt.Errorf("failed to insert TypingRacePlayer: %v", err)
		}
	}

	return nil
}
