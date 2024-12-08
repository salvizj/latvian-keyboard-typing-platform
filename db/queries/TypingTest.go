package queries

import (
	"database/sql"
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
		INSERT INTO "TypingTestSettings" (textType, textId, customText, time)
		VALUES ($1, $2, $3, $4) RETURNING typingTestSettingsId;
	`

	var typingTestSettingsId int
	err := db.DB.QueryRow(query, settings.TextType, textId, settings.CustomText, settings.Time).Scan(&typingTestSettingsId)
	if err != nil {
		return 0, fmt.Errorf("error inserting TypingTestSettings: %v", err)
	}

	return typingTestSettingsId, nil
}

func PostTypingTest(typingTest types.TypingTest, typingTestSettings types.TypingTestSettings) error {

	_, err := InsertUserIfNotExists(typingTest.UserId)
	if err != nil {
		return fmt.Errorf("error ensuring user exists: %v", err)
	}

	typingTestSettingsId, err := PostTypingTestSettings(typingTestSettings)
	if err != nil {
		return fmt.Errorf("error creating TypingTestSettings: %v", err)
	}

	query := `
		INSERT INTO "TypingTests" (userId, typingTestSettingsId, wpm, mistakeCount, date)
		VALUES ($1, $2, $3, $4, $5);
	`
	_, err = db.DB.Exec(query, typingTest.UserId, typingTestSettingsId, typingTest.Wpm, typingTest.MistakeCount, typingTest.Date)
	if err != nil {
		return fmt.Errorf("error inserting TypingTest: %v", err)
	}

	return nil
}

func GetTypingTestsCount(userId string) (int, error) {
	var count int
	query := `SELECT COUNT(*) FROM "TypingTests" WHERE userId = $1`
	err := db.DB.QueryRow(query, userId).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("error querying TypingTests count: %w", err)
	}
	return count, nil
}

func GetTypingTests(userId string, page, itemsPerPage int) ([]types.TypingTest, []types.TypingTestSettings, error) {
	offset := 0
	if page > 0 {
		offset = page * itemsPerPage
	}
	query := `
    SELECT tt.typingTestId, tt.userId, tt.typingTestSettingsId, tt.wpm, tt.mistakeCount, TO_CHAR(tt.date, 'YYYY-MM-DD') AS date,
           tts.typingTestSettingsId, tts.textType, tts.textId, tts.customText, tts.time
    FROM "TypingTests" tt
    JOIN "TypingTestSettings" tts ON tt.typingTestSettingsId = tts.typingTestSettingsId
    WHERE tt.userId = $1
    LIMIT $2 OFFSET $3;
`

	rows, err := db.DB.Query(query, userId, itemsPerPage, offset)
	if err != nil {
		return nil, nil, fmt.Errorf("error executing query: %w", err)
	}
	defer rows.Close()

	// slices to hold the data from the query results
	var tests []types.TypingTest
	var settings []types.TypingTestSettings

	for rows.Next() {

		// iterate over the query results and populate the slices
		var test types.TypingTest
		var setting types.TypingTestSettings
		var textId sql.NullInt64
		var customText sql.NullString

		err := rows.Scan(
			&test.TypingTestId, &test.UserId, &test.TypingTestSettingsId, &test.Wpm, &test.MistakeCount, &test.Date,
			&setting.TypingTestSettingsId, &setting.TextType, &textId, &customText, &setting.Time,
		)
		if err != nil {
			return nil, nil, fmt.Errorf("error scanning row: %w", err)
		}

		if textId.Valid {
			setting.TextId = int(textId.Int64)
		} else {
			setting.TextId = 0
		}

		if customText.Valid {
			setting.CustomText = customText.String
		} else {
			setting.CustomText = ""
		}

		// append to the slices
		tests = append(tests, test)
		settings = append(settings, setting)
	}

	if err := rows.Err(); err != nil {
		return nil, nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return tests, settings, nil
}
