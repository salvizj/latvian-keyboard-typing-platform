package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
)

func GetTypingRacesCount(userId string) (int, error) {
	var count int
	query := `SELECT COUNT(*) FROM TypingRacePlayers WHERE userId = $1`
	err := db.DB.QueryRow(query, userId).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("error querying TypingRaces count: %w", err)
	}
	return count, nil
}

func GetTypingRaces(userId string, count int) ([]types.TypingRacePlayer, []types.TypingRaceSettings, []types.TypingRace, error) {

	query := `
		SELECT trp.typingRacePlayerId, trp.typingRaceId, trp.username, trp.userId, trp.role,
		       trp.place, trp.mistakeCount, trp.wpm, trp.typingRaceSettingsId,
		       tr.typingRaceSettingsId, tr.date, trs.textType, trs.textId, trs.customText, 
		       trs.maxPlayerCount, trs.time
		FROM TypingRacePlayers trp
		JOIN TypingRaces tr ON trp.typingRaceId = tr.typingRaceId
		JOIN TypingRaceSettings trs ON tr.typingRaceSettingsId = trs.typingRaceSettingsId
		WHERE trp.userId = $1
		LIMIT $2;
	`

	rows, err := db.DB.Query(query, userId, count)
	if err != nil {
		return nil, nil, nil, fmt.Errorf("error executing query: %w", err)
	}
	defer rows.Close()

	// Slices to hold the data from the query results
	var players []types.TypingRacePlayer
	var settings []types.TypingRaceSettings
	var races []types.TypingRace

	// Iterate over the query results and populate the slices
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

		// Append to the slices
		players = append(players, player)
		settings = append(settings, setting)
		races = append(races, race)
	}

	// Check for any errors encountered during iteration
	if err := rows.Err(); err != nil {
		return nil, nil, nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return players, settings, races, nil
}
