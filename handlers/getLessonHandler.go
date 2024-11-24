package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetLessonHandler(c echo.Context) error {
	lessonIdStr := c.Param("id")

	// Convert the string to an integer
	lessonId, err := strconv.Atoi(lessonIdStr)
	if err != nil {
		// Return a 400 Bad Request if the conversion fails
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid ID, must be a number",
		})
	}

	lesson, err := queries.GetLesson(lessonId)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "Lesson not found",
		})
	}

	return c.JSON(http.StatusOK, lesson)
}
