package seed

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var poetTexts = []types.PoetText{

	{PoetTextId: 1, PoetAuthor: "dsd", PoetFragmentName: "fsf", PoetTextContent: "fdsfsdf"},
}

func SeedPoetTexts() {
	for _, poetText := range poetTexts {

		// Step 1: Check if the poet text already exists in the database by its ID
		var count int
		query := `SELECT COUNT(*) FROM PoetTexts WHERE poetTextId = ?`
		err := db.DB.QueryRow(query, poetText.PoetTextId).Scan(&count)
		if err != nil {
			if err != sql.ErrNoRows {
				fmt.Fprintf(os.Stderr, "Error checking if poet text with ID %d exists: %v\n", poetText.PoetTextId, err)
			}
			continue
		}

		// Step 2: If the poet text doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO PoetTexts (poetTextId, poetAuthor, poetFragmentName, poetTextContent) VALUES (?, ?, ?, ?)`
			_, err := db.DB.Exec(insertQuery, poetText.PoetTextId, poetText.PoetAuthor, poetText.PoetFragmentName, poetText.PoetTextContent)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting poet text with poetTextId %d: %v\n", poetText.PoetTextId, err)
			} else {
				fmt.Printf("Inserted poet text with poetTextId %d, author %s, fragment %s,  text: %s\n", poetText.PoetTextId, poetText.PoetAuthor, poetText.PoetFragmentName, poetText.PoetTextContent)
			}
		}
	}
}
