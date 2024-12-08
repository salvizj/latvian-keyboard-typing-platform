package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetLessonCompletionHandler(c echo.Context) error {
	lessonIds := c.QueryParam("lessonIds")
	userId := c.QueryParam("userId")

	if userId == "" || lessonIds == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Missing required parameters",
		})
	}

	lessonCompletion, err := queries.GetLessonCompletion(userId, lessonIds)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to retrieve lesson completion status. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, lessonCompletion)
}
