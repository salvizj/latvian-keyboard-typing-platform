package routes

import (
	"latvian-typing-tutor/handlers"

	"github.com/labstack/echo/v4"
)

func InitialRoutes(e *echo.Echo) error {
	e.GET("/", handlers.IndexHandler)

	e.GET("/app.js", func(c echo.Context) error {
		return c.File("web/dist/app.js")
	})

	return nil
}
