package utils

import (
	"errors"
	"html/template"
	"io"
	"log"

	"github.com/labstack/echo/v4"
)

// TemplateRegistry holds the templates
type TemplateRegistry struct {
	templates map[string]*template.Template
}

// NewTemplateRegistry initializes a new TemplateRegistry and loads templates
func NewTemplateRegistry(templatePaths ...string) (*TemplateRegistry, error) {
	tr := &TemplateRegistry{
		templates: make(map[string]*template.Template),
	}

	for _, path := range templatePaths {
		tmpl, err := template.ParseFiles(path)
		if err != nil {
			log.Printf("Error loading template %s: %v\n", path, err)
			return nil, err // Return the error if any template fails to load
		}
		tr.templates[path] = tmpl
	}

	return tr, nil
}

// Render renders a named template with provided data
func (tr *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	tmpl, ok := tr.templates[name]
	if !ok {
		err := errors.New("template not found -> " + name)
		log.Println(err)
		return err
	}

	return tmpl.Execute(w, data)
}
