package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

// PostGameRecordHandler handles inserting game records
func PostGameRecordHandler(c echo.Context) error {
	var data struct {
		GameName   string `json:"gameName"`
		GameRecord int    `json:"gameRecord"`
		UserID     string `json:"userId"`
	}

	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request data",
		})
	}

	err := queries.PostGameRecord(data.GameName, data.UserID, data.GameRecord)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to post game record. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, err)
}
