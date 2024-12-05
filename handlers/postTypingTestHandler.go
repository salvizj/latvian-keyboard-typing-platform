package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"latvianKeyboardTypingPlatform/types"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func PostTypingTestHandler(c echo.Context) error {
	var data struct {
		TypingTest         types.TypingTest         `json:"typingTest"`
		TypingTestSettings types.TypingTestSettings `json:"typingTestSettings"`
	}

	if err := c.Bind(&data); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request data",
		})
	}

	err := queries.PostTypingTest(data.TypingTest, data.TypingTestSettings)
	if err != nil {
		log.Println("Error creating TypingTest:", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to save typing test data. Please try again later.",
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Typing test data saved successfully",
	})
}
