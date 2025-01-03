package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"strings"
)

// PostTypingTestSettings inserts typing test settings object
func PostTypingTestSettings(settings types.TypingTestSettings) (int, error) {
	var textID interface{}
	if settings.TextType == "custom" {
		textID = nil
	} else {
		textID = settings.TextID
	}

	query := `
		INSERT INTO "TypingTestSettings" (textType, textId, customText, time)
		VALUES ($1, $2, $3, $4) RETURNING typingTestSettingsId;
	`

	var typingTestSettingsID int
	err := db.DB.QueryRow(query, settings.TextType, textID, settings.CustomText, settings.Time).Scan(&typingTestSettingsID)
	if err != nil {
		return 0, fmt.Errorf("error inserting TypingTestSettings: %v", err)
	}

	return typingTestSettingsID, nil
}

// PostTypingTest inserts typing test
func PostTypingTest(typingTest types.TypingTest, typingTestSettings types.TypingTestSettings) error {
	// create settings first to get the ID for the relationship
	typingTestSettingsID, err := PostTypingTestSettings(typingTestSettings)
	if err != nil {
		return fmt.Errorf("error creating TypingTestSettings: %v", err)
	}

	query := `
		INSERT INTO "TypingTests" (userID, typingTestSettingsId, wpm, mistakeCount, date)
		VALUES ($1, $2, $3, $4, $5);
	`
	_, err = db.DB.Exec(query, typingTest.UserID, typingTestSettingsID, typingTest.Wpm, typingTest.MistakeCount, typingTest.Date)
	if err != nil {
		return fmt.Errorf("error inserting TypingTest: %v", err)
	}

	return nil
}

// GetTypingTestsCount gets typing test count based on userID and date
func GetTypingTestsCount(userID string, dateFrom, dateTill *string) (int, error) {
	var count int
	queryParts := []string{`SELECT COUNT(*) FROM "TypingTests" WHERE userid = $1`}
	queryArgs := []interface{}{userID}
	paramCount := 1

	// dynamic query building for date range filtering
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
		return 0, fmt.Errorf("error querying TypingTests count: %w", err)
	}

	return count, nil
}

// GetTypingTests gets typing test objects
func GetTypingTests(userID string, page, itemsPerPage int, dateFrom, dateTill *string) ([]types.TypingTestWithSettings, error) {
	// calculate offset for pagination
	offset := 0
	if page > 0 {
		offset = page * itemsPerPage
	}

	query := `
    SELECT
        tt.typingTestId,
        tt.userID,
        tt.wpm,
        tt.mistakeCount,
        TO_CHAR(tt.date, 'YYYY-MM-DD') AS date,
        tts.typingTestSettingsId,
        tts.textType,
        tts.textId,
        tts.customText,
        tts.time
    FROM "TypingTests" tt
    JOIN "TypingTestSettings" tts ON tt.typingTestSettingsId = tts.typingTestSettingsId
    WHERE tt.userID = $1
	`

	queryParts := []string{query}
	queryArgs := []interface{}{userID}
	paramCount := 1

	if dateFrom != nil && *dateFrom != "" {
		paramCount++
		queryParts = append(queryParts, fmt.Sprintf("AND tt.date >= $%d::DATE", paramCount))
		queryArgs = append(queryArgs, *dateFrom)
	}

	if dateTill != nil && *dateTill != "" {
		paramCount++
		queryParts = append(queryParts, fmt.Sprintf("AND tt.date <= $%d::DATE", paramCount))
		queryArgs = append(queryArgs, *dateTill)
	}

	// add pagination parameters
	paramCount++
	queryParts = append(queryParts, fmt.Sprintf("ORDER BY tt.typingTestId ASC LIMIT $%d", paramCount))
	queryArgs = append(queryArgs, itemsPerPage)

	paramCount++
	queryParts = append(queryParts, fmt.Sprintf("OFFSET $%d", paramCount))
	queryArgs = append(queryArgs, offset)

	// combine all query parts
	query = strings.Join(queryParts, " ")

	rows, err := db.DB.Query(query, queryArgs...)
	if err != nil {
		return nil, fmt.Errorf("error executing query: %w", err)
	}
	defer rows.Close()

	var tests []types.TypingTestWithSettings

	for rows.Next() {
		var test types.TypingTestWithSettings

		err := rows.Scan(
			&test.TypingTestID,
			&test.UserID,
			&test.Wpm,
			&test.MistakeCount,
			&test.Date,
			&test.TypingTestSettings.TypingTestSettingsID,
			&test.TypingTestSettings.TextType,
			&test.TypingTestSettings.TextID,
			&test.TypingTestSettings.CustomText,
			&test.TypingTestSettings.Time,
		)

		if err != nil {
			return nil, fmt.Errorf("error scanning row: %w", err)
		}

		if test.TypingTestSettings.TextID != nil {
			writersText, err := GetWritersText(*test.TypingTestSettings.TextID)
			if err != nil {
				return nil, fmt.Errorf("error fetching writers text: %w", err)
			}
			test.TypingTestSettings.WritersText = &writersText
		}

		tests = append(tests, test)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over rows: %w", err)
	}

	return tests, nil
}
