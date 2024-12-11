package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
)

func GetGameRecord(gameName, userId string) (int, error) {
	query := `
    SELECT record FROM "GameRecords" WHERE gameName = $1 AND userId = $2
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

	// check if a record already exists for the user and the game
	var existingRecord int
	err := db.DB.QueryRow(`
		SELECT record FROM "GameRecords" WHERE userId = $1 AND gameName = $2
	`, userId, gameName).Scan(&existingRecord)

	// ff no record exists, we can insert the new record
	if err == sql.ErrNoRows {
		query := `
		INSERT INTO "GameRecords" (gameName, userId,  record)
		VALUES ($1, $2, $3)
		`
		_, err := db.DB.Exec(query, gameName, userId, gameRecord)
		if err != nil {
			return fmt.Errorf("error inserting new game record: %v", err)
		}
		return nil
	} else if err != nil {
		// Handle other potential errors in the query
		return fmt.Errorf("error querying existing game record: %v", err)
	}

	// if a record exists, only update if the new record is greater
	if gameRecord > existingRecord {
		query := `
			UPDATE "GameRecords"
			SET record = $1
			WHERE userId = $2 AND gameName = $3
		`
		_, err := db.DB.Exec(query, gameRecord, userId, gameName)
		if err != nil {
			return fmt.Errorf("error updating game record: %v", err)
		}
	}

	return nil
}
