package routes

import (
	"latvianKeyboardTypingPlatform/handlers"
	"latvianKeyboardTypingPlatform/managers"

	"github.com/labstack/echo/v4"
)

// InitialRoutes functions that initialized routes when server starts
func InitialRoutes(e *echo.Echo) error {
	lm := managers.NewLobbyManager()

	e.POST("/api/post-typing-test", handlers.PostTypingTestHandler)
	e.POST("/api/post-lesson-completion", handlers.PostLessonCompletionHandler)
	e.POST("/api/post-game-record", handlers.PostGameRecordHandler)

	e.GET("/api/get-game-record", handlers.GetGameRecordHandler)
	e.GET("/api/get-lesson", handlers.GetLessonHandler)
	e.GET("/api/get-lessons", handlers.GetLessonsHandler)
	e.GET("/api/get-poet-texts", handlers.GetPoetTextsHandler)
	e.GET("/api/get-typing-tests-and-races-count", handlers.GetTypingTestsAndRacesCountHandler)
	e.GET("/api/get-typing-tests-and-races", handlers.GetTypingTestsAndRaces)
	e.GET("/api/get-latvian-words", handlers.GetLatvinWordsHandler)
	e.GET("/api/get-lesson-completion", handlers.GetLessonCompletionHandler)

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
