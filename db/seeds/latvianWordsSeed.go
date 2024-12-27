package seed

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var latvianWords = []types.LatvianWord{

	{LatvianWordID: 1, LatvianWord: "dsd"},
}

// LatvianWords inserts seed data if doesen`t exist
func LatvianWords() {
	for _, latvianText := range latvianWords {

		// check if the Latvian word already exists in the database by its Id
		var count int
		query := `SELECT COUNT(*) FROM "LatvianWords" WHERE latvianWordId = $1`
		err := db.DB.QueryRow(query, latvianText.LatvianWordID).Scan(&count)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error checking if Latvian word with ID %d exists: %v\n", latvianText.LatvianWordID, err)
			continue
		}

		// if the Latvian word doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO "LatvianWords" (latvianWordId, latvianWord) VALUES ($1, $2)`
			_, err := db.DB.Exec(insertQuery, latvianText.LatvianWordID, latvianText.LatvianWord)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting Latvian word with latvianWordId %d: %v\n", latvianText.LatvianWordID, err)
			} else {
				fmt.Printf("Inserted Latvian word with latvianWordId %d, and Latvian word: %s\n", latvianText.LatvianWordID, latvianText.LatvianWord)
			}
		}
	}
}
