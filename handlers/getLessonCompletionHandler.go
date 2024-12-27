package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

// GetLessonCompletionHandler handles  gettings completed lessons
func GetLessonCompletionHandler(c echo.Context) error {
	userID := c.QueryParam("userId")
	lessonIdsParam := c.QueryParam("lessonIds")

	if userID == "" || lessonIdsParam == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Missing required parameters",
		})
	}

	var lessonIds []int
	lessonIdsStr := strings.Split(lessonIdsParam, ",")
	for _, idStr := range lessonIdsStr {
		lessonID, err := strconv.Atoi(idStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": fmt.Sprintf("Invalid lessonId format: %s", idStr),
			})
		}
		lessonIds = append(lessonIds, lessonID)
	}

	lessonCompletion, err := queries.GetLessonCompletion(userID, lessonIds)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to retrieve lesson completion status. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, lessonCompletion)
}
