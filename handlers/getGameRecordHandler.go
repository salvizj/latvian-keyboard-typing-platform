package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetGameRecordHandler handles getting game record
func GetGameRecordHandler(c echo.Context) error {
	gameName := c.QueryParam("gameName")
	userID := c.QueryParam("userId")

	if gameName == "" || userID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Misisng required parameters",
		})
	}

	record, err := queries.GetGameRecord(gameName, userID)
	if err != nil {
		fmt.Printf("Error fetching game record: %v\n", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to fetch game record. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, map[string]int{
		"record": record,
	})
}
