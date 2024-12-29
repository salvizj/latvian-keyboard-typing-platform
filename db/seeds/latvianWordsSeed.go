package seed

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var latvianWords = []types.LatvianWord{
	{LatvianWordID: 1, LatvianWord: "liepa"},
	{LatvianWordID: 2, LatvianWord: "audums"},
	{LatvianWordID: 3, LatvianWord: "medus"},
	{LatvianWordID: 4, LatvianWord: "zemeņu"},
	{LatvianWordID: 5, LatvianWord: "dziesma"},
	{LatvianWordID: 6, LatvianWord: "zvirbulis"},
	{LatvianWordID: 7, LatvianWord: "izglītots"},
	{LatvianWordID: 8, LatvianWord: "cietums"},
	{LatvianWordID: 9, LatvianWord: "zīme"},
	{LatvianWordID: 10, LatvianWord: "dārgums"},
	{LatvianWordID: 11, LatvianWord: "ceļš"},
	{LatvianWordID: 12, LatvianWord: "izglītība"},
	{LatvianWordID: 13, LatvianWord: "dārzs"},
	{LatvianWordID: 14, LatvianWord: "spēks"},
	{LatvianWordID: 15, LatvianWord: "ilgtspēja"},
	{LatvianWordID: 16, LatvianWord: "grāmata"},
	{LatvianWordID: 17, LatvianWord: "gumija"},
	{LatvianWordID: 18, LatvianWord: "enerģija"},
	{LatvianWordID: 19, LatvianWord: "politiķis"},
	{LatvianWordID: 20, LatvianWord: "sāls"},
	{LatvianWordID: 21, LatvianWord: "miers"},
	{LatvianWordID: 22, LatvianWord: "smaids"},
	{LatvianWordID: 23, LatvianWord: "abols"},
	{LatvianWordID: 24, LatvianWord: "adrese"},
	{LatvianWordID: 25, LatvianWord: "avots"},
	{LatvianWordID: 26, LatvianWord: "rags"},
	{LatvianWordID: 27, LatvianWord: "akmens"},
	{LatvianWordID: 28, LatvianWord: "nakts"},
	{LatvianWordID: 29, LatvianWord: "ģimene"},
	{LatvianWordID: 30, LatvianWord: "cietība"},
	{LatvianWordID: 31, LatvianWord: "zemestrīce"},
	{LatvianWordID: 32, LatvianWord: "karš"},
	{LatvianWordID: 33, LatvianWord: "ilgas"},
	{LatvianWordID: 34, LatvianWord: "ķermenis"},
	{LatvianWordID: 35, LatvianWord: "atmiņa"},
	{LatvianWordID: 36, LatvianWord: "meitene"},
	{LatvianWordID: 37, LatvianWord: "gaisma"},
	{LatvianWordID: 38, LatvianWord: "automašīna"},
	{LatvianWordID: 39, LatvianWord: "galva"},
	{LatvianWordID: 40, LatvianWord: "apsēsties"},
	{LatvianWordID: 41, LatvianWord: "durvis"},
	{LatvianWordID: 42, LatvianWord: "veids"},
	{LatvianWordID: 43, LatvianWord: "drēbes"},
	{LatvianWordID: 44, LatvianWord: "meklēt"},
	{LatvianWordID: 45, LatvianWord: "diena"},
	{LatvianWordID: 46, LatvianWord: "muzejs"},
	{LatvianWordID: 47, LatvianWord: "plāns"},
	{LatvianWordID: 48, LatvianWord: "citrons"},
	{LatvianWordID: 49, LatvianWord: "eglīte"},
	{LatvianWordID: 50, LatvianWord: "kāzas"},
	{LatvianWordID: 51, LatvianWord: "trenažieris"},
	{LatvianWordID: 52, LatvianWord: "vīzija"},
	{LatvianWordID: 53, LatvianWord: "adrese mazs"},
	{LatvianWordID: 54, LatvianWord: "pils"},
	{LatvianWordID: 55, LatvianWord: "karš"},
	{LatvianWordID: 56, LatvianWord: "atmiņa"},
	{LatvianWordID: 57, LatvianWord: "olas"},
	{LatvianWordID: 58, LatvianWord: "gudrs"},
	{LatvianWordID: 59, LatvianWord: "bērns"},
	{LatvianWordID: 60, LatvianWord: "mācīt"},
	{LatvianWordID: 61, LatvianWord: "puisis"},
	{LatvianWordID: 62, LatvianWord: "ēka"},
	{LatvianWordID: 63, LatvianWord: "rīts"},
	{LatvianWordID: 64, LatvianWord: "kalns"},
	{LatvianWordID: 65, LatvianWord: "nakts"},
	{LatvianWordID: 66, LatvianWord: "organizēt"},
	{LatvianWordID: 67, LatvianWord: "zeme"},
	{LatvianWordID: 68, LatvianWord: "gumija"},
	{LatvianWordID: 69, LatvianWord: "uzzināt"},
	{LatvianWordID: 70, LatvianWord: "smarža"},
	{LatvianWordID: 71, LatvianWord: "tēvs"},
	{LatvianWordID: 72, LatvianWord: "nav"},
	{LatvianWordID: 73, LatvianWord: "zobārsts"},
	{LatvianWordID: 74, LatvianWord: "nākotne"},
	{LatvianWordID: 75, LatvianWord: "avots"},
	{LatvianWordID: 76, LatvianWord: "dabīgs"},
	{LatvianWordID: 77, LatvianWord: "valoda"},
	{LatvianWordID: 78, LatvianWord: "vēsture"},
	{LatvianWordID: 79, LatvianWord: "svētdiena"},
	{LatvianWordID: 80, LatvianWord: "zāle"},
	{LatvianWordID: 81, LatvianWord: "vīzija"},
	{LatvianWordID: 82, LatvianWord: "laiks"},
	{LatvianWordID: 83, LatvianWord: "skola"},
	{LatvianWordID: 84, LatvianWord: "ēdiens"},
	{LatvianWordID: 85, LatvianWord: "dzīvība"},
	{LatvianWordID: 86, LatvianWord: "daba"},
	{LatvianWordID: 87, LatvianWord: "medības"},
	{LatvianWordID: 88, LatvianWord: "pilsēta"},
	{LatvianWordID: 89, LatvianWord: "mīlestība"},
	{LatvianWordID: 90, LatvianWord: "krāsas"},
	{LatvianWordID: 91, LatvianWord: "māksla"},
	{LatvianWordID: 92, LatvianWord: "sniegs"},
	{LatvianWordID: 93, LatvianWord: "lietus"},
	{LatvianWordID: 94, LatvianWord: "debesis"},
	{LatvianWordID: 95, LatvianWord: "ziema"},
	{LatvianWordID: 96, LatvianWord: "vasara"},
	{LatvianWordID: 97, LatvianWord: "rudens"},
	{LatvianWordID: 98, LatvianWord: "pavasaris"},
	{LatvianWordID: 99, LatvianWord: "balts"},
	{LatvianWordID: 100, LatvianWord: "sarkans"},
	{LatvianWordID: 101, LatvianWord: "zilais"},
	{LatvianWordID: 102, LatvianWord: "zaļš"},
	{LatvianWordID: 103, LatvianWord: "oranžs"},
	{LatvianWordID: 104, LatvianWord: "brūns"},
	{LatvianWordID: 105, LatvianWord: "pelēks"},
	{LatvianWordID: 106, LatvianWord: "dzeltena"},
	{LatvianWordID: 107, LatvianWord: "vīrs"},
	{LatvianWordID: 108, LatvianWord: "sieviete"},
	{LatvianWordID: 109, LatvianWord: "bērns"},
	{LatvianWordID: 110, LatvianWord: "mājdzīvnieks"},
	{LatvianWordID: 111, LatvianWord: "māja"},
	{LatvianWordID: 112, LatvianWord: "zemes"},
	{LatvianWordID: 113, LatvianWord: "mežs"},
	{LatvianWordID: 114, LatvianWord: "kaķis"},
	{LatvianWordID: 115, LatvianWord: "suns"},
	{LatvianWordID: 116, LatvianWord: "jūra"},
	{LatvianWordID: 117, LatvianWord: "upe"},
	{LatvianWordID: 118, LatvianWord: "kalns"},
	{LatvianWordID: 119, LatvianWord: "lācis"},
	{LatvianWordID: 120, LatvianWord: "vāvere"},
	{LatvianWordID: 121, LatvianWord: "putns"},
	{LatvianWordID: 122, LatvianWord: "lācītis"},
	{LatvianWordID: 123, LatvianWord: "lāpa"},
	{LatvianWordID: 124, LatvianWord: "sēne"},
	{LatvianWordID: 125, LatvianWord: "smarža"},
	{LatvianWordID: 126, LatvianWord: "pavasaris"},
	{LatvianWordID: 127, LatvianWord: "rudens"},
	{LatvianWordID: 128, LatvianWord: "ziema"},
	{LatvianWordID: 129, LatvianWord: "vasara"},
	{LatvianWordID: 130, LatvianWord: "mēness"},
	{LatvianWordID: 131, LatvianWord: "saules"},
	{LatvianWordID: 132, LatvianWord: "jūra"},
	{LatvianWordID: 133, LatvianWord: "gaisma"},
	{LatvianWordID: 134, LatvianWord: "gudrs"},
	{LatvianWordID: 135, LatvianWord: "jauns"},
	{LatvianWordID: 136, LatvianWord: "vecs"},
	{LatvianWordID: 137, LatvianWord: "zems"},
	{LatvianWordID: 138, LatvianWord: "augsts"},
	{LatvianWordID: 139, LatvianWord: "plašs"},
	{LatvianWordID: 140, LatvianWord: "krēsls"},
	{LatvianWordID: 141, LatvianWord: "galda"},
	{LatvianWordID: 142, LatvianWord: "krūze"},
	{LatvianWordID: 143, LatvianWord: "karsts"},
	{LatvianWordID: 144, LatvianWord: "auksts"},
	{LatvianWordID: 145, LatvianWord: "siltums"},
	{LatvianWordID: 146, LatvianWord: "dzīvnieks"},
	{LatvianWordID: 147, LatvianWord: "ziedi"},
	{LatvianWordID: 148, LatvianWord: "pāris"},
	{LatvianWordID: 149, LatvianWord: "piena"},
	{LatvianWordID: 150, LatvianWord: "ķirbis"},
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
