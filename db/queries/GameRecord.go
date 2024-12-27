package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
)

// GetGameRecord returns and int based on gameName and userID
func GetGameRecord(gameName, userID string) (int, error) {
	query := `
    SELECT gamerecord FROM "GameRecords" WHERE gameName = $1 AND userID = $2
    `
	var record int
	err := db.DB.QueryRow(query, gameName, userID).Scan(&record)
	if err != nil {
		if err == sql.ErrNoRows {
			// return 0 if no records are found
			return 0, nil
		}
		return 0, fmt.Errorf("failed to execute query: %v", err)
	}
	return record, nil
}

// PostGameRecord inserts a new record if it is bigger or previous record didin`t exist
func PostGameRecord(gameName, userID string, gameRecord int) error {
	// Reuse the GetGameRecord function to get the current game record
	existingRecord, err := GetGameRecord(gameName, userID)
	if err != nil {
		return fmt.Errorf("error getting existing game record: %v", err)
	}

	// If no record exists, insert the new record
	if existingRecord == 0 {
		query := `
		INSERT INTO "GameRecords" (gameName, userID, gamerecord)
		VALUES ($1, $2, $3)
		`
		_, err := db.DB.Exec(query, gameName, userID, gameRecord)
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
			WHERE userID = $2 AND gameName = $3
		`
		_, err := db.DB.Exec(query, gameRecord, userID, gameName)
		if err != nil {
			return fmt.Errorf("error updating game record: %v", err)
		}
	}

	return nil
}
