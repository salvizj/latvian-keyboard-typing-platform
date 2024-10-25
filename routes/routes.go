package routes

import (
	"latvian-typing-tutor/handlers"

	"github.com/labstack/echo/v4"
)

func InitialRoutes(e *echo.Echo) error {
	e.GET("/", handlers.IndexHandler)
	return nil
}
