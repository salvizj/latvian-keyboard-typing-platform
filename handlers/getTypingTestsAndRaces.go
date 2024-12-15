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
	dateFromStr := c.QueryParam("dateFrom")
	dateTillStr := c.QueryParam("dateTill")

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

	var dateFrom, dateTill *string
	if dateFromStr != "" {
		dateFrom = &dateFromStr
	}
	if dateTillStr != "" {
		dateTill = &dateTillStr
	}

	switch typeStr {
	case "typingTest":
		tests, err := queries.GetTypingTests(userId, page, itemsPerPage, dateFrom, dateTill)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": fmt.Sprintf("Error fetching typing tests: %v", err),
			})
		}
		if tests == nil {
			tests = []types.TypingTestWithSettings{}
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"type":  types.TypingTestType,
			"tests": tests,
		})

	case "typingRace":
		races, err := queries.GetTypingRaces(userId, page, itemsPerPage, dateFrom, dateTill)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": fmt.Sprintf("Error fetching typing races: %v", err),
			})
		}
		if races == nil {
			races = []types.Lobby{}
		}
		return c.JSON(http.StatusOK, map[string]interface{}{
			"type":  types.TypingRaceType,
			"races": races,
		})

	default:
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid type parameter. Must be 'typingTest' or 'typingRace'",
		})
	}
}
