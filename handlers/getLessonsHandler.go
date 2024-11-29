package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetLessonsHandler(c echo.Context) error {
	lessons, err := queries.GetLessons()
	if err != nil {
		fmt.Println("Error fetching lessons:", err)
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "Lessons not found",
		})
	}

	return c.JSON(http.StatusOK, lessons)
}
