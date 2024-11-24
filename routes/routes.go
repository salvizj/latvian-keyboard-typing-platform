package routes

import (
	"latvianKeyboardTypingPlatform/handlers"
	"latvianKeyboardTypingPlatform/managers"

	"github.com/labstack/echo/v4"
)

func InitialRoutes(e *echo.Echo) error {
	lm := managers.NewLobbyManager()

	e.GET("/api/lesson/:id", handlers.GetLessonHandler)
	e.GET("/api/poet-texts", handlers.GetPoetTextsHandler)

	e.GET("/ws", func(c echo.Context) error {
		return handlers.WsHandler(c, lm)
	})

	// serve static files from "web/dist/assets"
	e.Static("/assets", "web/dist/assets")

	// serve the main index.html file for all other routes that don't match static assets
	e.GET("/*", func(c echo.Context) error {
		return c.File("web/dist/index.html")
	})

	return nil
}
