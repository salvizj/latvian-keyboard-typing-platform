package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func IndexHandler(c echo.Context) error {

	return c.Render(http.StatusOK, "layout", map[string]interface{}{
		"name": "Index",
		"msg":  "Latvian typing learning platform",
	})
}
