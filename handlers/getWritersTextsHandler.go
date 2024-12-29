package handlers

import (
	"latvianKeyboardTypingPlatform/db/queries"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

// GetWritersTextsHandler handles getting writers texts
func GetWritersTextsHandler(c echo.Context) error {
	writersTextIDParam := c.QueryParam("writersTextId")

	if writersTextIDParam != "" {
		WritersTextID, err := strconv.Atoi(writersTextIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "Invalid writersTextId, must be a number",
			})
		}

		writersText, err := queries.GetWritersText(WritersTextID)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Unable to fetch writers text. Please try again later.",
			})
		}

		return c.JSON(http.StatusOK, writersText)
	}

	writersTexts, err := queries.GetWritersTexts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Unable to fetch writers texts. Please try again later.",
		})
	}

	if len(writersTexts) == 0 {
		return c.JSON(http.StatusNotFound, map[string]string{
			"error": "No writers texts found",
		})
	}

	// return the list of writers texts
	return c.JSON(http.StatusOK, writersTexts)

}
