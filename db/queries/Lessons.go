package queries

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
)

func GetLesson(lessonId int) (*types.Lesson, error) {
	query := `SELECT lessonId, lessonText, lessonDifficulty FROM "Lessons" WHERE lessonId = $1`

	var lesson types.Lesson

	err := db.DB.QueryRow(query, lessonId).Scan(&lesson.LessonId, &lesson.LessonText, &lesson.LessonDifficulty)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("no lesson found with lessonId %d", lessonId)
		}
		return nil, fmt.Errorf("error fetching lesson: %v", err)
	}

	return &lesson, nil
}

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
		if err := rows.Scan(&lesson.LessonId, &lesson.LessonText, &lesson.LessonDifficulty); err != nil {
			return nil, fmt.Errorf("error scanning lesson row: %v", err)
		}
		lessons = append(lessons, lesson)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating lesson rows: %v", err)
	}

	return lessons, nil
}
