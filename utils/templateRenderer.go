package utils

import (
	"html/template"
	"io"

	"github.com/labstack/echo/v4"
)

// Holds a collection of parsed templates.
type TemplateRenderer struct {
	templates *template.Template
}

func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	// Add global methods if data is a map
	if viewContext, isMap := data.(map[string]interface{}); isMap {
		viewContext["reverse"] = c.Echo().Reverse
	}

	return t.templates.ExecuteTemplate(w, name, data) // Render the template.
}

// InitialRenderer initializes and returns a new TemplateRenderer.
func InitialRenderer() *TemplateRenderer {
	// Parse HTML files in the "view" directory.
	renderer := &TemplateRenderer{
		templates: template.Must(template.ParseGlob("view/*.html")), // Panic on parse error.
	}
	return renderer
}
