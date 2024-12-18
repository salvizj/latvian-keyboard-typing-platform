package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
)

func GetGameRecord(gameName, userId string) (int, error) {
	query := `
    SELECT gamerecord FROM "GameRecords" WHERE gameName = $1 AND userId = $2
    `
	var record int
	err := db.DB.QueryRow(query, gameName, userId).Scan(&record)
	if err != nil {
		if err == sql.ErrNoRows {
			// return 0 if no records are found
			return 0, nil
		}
		return 0, fmt.Errorf("failed to execute query: %v", err)
	}
	return record, nil
}

func PostGameRecord(gameName, userId string, gameRecord int) error {
	// Reuse the GetGameRecord function to get the current game record
	existingRecord, err := GetGameRecord(gameName, userId)
	if err != nil {
		return fmt.Errorf("error getting existing game record: %v", err)
	}

	// If no record exists, insert the new record
	if existingRecord == 0 {
		query := `
		INSERT INTO "GameRecords" (gameName, userId, gamerecord)
		VALUES ($1, $2, $3)
		`
		_, err := db.DB.Exec(query, gameName, userId, gameRecord)
		if err != nil {
			return fmt.Errorf("error inserting new game record: %v", err)
		}
		return nil
	}

	// If a record exists, only update if the new record is greater
	if gameRecord > existingRecord {
		query := `
			UPDATE "GameRecords"
			SET gamerecord = $1
			WHERE userId = $2 AND gameName = $3
		`
		_, err := db.DB.Exec(query, gameRecord, userId, gameName)
		if err != nil {
			return fmt.Errorf("error updating game record: %v", err)
		}
	}

	return nil
}
