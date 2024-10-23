package server

import (
	"latvian-typing-tutor/config"
	"log"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Server struct {
	app       *fiber.App
	staticDir string
	port      string
}

func NewServer() *Server {
	// Hardcoding the static directory path
	staticDir := "web/dist"

	app := fiber.New()

	// Serve static files
	app.Static("/", staticDir)

	// CORS middleware
	app.Use(cors.New())

	port := config.Config("PORT")
	if port == "" {
		port = "8080"
	}

	return &Server{
		app:       app,
		staticDir: staticDir,
		port:      port,
	}
}

func (s *Server) Start() error {
	// Ensure the static directory exists
	if _, err := os.Stat(s.staticDir); os.IsNotExist(err) {
		return err
	}

	// Serve static files from the dist directory
	s.app.Static("/", s.staticDir)

	// Catch-all route to serve index.html for SPA
	s.app.Use(func(c *fiber.Ctx) error {
		// Serve index.html for any path that isn't a static file
		if c.Path() != "/" && c.Path() != "/favicon.ico" {
			return c.SendFile(filepath.Join(s.staticDir, "index.html"))
		}
		return c.Next()
	})

	log.Printf("Starting server on port %s", s.port)
	return s.app.Listen(":" + s.port)
}
