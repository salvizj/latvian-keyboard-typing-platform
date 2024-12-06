package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func GetPoetTextsHandler(c echo.Context) error {
	poetTextIdParam := c.QueryParam("poetTextId")

	PoetTextId, err := strconv.Atoi(poetTextIdParam)
	if err != nil {
		// return a 400 Bad Request if the conversion fails
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid poetTextid, must be a number",
		})
	}

	if PoetTextId != 0 {
		poetText, err := queries.GetPoetText(PoetTextId)
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

	return c.JSON(http.StatusOK, poetTexts)
}
