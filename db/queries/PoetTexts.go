package queries

import (
	"database/sql"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"log"
)

// GetPoetTexts gets all poet text objects
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
		if err := rows.Scan(&poetText.PoetTextID, &poetText.PoetAuthor, &poetText.PoetFragmentName, &poetText.PoetTextContent); err != nil {
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

// GetPoetText gets a single poet text object based on postTextID
func GetPoetText(poetTextID int) (types.PoetText, error) {
	query := `SELECT poetTextId, poetAuthor, poetFragmentName, poetTextContent FROM "PoetTexts" WHERE poetTextId = $1`

	var poetText types.PoetText

	row := db.DB.QueryRow(query, poetTextID)

	if err := row.Scan(&poetText.PoetTextID, &poetText.PoetAuthor, &poetText.PoetFragmentName, &poetText.PoetTextContent); err != nil {
		if err == sql.ErrNoRows {
			return types.PoetText{}, nil
		}
		log.Println("Error scanning poet text:", err)
		return types.PoetText{}, err
	}

	return poetText, nil
}
