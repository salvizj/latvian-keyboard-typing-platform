package db

import (
	"fmt"
	"os"
)

func CreateTables() {
	tables := []struct {
		name  string
		query string
	}{

		{
			name: "",
			query: `
            `,
		},
	}

	for _, table := range tables {
		if _, err := DB.Exec(table.query); err != nil {
			fmt.Fprintf(os.Stderr, "Error creating %s table: %v\n", table.name, err)
		}
	}
}
