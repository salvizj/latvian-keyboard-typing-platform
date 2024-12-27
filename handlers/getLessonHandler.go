package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// GetLessonHandler handles getting lessons
func GetLessonHandler(c echo.Context) error {
	lessonIDStr := c.QueryParam("lessonId")

	lessonID, err := strconv.Atoi(lessonIDStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid lessonId, must be a number",
		})
	}

	lesson, err := queries.GetLesson(lessonID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "Lesson not found",
		})
	}

	return c.JSON(http.StatusOK, lesson)
}
