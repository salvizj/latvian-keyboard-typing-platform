package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func PostUseridHandler(c echo.Context) error {
	var data struct {
		Userid string `json:"userId"`
	}

	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request data",
		})
	}

	err := queries.PostUserId(data.Userid)
	if err != nil {
		log.Println("Error inserting userId:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to insert userId",
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "UserId data saved successfully",
	})
}
