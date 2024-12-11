package queries

import (
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

func GetTypingRaces(userId string, page, itemsPerPage int, dateFrom, dateTill *string) ([]types.TypingRacePlayer, []types.TypingRaceSettings, []types.TypingRace, error) {

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
	var players []types.TypingRacePlayer
	var settings []types.TypingRaceSettings
	var races []types.TypingRace

	// iterate over the query results
	for rows.Next() {
		var player types.TypingRacePlayer
		var setting types.TypingRaceSettings
		var race types.TypingRace

		err := rows.Scan(
			&player.TypingRacePlayerId, &player.TypingRaceId, &player.Username, &player.UserId, &player.Role,
			&player.Place, &player.MistakeCount, &player.Wpm, &player.TypingRaceSettingsId,
			&race.TypingRaceSettingsId, &race.Date, &setting.TextType, &setting.TextId,
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
