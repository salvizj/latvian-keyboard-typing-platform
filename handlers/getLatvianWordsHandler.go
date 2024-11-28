package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetLatvinWordsHandler(c echo.Context) error {

	latvinaWords, err := queries.GetLatvinWords()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to fetch latvian words. Please try again later.",
		})
	}
	if len(latvinaWords) == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "No latvian words found",
		})
	}
	return c.JSON(http.StatusOK, latvinaWords)
}
