package db

import (
	"fmt"
	"os"
)

type Table struct {
	name  string
	query string
}

var tables = []Table{
	{
		name: "Lessons",
		query: `
			CREATE TABLE Lessons (
				id INTEGER PRIMARY KEY,
				lessonType TEXT NOT NULL,
				lessonText TEXT NOT NULL
			);
		`,
	},
	{
		name: "PoetTexts",
		query: `
			CREATE TABLE PoetTexts (
				id INTEGER PRIMARY KEY,
				poetAuthor TEXT NOT NULL,
				poetfragmentName TEXT NOT NULL,
				poetTextContent TEXT NOT NULL
				);
		`,
	},
}

func tableExists(tableName string) bool {
	var exists bool
	query := fmt.Sprintf("SELECT COUNT(*) > 0 FROM sqlite_master WHERE type='table' AND name='%s';", tableName)
	err := DB.QueryRow(query).Scan(&exists)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error checking if table %s exists: %v\n", tableName, err)
		return false
	}
	return exists
}

func createTable(tableName, tableQuery string) {
	// check if the table exists
	if tableExists(tableName) {
		fmt.Printf("Table %s already exists. Skipping creation.\n", tableName)
		return
	}

	// create the table if it doesn't exist
	if result, err := DB.Exec(tableQuery); err != nil {
		fmt.Fprintf(os.Stderr, "Error creating %s table: %v\n", tableName, err)
	} else {
		rowsAffected, _ := result.RowsAffected()
		lastInsertID, _ := result.LastInsertId()

		fmt.Printf("Table %s created successfully. Rows affected: %d, Last Insert ID: %d\n",
			tableName, rowsAffected, lastInsertID)
	}
}

func CreateTables() {
	for _, table := range tables {
		createTable(table.name, table.query)
	}
}
