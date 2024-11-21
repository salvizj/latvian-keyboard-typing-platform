package queries

import (
	"latvian-typing-tutor/db"
	"latvian-typing-tutor/types"
	"log"
)

func GetPoetTexts() ([]types.PoetText, error) {
	query := "SELECT id, poetAuthor, poetfragmentName, poetTextContent FROM PoetTexts"

	var poetTexts []types.PoetText

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Println("Error fetching poet texts:", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var poetText types.PoetText
		if err := rows.Scan(&poetText.Id, &poetText.PoetAuthor, &poetText.PoetFragmentName, &poetText.PoetTextContent); err != nil {
			log.Println("Error scanning poet text:", err)
			return nil, err
		}
		poetTexts = append(poetTexts, poetText)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return poetTexts, nil
}
