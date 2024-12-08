package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
)

func InsertUserIfNotExists(userId string) (string, error) {
	var existingUserId string

	checkQuery := `SELECT userId FROM "Users" WHERE userId = $1`
	err := db.DB.QueryRow(checkQuery, userId).Scan(&existingUserId)

	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			insertQuery := `INSERT INTO "Users" (userId) VALUES ($1) RETURNING userId`
			err := db.DB.QueryRow(insertQuery, userId).Scan(&existingUserId)
			if err != nil {
				return "", fmt.Errorf("error inserting user: %v", err)
			}
		} else {
			return "", fmt.Errorf("error checking user: %v", err)
		}
	}

	return existingUserId, nil
}
