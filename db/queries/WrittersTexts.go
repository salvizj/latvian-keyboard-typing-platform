package queries

import (
	"database/sql"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"log"
)

// GetWritersTexts gets all writers text objects
func GetWritersTexts() ([]types.WritersText, error) {
	query := `SELECT writersTextId, writersFirstName, writersLastName, fragmentName, fragmentsContent FROM "WritersTexts"`

	var writersTexts []types.WritersText

	rows, err := db.DB.Query(query)
	if err != nil {
		log.Println("Error fetching writers texts:", err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var writersText types.WritersText
		if err := rows.Scan(&writersText.WritersTextID, &writersText.WritersFirstName, &writersText.WritersLastName, &writersText.FragmentName, &writersText.FragmentsContent); err != nil {
			log.Println("Error scanning writers text:", err)
			return nil, err
		}
		writersTexts = append(writersTexts, writersText)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error iterating over rows:", err)
		return nil, err
	}

	return writersTexts, nil
}

// GetWritersText gets a single writers text object based on postTextID
func GetWritersText(writersTextID int) (types.WritersText, error) {
	query := `SELECT writersTextId, writersFirstName, writersLastNamer, fragmentName fragmentsContent FROM "WritersTexts" WHERE writersTextId = $1`

	var writersText types.WritersText

	row := db.DB.QueryRow(query, writersTextID)

	if err := row.Scan(&writersText.WritersTextID, &writersText.WritersFirstName, &writersText.FragmentName, &writersText.FragmentsContent); err != nil {
		if err == sql.ErrNoRows {
			return types.WritersText{}, nil
		}
		log.Println("Error scanning writers text:", err)
		return types.WritersText{}, err
	}

	return writersText, nil
}
