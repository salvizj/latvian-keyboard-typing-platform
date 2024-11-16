package types

type Lessons struct {
	Id         int    `json:"id"`
	LessonType string `json:"lessonType"`
	LessonText string `json:"lessonText"`
}
