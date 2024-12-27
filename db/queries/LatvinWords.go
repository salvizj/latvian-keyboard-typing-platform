package queries

import (
	"latvianKeyboardTypingPlatform/db"
	"log"
)

// GetLatvianWords gets latvian words
func GetLatvianWords() ([]string, error) {
	query := `SELECT latvianWord FROM "LatvianWords"`

	var latvianWords []string

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Println("Error fetching Latvian words:", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var latvianWord string

		if err := rows.Scan(&latvianWord); err != nil {
			log.Println("Error scanning Latvian word:", err)
			return nil, err
		}

		latvianWords = append(latvianWords, latvianWord)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return latvianWords, nil
}
