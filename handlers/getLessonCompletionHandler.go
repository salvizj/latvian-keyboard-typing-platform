package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

func GetLessonCompletionHandler(c echo.Context) error {
	userId := c.QueryParam("userId")
	lessonIdsParam := c.QueryParam("lessonIds")

	if userId == "" || lessonIdsParam == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Missing required parameters",
		})
	}

	var lessonIds []int
	lessonIdsStr := strings.Split(lessonIdsParam, ",")
	for _, idStr := range lessonIdsStr {
		lessonId, err := strconv.Atoi(idStr)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": fmt.Sprintf("Invalid lessonId format: %s", idStr),
			})
		}
		lessonIds = append(lessonIds, lessonId)
	}

	fmt.Println("Parsed lessonIds:", lessonIds)

	lessonCompletion, err := queries.GetLessonCompletion(userId, lessonIds)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to retrieve lesson completion status. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, lessonCompletion)
}
