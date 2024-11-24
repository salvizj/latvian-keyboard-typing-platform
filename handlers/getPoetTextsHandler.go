package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetPoetTextsHandler(c echo.Context) error {

	poetTexts, err := queries.GetPoetTexts()
	if err != nil {
		// Log the error for debugging purposes
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to fetch poet texts. Please try again later.",
		})
	}
	if len(poetTexts) == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "No poet texts found",
		})
	}
	return c.JSON(http.StatusOK, poetTexts)
}
