package types

type Lesson struct {
	Id         int    `json:"id"`
	LessonType string `json:"lessonType"`
	LessonText string `json:"lessonText"`
}
type PoetText struct {
	Id               int    `json:"id"`
	PoetAuthor       string `json:"poetAuthor"`
	PoetFragmentName string `json:"poetFragment"`
	PoetTextContent  string `json:"poetText"`
}
