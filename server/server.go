package server

import (
	"fmt"
	"latvianKeyboardTypingPlatform/routes"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

// StartServer to start server
func StartServer() {
	// load environment variables from .env
	if err := godotenv.Load(".env"); err != nil {
		fmt.Fprintf(os.Stderr, "Warning: Could not load .env file\n")
		os.Exit(1)
	}

	port := os.Getenv("VITE_PORT")

	if port == "" {
		fmt.Fprintf(os.Stderr, "Error: Required environment variable PORT is not set\n")
		os.Exit(1)
	}

	// create a new Echo instance.
	e := echo.New()

	if err := routes.InitialRoutes(e); err != nil {
		e.Logger.Fatal("Failed to initialize routes:", err)
	}

	// start the server
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
