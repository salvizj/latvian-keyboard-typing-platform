package server

import (
	"latvian-typing-tutor/routes"
	"latvian-typing-tutor/utils"

	"github.com/labstack/echo/v4"
)

func StartServer() {
	e := echo.New() // Create a new Echo instance.

	e.Renderer = utils.InitialRenderer() // Set the custom template renderer

	if err := routes.InitialRoutes(e); err != nil {
		e.Logger.Fatal("Failed to initialize routes:", err)
	}

	// Start the server
	e.Logger.Fatal(e.Start(":8080"))
}
