package seed

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var writersTexts = []types.WritersText{
	// Rūdolfs Blaumanis
	{WritersTextID: 1, WritersFirstName: "Rūdolfs", WritersLastName: "Blaumanis", FragmentName: "Raudupiete", FragmentsContent: "Viņa bija raudājusi vairāk nekā stundu, nespējot nomierināties, kamēr viņš klusēja, nespējot atrast vārdu, kas atvieglotu šo sāpīgo mirkli. Viņas dzīve bija kā izsistais kuģis, kas nemitīgi cīnījās ar vētrām un negaisiem, bet vienmēr nonāca pie tā paša akmens krasta."},
	{WritersTextID: 2, WritersFirstName: "Rūdolfs", WritersLastName: "Blaumanis", FragmentName: "Indrāni", FragmentsContent: "Viņš bija kā uzmācīgākais viesis, kas pārkāpj mūsu robežas un atņem mieru. Bet šoreiz viņa skatieni bija mierīgi, tāpat kā saulrieta gaisma, kas izgaist jūras malā."},

	// Zenta Meuriņa
	{WritersTextID: 3, WritersFirstName: "Zenta", WritersLastName: "Mauriņa", FragmentName: "Sievietes portrets", FragmentsContent: "Sieviete ir noslēpums, kuru katrs mēģina izskaidrot pēc saviem priekšstatiem, bet patiesība paliek slēpta aiz viņas smaida. Viņas iekšējā pasaule ir tik bagāta un dažāda, ka vārdi nespēj pilnībā atklāt tās dziļumus."},
	{WritersTextID: 4, WritersFirstName: "Zenta", WritersLastName: "Mauriņa", FragmentName: "Sieviete mūsdienu sabiedrībā", FragmentsContent: "Mūsdienu sabiedrībā sieviete joprojām ir ne tikai mīļotā un māte, bet arī spēcīgs intelektuālais spēks, kas spēj mainīt pasauli ar savām idejām un skatījumu uz dzīvi."},

	// Jānis Čakste
	{WritersTextID: 5, WritersFirstName: "Jānis", WritersLastName: "Čakste", FragmentName: "Atmiņas", FragmentsContent: "Latvija bija mūsu sapnis, un šis sapnis piepildījās tikai caur grūtībām, darba un pacietības praksi. Es redzēju, kā maza, cīnīta tauta kļuva par neatkarīgu valsti, un šī pārmaiņu sajūta bija neaptverama."},
	{WritersTextID: 6, WritersFirstName: "Jānis", WritersLastName: "Čakste", FragmentName: "Mūžīgais cīņš", FragmentsContent: "Mēs esam izdzīvojuši un iznācām no grūtībām stiprāki nekā jebkad agrāk. Un katrs solis, ko mēs speram, ir zīme mūsu cīņai par brīvību un taisnību."},

	// Anna Brigadere
	{WritersTextID: 7, WritersFirstName: "Anna", WritersLastName: "Brigadere", FragmentName: "Raudupiete", FragmentsContent: "Viņa bija smagi strādājusi visu mūžu, audzinot bērnus un kopjot māju, un joprojām viņas dzīvē nebija vietas atpūtai. Taču viņa saprata, ka neviena darba sīkums nebija veltīgs, jo tas bija viņas dzīves stāsts."},
	{WritersTextID: 8, WritersFirstName: "Anna", WritersLastName: "Brigadere", FragmentName: "Mazā burvība", FragmentsContent: "Viņas acīs bija neizsmeļams dzīves prieks, kas katrā mirklī spēja pārsteigt un iedvesmot. Viņa spēja saskatīt skaistumu pat visparastākajā lietā, kā to darīja tikai īstie mākslinieki."},

	// Kārlis Skalbe
	{WritersTextID: 9, WritersFirstName: "Kārlis", WritersLastName: "Skalbe", FragmentName: "Zaļā zāle", FragmentsContent: "Zaļā zāle mirdzēja kā sapņu pasaules atspulgs. Katrs zieda lapiņš atspoguļoja dzīves maigumu un noslēpumus, ko daba glabā."},
	{WritersTextID: 10, WritersFirstName: "Kārlis", WritersLastName: "Skalbe", FragmentName: "Pie jūras", FragmentsContent: "Jūra, neskatoties uz to, ka tā vienmēr bija plaša un noslēpumainā, šķita līdzīga mūsu dzīvei – pilna ar krītošiem viļņiem un sapņiem, kas nekad nepārtrūkst."},

	// Jānis Pliekšāns (Rainis)
	{WritersTextID: 11, WritersFirstName: "Jānis (Rainis)", WritersLastName: "Pliekšāns", FragmentName: "Uguns", FragmentsContent: "Uguns bija kā dzīvības simbols, kas nekad nebeidz degt un kas vienmēr pārveido pasauli. Viņa vērsās pret visiem, kas mēģināja tās gaismu noliegt."},
	{WritersTextID: 12, WritersFirstName: "Jānis", WritersLastName: "Pliekšāns", FragmentName: "Gaisma un tumsa", FragmentsContent: "Mēs dzīvojam pasaulē, kur katra gaisma cīnās ar tumsu. Un mēs esam tikai tie, kas mēģina saprast šo cīņu un atrast ceļu uz patiesību."},

	// Johanna Emīlija Lizete Rozenberga (Aspāzija)
	{WritersTextID: 13, WritersFirstName: "Ilze (Aspāzija)", WritersLastName: "Lienīte", FragmentName: "Dzīves plūdums", FragmentsContent: "Viņa iegāja istabā, un gaisma no loga iezīmēja tās siluetu, kas liecināja par viņas dzīves ceļu. Katrs solis, ko viņa bija sperusi, bija kā noslēpumainais plūdums, kas vērsās pret straumi."},
	{WritersTextID: 14, WritersFirstName: "Ilze", WritersLastName: "Lienīte", FragmentName: "Sapņi", FragmentsContent: "Sapņi ir kā peldošas laivas uz klusā ezera virsmas, kas apstājas tikai tad, kad ir sasnieguši savus mērķus. Viņa zināja, ka katrs sapnis, ko viņa bija redzējusi, bija daļa no viņas dzīves ceļa."},
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
