package seed

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var poetTexts = []types.PoetText{

	{Id: 1, PoetAuthor: "dsd", PoetFragmentName: "fsf", PoetTextContent: "fdsfsdf"},
}

func SeedPoetTexts() {
	for _, poetText := range poetTexts {

		// Step 1: Check if the poet text already exists in the database by its ID
		var count int
		query := `SELECT COUNT(*) FROM PoetTexts WHERE id = ?`
		err := db.DB.QueryRow(query, poetText.Id).Scan(&count)
		if err != nil {
			if err != sql.ErrNoRows {
				fmt.Fprintf(os.Stderr, "Error checking if poet text with ID %d exists: %v\n", poetText.Id, err)
			}
			continue
		}

		// Step 2: If the poet text doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO PoetTexts (id, poetAuthor, poetFragmentName, poetTextContent) VALUES (?, ?, ?, ?)`
			_, err := db.DB.Exec(insertQuery, poetText.Id, poetText.PoetAuthor, poetText.PoetFragmentName, poetText.PoetTextContent)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting poet text with ID %d: %v\n", poetText.Id, err)
			} else {
				fmt.Printf("Inserted poet text with ID %d, author %s, fragment %s,  text: %s\n", poetText.Id, poetText.PoetAuthor, poetText.PoetFragmentName, poetText.PoetTextContent)
			}
		}
	}
}
