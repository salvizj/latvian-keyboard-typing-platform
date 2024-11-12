package routes

import (
	"github.com/labstack/echo/v4"
)

func InitialRoutes(e *echo.Echo) error {

	// Serve static files (JS, CSS, images) from "web/dist/assets"
	e.Static("/assets", "web/dist/assets")

	// Serve the main index.html file for all other routes that don't match static assets
	e.GET("/*", func(c echo.Context) error {
		return c.File("web/dist/index.html")
	})
	return nil
}
