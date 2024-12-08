package queries

import (
	"database/sql"
	"latvianKeyboardTypingPlatform/db"
)

func GetGameRecord(gameName, userId string) (int, error) {
	var record int

	query := `
        SELECT record  FROM "GameRecords" WHERE "gameName" = $1 AND 
		"userId" = $2 
        LIMIT 1;
    `

	err := db.DB.QueryRow(query, gameName, userId).Scan(&record)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, nil
		}
		return 0, err
	}

	return record, nil
}
