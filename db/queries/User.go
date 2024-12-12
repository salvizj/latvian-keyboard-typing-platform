package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
)

func PostUserId(userId string) error {
	insertQuery := `INSERT INTO "Users" (userId) VALUES ($1)`
	_, err := db.DB.Exec(insertQuery, userId)
	if err != nil {
		return fmt.Errorf("error inserting user: %v", err)
	}

	return nil
}
