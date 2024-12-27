package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// GetPoetTextsHandler handles getting poet texts
func GetPoetTextsHandler(c echo.Context) error {
	poetTextIDParam := c.QueryParam("poetTextId")

	if poetTextIDParam != "" {
		PoetTextID, err := strconv.Atoi(poetTextIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "Invalid poetTextId, must be a number",
			})
		}

		poetText, err := queries.GetPoetText(PoetTextID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Unable to fetch poet text. Please try again later.",
			})
		}

		return c.JSON(http.StatusOK, poetText)
	}

	poetTexts, err := queries.GetPoetTexts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to fetch poet texts. Please try again later.",
		})
	}

	if len(poetTexts) == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "No poet texts found",
		})
	}

	// return the list of poet texts
	return c.JSON(http.StatusOK, poetTexts)

}
