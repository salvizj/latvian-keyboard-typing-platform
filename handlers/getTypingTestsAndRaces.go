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
	typeStr := c.QueryParam("type")
	pageStr := c.QueryParam("page")
	itemsPerPageStr := c.QueryParam("itemsPerPage")

	if userId == "" || typeStr == "" || pageStr == "" || itemsPerPageStr == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Missing required parameters",
		})
	}

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid page parameter",
		})
	}

	itemsPerPage, err := strconv.Atoi(itemsPerPageStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid itemsPerPage parameter",
		})
	}

	switch typeStr {
	case "typingTest":
		tests, settings, err := queries.GetTypingTests(userId, page, itemsPerPage)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": fmt.Sprintf("Error fetching typing tests: %v", err),
			})
		}
		// check for empty results
		if len(tests) == 0 || len(settings) == 0 {
			return c.JSON(http.StatusOK, map[string]interface{}{
				"type":     types.TypingTestType,
				"tests":    []interface{}{},
				"settings": []interface{}{},
			})
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"type":     types.TypingTestType,
			"tests":    tests,
			"settings": settings,
		})

	case "typingRace":
		players, settings, races, err := queries.GetTypingRaces(userId, page, itemsPerPage)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": fmt.Sprintf("Error fetching typing races: %v", err),
			})
		}
		// check for empty results
		if len(players) == 0 || len(settings) == 0 || len(races) == 0 {
			return c.JSON(http.StatusOK, map[string]interface{}{
				"type":     types.TypingRaceType,
				"players":  []interface{}{},
				"settings": []interface{}{},
				"races":    []interface{}{},
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
