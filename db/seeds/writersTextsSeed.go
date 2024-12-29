package seed

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var writersTexts = []types.WritersText{
	{WritersTextID: 1, WritersFirstName: "Rūdolfs", WritersLastName: "Blaumanis", FragmentName: "Raudupiete", FragmentsContent: "Viņa bija raudājusi vairāk nekā stundu, nespējot nomierināties, kamēr viņš klusēja, nespējot atrast vārdu, kas atvieglotu šo sāpīgo mirkli. Viņas dzīve bija kā izsistais kuģis, kas nemitīgi cīnījās ar vētrām un negaisiem, bet vienmēr nonāca pie tā paša akmens krasta."},
	{WritersTextID: 2, WritersFirstName: "Zenta", WritersLastName: "Mauriņa", FragmentName: "Sievietes portrets", FragmentsContent: "Sieviete ir noslēpums, kuru katrs mēģina izskaidrot pēc saviem priekšstatiem, bet patiesība paliek slēpta aiz viņas smaida. Viņas iekšējā pasaule ir tik bagāta un dažāda, ka vārdi nespēj pilnībā atklāt tās dziļumus."},
	{WritersTextID: 3, WritersFirstName: "Jānis", WritersLastName: "Čakste", FragmentName: "Atmiņas", FragmentsContent: "Latvija bija mūsu sapnis, un šis sapnis piepildījās tikai caur grūtībām, darba un pacietības praksi. Es redzēju, kā maza, cīnīta tauta kļuva par neatkarīgu valsti, un šī pārmaiņu sajūta bija neaptverama."},
	{WritersTextID: 4, WritersFirstName: "Anna", WritersLastName: "Brigadere", FragmentName: "Raudupiete", FragmentsContent: "Viņa bija smagi strādājusi visu mūžu, audzinot bērnus un kopjot māju, un joprojām viņas dzīvē nebija vietas atpūtai. Taču viņa saprata, ka neviena darba sīkums nebija veltīgs, jo tas bija viņas dzīves stāsts."},
}

// WritersTexts inserts seed data if doesen`t exist
func WritersTexts() {
	for _, writersText := range writersTexts {

		// check if the writers text already exists in the database by its Id
		var count int
		query := `SELECT COUNT(*) FROM "WritersTexts" WHERE writersTextId = $1`
		err := db.DB.QueryRow(query, writersText.WritersTextID).Scan(&count)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error checking if writers text with ID %d exists: %v\n", writersText.WritersTextID, err)
			continue
		}

		// if the writers text doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO "WritersTexts" (writersTextId, writersFirstName, writersLastName, fragmentName, fragmentsContent) VALUES ($1, $2, $3, $4, $5)`
			_, err := db.DB.Exec(insertQuery, writersText.WritersTextID, writersText.WritersFirstName, writersText.WritersLastName, writersText.FragmentName, writersText.FragmentsContent)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting writers text with writersTextId %d: %v\n", writersText.WritersTextID, err)
			} else {
				fmt.Printf("Inserted writers text with writersTextId %d, writers first name %s, writers last name %s,  fragment %s, text: %s\n", writersText.WritersTextID, writersText.WritersFirstName, writersText.WritersLastName, writersText.FragmentName, writersText.FragmentsContent)
			}
		}
	}
}
