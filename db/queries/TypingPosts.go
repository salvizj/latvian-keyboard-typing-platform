package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
)

func PostTypingTestSettings(settings types.TypingTestSettings) (int, error) {
	var textId interface{}
	if settings.TextType == "custom" {
		textId = nil
	} else {
		textId = settings.TextId
	}

	query := `
		INSERT INTO TypingTestSettings (textType, textId, customText, time)
		VALUES ($1, $2, $3, $4) RETURNING typingTestSettingsId;
	`

	var typingTestSettingsId int
	err := db.DB.QueryRow(query, settings.TextType, textId, settings.CustomText, settings.Time).Scan(&typingTestSettingsId)
	if err != nil {
		return 0, fmt.Errorf("error inserting TypingTestSettings: %v", err)
	}

	return typingTestSettingsId, nil
}

// PostTypingTest handles inserting the user, typing test settings, and the typing test itself.
func PostTypingTest(typingTest types.TypingTest, typingTestSettings types.TypingTestSettings) error {
	// Ensure the user exists in the Users table (insert if not exists)
	_, err := InsertUserIfNotExists(typingTest.UserId)
	if err != nil {
		return fmt.Errorf("error ensuring user exists: %v", err)
	}

	// Insert TypingTestSettings and get its ID
	typingTestSettingsId, err := PostTypingTestSettings(typingTestSettings)
	if err != nil {
		return fmt.Errorf("error creating TypingTestSettings: %v", err)
	}

	// Insert the TypingTest with the valid userId and TypingTestSettingsId
	query := `
		INSERT INTO TypingTests (userId, typingTestSettingsId, wpm, mistakeCount, date)
		VALUES ($1, $2, $3, $4, $5);
	`
	_, err = db.DB.Exec(query, typingTest.UserId, typingTestSettingsId, typingTest.Wpm, typingTest.MistakeCount, typingTest.Date)
	if err != nil {
		return fmt.Errorf("error inserting TypingTest: %v", err)
	}

	return nil
}

// InsertUserIfNotExists checks if the user exists, and inserts if not
func InsertUserIfNotExists(userId string) (string, error) {
	var existingUserId string

	// Check if the user already exists in the Users table
	checkQuery := `SELECT userId FROM Users WHERE userId = $1`
	err := db.DB.QueryRow(checkQuery, userId).Scan(&existingUserId)

	// If no rows are returned (user does not exist), insert a new user
	if err != nil {
		if err.Error() == "sql: no rows in result set" {
			insertQuery := `INSERT INTO Users (userId) VALUES ($1) RETURNING userId`
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
