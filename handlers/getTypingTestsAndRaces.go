package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"latvianKeyboardTypingPlatform/types"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetTypingTestsAndRaces(c echo.Context) error {
	userId := c.QueryParam("userId")
	countStr := c.QueryParam("count")
	typeStr := c.QueryParam("type")

	if userId == "" || countStr == "" || typeStr == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Missing required parameters",
		})
	}

	count, err := strconv.Atoi(countStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid count parameter",
		})
	}

	switch typeStr {
	case "typingTest":
		tests, settings, err := queries.GetTypingTests(userId, count)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": fmt.Sprintf("Error fetching typing tests: %v", err),
			})
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"type":     types.TypingTestType,
			"tests":    tests,
			"settings": settings,
		})

	case "typingRace":
		players, settings, races, err := queries.GetTypingRaces(userId, count)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": fmt.Sprintf("Error fetching typing races: %v", err),
			})
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"type":     types.TypingRaceType,
			"players":  players,
			"settings": settings,
			"races":    races,
		})

	default:
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid type parameter. Must be 'typingTest' or 'typingRace'",
		})
	}
}
