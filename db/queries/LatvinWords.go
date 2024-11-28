package queries

import (
	"latvianKeyboardTypingPlatform/db"
	"log"
)

func GetLatvinWords() ([]string, error) {
	query := "SELECT latvianWordId, latvianWord FROM LatvianWords"

	var latvianWords []string

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Println("Error fetching latvian words:", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var latvianWordId int
		var latvianWord string

		if err := rows.Scan(&latvianWordId, &latvianWord); err != nil {
			log.Println("Error scanning latvian word:", err)
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
