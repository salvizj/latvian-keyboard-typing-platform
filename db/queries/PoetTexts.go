package queries

import (
	"database/sql"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"log"
)

func GetPoetTexts() ([]types.PoetText, error) {
	query := `SELECT poetTextId, poetAuthor, poetfragmentName, poetTextContent FROM "PoetTexts"`

	var poetTexts []types.PoetText

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Println("Error fetching poet texts:", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var poetText types.PoetText
		if err := rows.Scan(&poetText.PoetTextId, &poetText.PoetAuthor, &poetText.PoetFragmentName, &poetText.PoetTextContent); err != nil {
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

func GetPoetText(poetTextId int) (types.PoetText, error) {
	query := `SELECT poetTextId, poetAuthor, poetFragmentName, poetTextContent FROM "PoetTexts" WHERE poetTextId = ?`

	var poetText types.PoetText

	row := db.DB.QueryRow(query, poetTextId)

	if err := row.Scan(&poetText.PoetTextId, &poetText.PoetAuthor, &poetText.PoetFragmentName, &poetText.PoetTextContent); err != nil {
		if err == sql.ErrNoRows {
			return types.PoetText{}, nil
		}
		log.Println("Error scanning poet text:", err)
		return types.PoetText{}, err
	}

	return poetText, nil
}
