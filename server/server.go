package server

import (
	"latvian-typing-tutor/routes"
	"latvian-typing-tutor/utils"

	"github.com/labstack/echo/v4"
)

func StartServer() {
	e := echo.New()

	// Initialize the template registry
	templates, err := utils.NewTemplateRegistry(
		"view/base.html",
		"view/index.html",
	)
	if err != nil {
		e.Logger.Fatal("Failed to initialize templates:", err)
		return
	}

	// Assign the custom renderer to the Echo instance
	e.Renderer = templates

	// Initialize routes
	if err := routes.InitialRoutes(e); err != nil {
		e.Logger.Fatal("Failed to initialize routes:", err)
	}

	// Start the server
	e.Logger.Fatal(e.Start(":8080"))
}
