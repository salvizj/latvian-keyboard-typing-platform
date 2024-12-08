package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func PostGameRecordHandler(c echo.Context) error {
	var data struct {
		GameName   string `json:"gameName"`
		UserId     string `json:"userId"`
		GameRecord int    `json:"gameRecord"`
	}

	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request data",
		})
	}

	err := queries.PostGameRecord(data.GameName, data.UserId, data.GameRecord)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to post game record. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, err)
}
