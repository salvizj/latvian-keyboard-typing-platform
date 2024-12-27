package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
)

// GetLesson gets lesson object based on lessonID
func GetLesson(lessonID int) (*types.Lesson, error) {
	query := `SELECT lessonId, lessonText, lessonDifficulty FROM "Lessons" WHERE lessonId = $1`

	var lesson types.Lesson

	err := db.DB.QueryRow(query, lessonID).Scan(&lesson.LessonID, &lesson.LessonText, &lesson.LessonDifficulty)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("no lesson found with lessonId %d", lessonID)
		}
		return nil, fmt.Errorf("error fetching lesson: %v", err)
	}

	return &lesson, nil
}

// GetLessons gets all lesson objects
func GetLessons() ([]types.Lesson, error) {
	query := `SELECT lessonId, lessonText, lessonDifficulty FROM "Lessons" ORDER BY lessonId ASC`

	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("error fetching lessons: %v", err)
	}
	defer rows.Close()

	var lessons []types.Lesson

	for rows.Next() {
		var lesson types.Lesson
		if err := rows.Scan(&lesson.LessonID, &lesson.LessonText, &lesson.LessonDifficulty); err != nil {
			return nil, fmt.Errorf("error scanning lesson row: %v", err)
		}
		lessons = append(lessons, lesson)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating lesson rows: %v", err)
	}

	return lessons, nil
}
