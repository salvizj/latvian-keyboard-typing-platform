package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetTypingTestsAndRacesCountHandler handles getting tests and races count
func GetTypingTestsAndRacesCountHandler(c echo.Context) error {
	userID := c.QueryParam("userId")
	dateFromStr := c.QueryParam("dateFrom")
	dateTillStr := c.QueryParam("dateTill")

	if userID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "User ID is required",
		})
	}

	var dateFrom, dateTill *string
	if dateFromStr != "" {
		dateFrom = &dateFromStr
	}
	if dateTillStr != "" {
		dateTill = &dateTillStr
	}

	testsCount, err := queries.GetTypingTestsCount(userID, dateFrom, dateTill)
	if err != nil {
		log.Println("Error getting typing test count:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Error getting typing test count.",
		})
	}

	racesCount, err := queries.GetTypingRacesCount(userID, dateFrom, dateTill)
	if err != nil {
		log.Println("Error getting typing race count:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Error getting typing race count.",
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"testsCount": testsCount,
		"racesCount": racesCount,
	})
}
