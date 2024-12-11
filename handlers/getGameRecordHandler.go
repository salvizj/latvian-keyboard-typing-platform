package handlers

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetGameRecordHandler(c echo.Context) error {
	gameName := c.QueryParam("gameName")
	userId := c.QueryParam("userId")

	if gameName == "" || userId == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Misisng required parameters",
		})
	}

	record, err := queries.GetGameRecord(gameName, userId)
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
