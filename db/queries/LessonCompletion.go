package queries

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"

	"github.com/lib/pq"
)

// PostLessonCompletion inserts lessonCompletion
func PostLessonCompletion(userID string, lessonID int) error {

	query := `
		INSERT INTO "LessonCompletion" (userId, lessonId)
		VALUES ($1, $2)
		ON CONFLICT (userId, lessonId) DO NOTHING;
	`

	_, err := db.DB.Exec(query, userID, lessonID)
	if err != nil {
		return fmt.Errorf("error inserting lesson completion: %v", err)
	}

	return nil
}

// GetLessonCompletion gets completed lessons map based on given userID and lessonIds
func GetLessonCompletion(userID string, lessonIds []int) (map[int]bool, error) {
	query := `
        SELECT lessonid
        FROM "LessonCompletion"
        WHERE userid = $1 AND lessonid = any($2);
    `
	rows, err := db.DB.Query(query, userID, pq.Array(lessonIds))
	if err != nil {
		return nil, fmt.Errorf("query failed: %w", err)
	}
	defer rows.Close()

	result := make(map[int]bool)
	for rows.Next() {
		var lessonID int
		if err := rows.Scan(&lessonID); err != nil {
			return nil, fmt.Errorf("failed to scan lessonId: %w", err)
		}
		result[lessonID] = true
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error reading rows: %w", err)
	}

	return result, nil
}
