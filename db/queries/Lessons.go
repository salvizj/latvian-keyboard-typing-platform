package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
)

func GetLesson(id int) (*types.Lesson, error) {
	query := `SELECT id, lessonText FROM Lessons WHERE id = ?`

	var lesson types.Lesson

	err := db.DB.QueryRow(query, id).Scan(&lesson.Id, &lesson.LessonText)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("no lesson found with id %d", id)
		}
		return nil, fmt.Errorf("error fetching lesson: %v", err)
	}
	return &lesson, nil
}
