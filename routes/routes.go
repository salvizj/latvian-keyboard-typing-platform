package routes

import (
	"latvian-typing-tutor/handlers"

	"github.com/labstack/echo/v4"
)

func InitialRoutes(e *echo.Echo) error {

	e.GET("/api/lesson/:id", handlers.GetLessonHandler)
	e.GET("/api/poet-texts", handlers.GetPoetTextsHandler)

	// Serve static files from "web/dist/assets"
	e.Static("/assets", "web/dist/assets")

	// Serve the main index.html file for all other routes that don't match static assets
	e.GET("/*", func(c echo.Context) error {
		return c.File("web/dist/index.html")
	})

	return nil
}
