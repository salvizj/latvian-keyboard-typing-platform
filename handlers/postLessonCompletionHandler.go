package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

// PostLessonCompletionHandler handles lesson completion
func PostLessonCompletionHandler(c echo.Context) error {
	var data struct {
		UserID   string `json:"userId"`
		LessonID int    `json:"lessonId"`
	}

	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request data",
		})
	}

	err := queries.PostLessonCompletion(data.UserID, data.LessonID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to save lesson progress. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"message": "Lesson completion successfully recorded.",
	})
}
