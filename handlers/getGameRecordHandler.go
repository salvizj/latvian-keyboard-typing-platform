package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetGameRecordHandler(c echo.Context) error {
	gameName := c.QueryParam("gameName")
	userId := c.QueryParam("userId")

	if gameName == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "game name missing",
		})
	}

	if userId == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "userId name missing",
		})
	}
	record, err := queries.GetGameRecord(gameName, userId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to fetch game record. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, record)
}
