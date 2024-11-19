package queries

import (
	"database/sql"
	"fmt"
	"latvian-typing-tutor/db"
	"latvian-typing-tutor/types"
)

func GetLesson(id int) (*types.Lessons, error) {
	query := `SELECT id, lessonType, lessonText FROM Lessons WHERE id = ?`

	var lesson types.Lessons

	err := db.DB.QueryRow(query, id).Scan(&lesson.Id, &lesson.LessonType, &lesson.LessonText)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("no lesson found with id %d", id)
		}
		return nil, fmt.Errorf("error fetching lesson: %v", err)
	}
	return &lesson, nil
}
