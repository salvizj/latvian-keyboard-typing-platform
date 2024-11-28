package seed

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var latvianWords = []types.LatvianWord{

	{LatvianWordId: 1, LatvianWord: "dsd"},
}

func SeedLatvianWords() {
	for _, latvianText := range latvianWords {

		// Step 1: Check if the latvian words already exists in the database by its ID
		var count int
		query := `SELECT COUNT(*) FROM LatvianWords WHERE latvianWordId = ?`
		err := db.DB.QueryRow(query, latvianText.LatvianWordId).Scan(&count)
		if err != nil {
			if err != sql.ErrNoRows {
				fmt.Fprintf(os.Stderr, "Error checking if poet text with ID %d exists: %v\n", latvianText.LatvianWordId, err)
			}
			continue
		}

		// Step 2: If the latvian words doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO LatvianWords (latvianWordId, latvianWord) VALUES (?, ?)`
			_, err := db.DB.Exec(insertQuery, latvianText.LatvianWordId, latvianText.LatvianWord)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting Latvian word with latvianWordId %d: %v\n", latvianText.LatvianWordId, err)
			} else {
				fmt.Printf("Inserted latvian word with latvianWordId %d, and latvianWord %s \n", latvianText.LatvianWordId, latvianText.LatvianWord)
			}
		}
	}
}
