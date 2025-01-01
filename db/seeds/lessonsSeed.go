package seed

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var lessons = []types.Lesson{
	//beginner
	{LessonID: 1, LessonText: "iIiAai AAa aAaI IAaAI iiIII iAiaAa iaAA iIia", LessonDifficulty: "beginner"},
	{LessonID: 2, LessonText: "sesE EEE esSS eESsEs eEsEe ESeE Esesee SseSsE", LessonDifficulty: "beginner"},
	{LessonID: 3, LessonText: "tTR trT rTRT TtTr tRTTR RTrrt TTR rRTRT", LessonDifficulty: "beginner"},
	{LessonID: 4, LessonText: "nnUun NUUnu nnnnUN NNUNN NNNu NNNU UnUn Nnnu", LessonDifficulty: "beginner"},
	{LessonID: 5, LessonText: "ĀKk kkK āKK KkKkā ĀKKK kkāĀK ĀĀkĀk kKKK", LessonDifficulty: "beginner"},
	{LessonID: 6, LessonText: "mOoo mMO omm MmOMMo MmMmm Mom mMOMo omMm", LessonDifficulty: "beginner"},
	{LessonID: 7, LessonText: "LLDL DdDl DDDlLD DdD lldd ddlDdd LLLDll lDllL", LessonDifficulty: "beginner"},
	{LessonID: 8, LessonText: "PVv VvPVP vVPvv PPvpPP vPvV vVvVvv PPVPpp ppVV", LessonDifficulty: "beginner"},
	{LessonID: 9, LessonText: "JjĪj īĪīJjĪ ĪīĪ īJj ĪīĪjjĪ īījJ jJĪ jJJJ", LessonDifficulty: "beginner"},
	{LessonID: 10, LessonText: "zzBzz BZbZ BZZZzB ZBzzBZ BBzbZz ZzZzB BZZz Zbz", LessonDifficulty: "beginner"},
	{LessonID: 11, LessonText: "GgĒGg gGēG ĒēgĒē ēēgGG ēgg GĒēggē gĒgĒĒG ēēg", LessonDifficulty: "beginner"},
	{LessonID: 12, LessonText: "šCŠšCŠ šŠcC Ššccc šCŠŠš CCC ŠŠC CCšŠ CŠcC", LessonDifficulty: "beginner"},
	{LessonID: 13, LessonText: "ļūĻŪŪ ŪūĻūŪ Ļļūū ūļĻūū ŪļŪ ūŪĻūŪŪ ūĻĻĻĻ ūūĻ", LessonDifficulty: "beginner"},
	{LessonID: 14, LessonText: "Ņņņf ņfFFf FFFF ŅŅņŅ FfŅ FŅf Ņņņ ņņFf", LessonDifficulty: "beginner"},
	{LessonID: 15, LessonText: "žhHŽŽ HŽhŽŽH ŽŽžŽ ŽžŽ žhh ŽHž ŽHhŽh žhŽ", LessonDifficulty: "beginner"},
	{LessonID: 16, LessonText: "ĶķĢķģ ĢĶĢ ĢĶķ ĶĶĢĶ ĢĢĢķĢ ĶķĶķ ĶģĶķķ ķķĶ", LessonDifficulty: "beginner"},
	{LessonID: 17, LessonText: "aČA AAČ aAaA AčČa Čačačč aAAaAč čaaa Čaač", LessonDifficulty: "beginner"},
	{LessonID: 18, LessonText: "issiii siSsIi iISS sISI ssSSSi sIsis SIsSIs Sii", LessonDifficulty: "beginner"},
	{LessonID: 19, LessonText: "EETTt Ttt eTE TEEET TeTtE TtTeEe TEt teEEt", LessonDifficulty: "beginner"},
	{LessonID: 20, LessonText: "RUrRr UuuR URuru UuUruR rruUu RRU uUuRru RuuRu", LessonDifficulty: "beginner"},
	{LessonID: 21, LessonText: "ĀāĀn āNNnn ĀĀNĀ Nnn nnāānn āĀāāNn ĀnNĀā ĀĀāNNĀ", LessonDifficulty: "beginner"},
	{LessonID: 22, LessonText: "kkkoO OKoo kkK KKook kKKoOk kOkOk OKkoK kokOkO", LessonDifficulty: "beginner"},
	{LessonID: 23, LessonText: "LlMml Mml mLLLm llLMlM lLmm MlML MMmM LlLm", LessonDifficulty: "beginner"},
	{LessonID: 24, LessonText: "DpPpPP DPpPd pPDDPd PDd PDDP dppDpp pPD dpP", LessonDifficulty: "beginner"},
	{LessonID: 25, LessonText: "vJjVj jvJVJV JvV jjvvJv JjJJ VvjJ jJvv JVVJJ", LessonDifficulty: "beginner"},

	// intermidiate
	{LessonID: 26, LessonText: "maja suns kaķis daba zieds tēvs gads lapa", LessonDifficulty: "intermediate"},
	{LessonID: 27, LessonText: "bērns laba liels dzīvot māte vārds zeme ledus", LessonDifficulty: "intermediate"},
	{LessonID: 28, LessonText: "pils ēdiens dziesma skaists divi dēls sūds līcis", LessonDifficulty: "intermediate"},
	{LessonID: 29, LessonText: "daba mīla māja vīns saule zieds vārds dzīvība", LessonDifficulty: "intermediate"},
	{LessonID: 30, LessonText: "zāle zieds jūra māksla stāv zeme raksts gads", LessonDifficulty: "intermediate"},
	{LessonID: 31, LessonText: "māte tēvs dēls dzīve bērns māja saules pļava", LessonDifficulty: "intermediate"},
	{LessonID: 32, LessonText: "tēvs māja ūdens zieds vējš zāle gads dzīvot", LessonDifficulty: "intermediate"},
	{LessonID: 33, LessonText: "ābols koks saule maza kaķis doma zieds draugs", LessonDifficulty: "intermediate"},
	{LessonID: 34, LessonText: "vilks suns kaķis māja gads bērns cilvēks skats", LessonDifficulty: "intermediate"},
	{LessonID: 35, LessonText: "brālis māte tēvs dēls vārds lapa dzīvība ceļš", LessonDifficulty: "intermediate"},
	{LessonID: 36, LessonText: "laba vārds skaists dzīvot bērns māja zieds gads", LessonDifficulty: "intermediate"},
	{LessonID: 37, LessonText: "kāds suns daba zāle māksla vējš kaķis dzīvība", LessonDifficulty: "intermediate"},
	{LessonID: 38, LessonText: "deja māja līcis tēvs vējš ābols divi skaists", LessonDifficulty: "intermediate"},
	{LessonID: 39, LessonText: "skats dzīvot māja brālis māte vārds dzīvība saules", LessonDifficulty: "intermediate"},
	{LessonID: 40, LessonText: "zāle saules dziesma māksla vilks dzīvot māja vējš", LessonDifficulty: "intermediate"},
	{LessonID: 41, LessonText: "māksla skats saule dzīvot māja gads dzīvība vējš", LessonDifficulty: "intermediate"},
	{LessonID: 42, LessonText: "vilks māksla ābols zāle vējš kaķis māja lapa", LessonDifficulty: "intermediate"},
	{LessonID: 43, LessonText: "zieds dzīvība māja brālis bērns vējš gads saule", LessonDifficulty: "intermediate"},
	{LessonID: 44, LessonText: "tēvs māte dzīvot māksla saule vārds dzīvība zieds", LessonDifficulty: "intermediate"},
	{LessonID: 45, LessonText: "ceļš māja dzīvība bērns vējš saules saule ābols", LessonDifficulty: "intermediate"},
	{LessonID: 46, LessonText: "ābols kaķis māksla saule dzīvība vējš dziesma gads", LessonDifficulty: "intermediate"},
	{LessonID: 47, LessonText: "suns māksla vējš saule gads zieds dzīve māja", LessonDifficulty: "intermediate"},
	{LessonID: 48, LessonText: "zieds saule dzīvot māte tēvs māksla vējš brālis", LessonDifficulty: "intermediate"},
	{LessonID: 49, LessonText: "māja zieds bērns vējš saule skats māksla dzīvība", LessonDifficulty: "intermediate"},
	{LessonID: 50, LessonText: "zāle dzīvot saule māksla māja vējš skats bērns", LessonDifficulty: "intermediate"},

	// advanced
	{LessonID: 51, LessonText: "Šodien ir skaista diena. Saule spīd spilgti. Putni dzied kokos.", LessonDifficulty: "advanced"},
	{LessonID: 52, LessonText: "Man patīk lasīt grāmatas. Bibliotēkā ir daudz interesantu stāstu.", LessonDifficulty: "advanced"},
	{LessonID: 53, LessonText: "Bērni spēlējas pagalmā. Viņi smejas un skrien. Ir silts laiks.", LessonDifficulty: "advanced"},
	{LessonID: 54, LessonText: "Es mācos latviešu valodu. Skolotāja ir ļoti laba. Mēs rakstām un lasām.", LessonDifficulty: "advanced"},
	{LessonID: 55, LessonText: "Vecmāmiņa cep pīrāgus. Virtuvē smaržo ļoti garšīgi. Man garšo pīrāgi.", LessonDifficulty: "advanced"},
	{LessonID: 56, LessonText: "Dārzā aug skaisti ziedi. Māte laista puķes katru dienu. Es palīdzu viņai.", LessonDifficulty: "advanced"},
	{LessonID: 57, LessonText: "Kaķis guļ uz palodzes. Viņš skatās pa logu. Ārā lido putni.", LessonDifficulty: "advanced"},
	{LessonID: 58, LessonText: "Mana māsa mācās skolā. Viņa ir ļoti gudra. Viņai patīk matemātika.", LessonDifficulty: "advanced"},
	{LessonID: 59, LessonText: "Mēs braucam uz jūru. Ūdens ir silts. Bērni peld un spēlējas.", LessonDifficulty: "advanced"},
	{LessonID: 60, LessonText: "Tēvs strādā birojā. Viņš ir programmētājs. Vakarā viņš nāk mājās.", LessonDifficulty: "advanced"},
	{LessonID: 61, LessonText: "Man ir labs draugs. Mēs kopā spēlējam futbolu. Viņš dzīvo netālu.", LessonDifficulty: "advanced"},
	{LessonID: 62, LessonText: "Rudenī līst lietus. Koki maina krāsas. Es eju ar lietussargu.", LessonDifficulty: "advanced"},
	{LessonID: 63, LessonText: "Ziemā ir auksti. Bērni slēpo un slidina. Sniegs ir balts.", LessonDifficulty: "advanced"},
	{LessonID: 64, LessonText: "Veikalā ir daudz cilvēku. Es pērku maizi un pienu. Kasiere ir laipna.", LessonDifficulty: "advanced"},
	{LessonID: 65, LessonText: "Parkā ir daudz koku. Cilvēki pastaigājas. Bērni spēlē bumbu.", LessonDifficulty: "advanced"},
	{LessonID: 66, LessonText: "Autobuss brauc uz pilsētu. Es sēžu pie loga. Ārā līst lietus.", LessonDifficulty: "advanced"},
	{LessonID: 67, LessonText: "Mēs ejam uz koncertu. Mūzika ir skaļa. Cilvēki dejo un dzied.", LessonDifficulty: "advanced"},
	{LessonID: 68, LessonText: "Brālis spēlē ģitāru. Viņš mācās mūzikas skolā. Man patīk klausīties.", LessonDifficulty: "advanced"},
	{LessonID: 69, LessonText: "Māte gatavo pusdienas. Zupa smaržo garšīgi. Es palīdzu klāt galdu.", LessonDifficulty: "advanced"},
	{LessonID: 70, LessonText: "Suns skrien pa dārzu. Viņš ķer bumbu. Man patīk spēlēties ar suni.", LessonDifficulty: "advanced"},
	{LessonID: 71, LessonText: "Es eju uz kino. Filma ir interesanta. Mēs ēdam popkornu.", LessonDifficulty: "advanced"},
	{LessonID: 72, LessonText: "Gaiss ir tīrs. Putni lido augstu. Debesis ir zilas.", LessonDifficulty: "advanced"},
	{LessonID: 73, LessonText: "Māsai ir dzimšanas diena. Viņai ir desmit gadu. Mēs svinam svētkus.", LessonDifficulty: "advanced"},
	{LessonID: 74, LessonText: "Vectēvs stāsta pasakas. Viņa stāsti ir interesanti. Es klausos uzmanīgi.", LessonDifficulty: "advanced"},
	{LessonID: 75, LessonText: "Mēs dzīvojam pilsētā. Māja ir liela. Man ir sava istaba.", LessonDifficulty: "advanced"},

	// expert
	{LessonID: 76, LessonText: "Latvijas zinātnieki ir veikuši nozīmīgu pētījumu par klimata pārmaiņu ietekmi uz meža ekosistēmām, īpaši pievēršot uzmanību skujkoku izturībai ekstremālos laikapstākļos.", LessonDifficulty: "expert"},
	{LessonID: 77, LessonText: "Mūsdienu digitālās tehnoloģijas strauji attīstās, radot nepieciešamību pēc jaunām prasmēm un zināšanām, kas būtiski ietekmē darba tirgus prasības.", LessonDifficulty: "expert"},
	{LessonID: 78, LessonText: "Jaunākie pētījumi kultūras antropoloģijā atklāj interesantas sakarības starp tradicionālo dzīvesveidu un mūsdienu sabiedrības vērtību sistēmu.", LessonDifficulty: "expert"},
	{LessonID: 79, LessonText: "Valsts ekonomikas ilgtspējīga attīstība ir cieši saistīta ar izglītības sistēmas kvalitāti un spēju pielāgoties mainīgajām darba tirgus prasībām.", LessonDifficulty: "expert"},
	{LessonID: 80, LessonText: "Bioloģiskās daudzveidības saglabāšana ir viens no būtiskākajiem vides aizsardzības uzdevumiem, kas prasa kompleksu pieeju un starptautisku sadarbību.", LessonDifficulty: "expert"},
	{LessonID: 81, LessonText: "Mākslīgā intelekta tehnoloģiju attīstība rada gan jaunas iespējas, gan ētiskus izaicinājumus, kas prasa rūpīgu izvērtējumu un regulējumu.", LessonDifficulty: "expert"},
	{LessonID: 82, LessonText: "Globālā klimata krīze pieprasa steidzamus risinājumus un starptautisku sadarbību, lai samazinātu siltumnīcefekta gāzu emisijas un aizsargātu planētas ekosistēmas.", LessonDifficulty: "expert"},
	{LessonID: 83, LessonText: "Modernās medicīnas sasniegumi ļauj ārstēt agrāk neārstējamas slimības, tomēr joprojām pastāv daudzi izaicinājumi un neatrisināti jautājumi.", LessonDifficulty: "expert"},
	{LessonID: 84, LessonText: "Sociālo mediju ietekme uz sabiedrības komunikācijas paradumiem ir radījusi būtiskas izmaiņas gan personiskajā, gan profesionālajā dzīvē.", LessonDifficulty: "expert"},
	{LessonID: 85, LessonText: "Kultūras mantojuma digitalizācija un saglabāšana ir kļuvusi par prioritāti, lai nodrošinātu vēsturisko materiālu pieejamību nākamajām paaudzēm.", LessonDifficulty: "expert"},
	{LessonID: 86, LessonText: "Pilsētu ilgtspējīga attīstība pieprasa inovatīvus risinājumus transporta, enerģētikas un vides aizsardzības jomās.", LessonDifficulty: "expert"},
	{LessonID: 87, LessonText: "Jaunākie atklājumi kvantu fizikā paver jaunas iespējas datoru tehnoloģiju attīstībā un drošas komunikācijas nodrošināšanā.", LessonDifficulty: "expert"},
	{LessonID: 88, LessonText: "Valodas un kultūras mijiedarbība globalizācijas kontekstā rada gan jaunas iespējas, gan izaicinājumus nacionālās identitātes saglabāšanā.", LessonDifficulty: "expert"},
	{LessonID: 89, LessonText: "Mūsdienu izglītības sistēmai jāspēj pielāgoties strauji mainīgajām tehnoloģijām un darba tirgus prasībām, vienlaikus saglabājot izglītības kvalitāti.", LessonDifficulty: "expert"},
	{LessonID: 90, LessonText: "Zinātniskie pētījumi par smadzeņu darbību atklāj aizvien jaunas sakarības starp domāšanas procesiem un uzvedības modeļiem.", LessonDifficulty: "expert"},
	{LessonID: 91, LessonText: "Alternatīvās enerģijas avotu izmantošana kļūst aizvien aktuālāka, ņemot vērā pieaugošās bažas par klimata pārmaiņām un vides piesārņojumu.", LessonDifficulty: "expert"},
	{LessonID: 92, LessonText: "Digitālā transformācija būtiski ietekmē uzņēmējdarbības modeļus un rada nepieciešamību pēc jaunām kompetencēm darba tirgū.", LessonDifficulty: "expert"},
	{LessonID: 93, LessonText: "Sabiedrības novecošanās rada jaunus izaicinājumus veselības aprūpes un sociālās drošības sistēmām visā pasaulē.", LessonDifficulty: "expert"},
	{LessonID: 94, LessonText: "Modernās tehnoloģijas paver jaunas iespējas izglītības pieejamībā, ļaujot cilvēkiem mācīties neatkarīgi no viņu atrašanās vietas.", LessonDifficulty: "expert"},
	{LessonID: 95, LessonText: "Biodaudzveidības samazināšanās ir globāla problēma, kas prasa steidzamu rīcību un starptautisku sadarbību.", LessonDifficulty: "expert"},
	{LessonID: 96, LessonText: "Mūsdienu sabiedrībā pieaug nepieciešamība pēc kritiskās domāšanas un medijpratības prasmēm, lai orientētos informācijas plūsmā.", LessonDifficulty: "expert"},
	{LessonID: 97, LessonText: "Kosmosa izpētes tehnoloģiju attīstība paver jaunas iespējas cilvēces izpratnei par Visumu un tā noslēpumiem.", LessonDifficulty: "expert"},
	{LessonID: 98, LessonText: "Globalizācijas procesi rada nepieciešamību pēc starpkultūru komunikācijas prasmēm un spējas adaptēties mainīgā vidē.", LessonDifficulty: "expert"},
	{LessonID: 99, LessonText: "Zaļās ekonomikas principu ieviešana ir būtiska ilgtspējīgas attīstības nodrošināšanai un vides aizsardzībai.", LessonDifficulty: "expert"},
	{LessonID: 100, LessonText: "Mākslīgā intelekta attīstība rada jautājumus par cilvēka un mašīnas mijiedarbību nākotnē un tās ētiskajiem aspektiem.", LessonDifficulty: "expert"},
}

// Lessons inserts seed data if doesen`t exist
func Lessons() {
	for _, lesson := range lessons {

		// check if the lesson already exists in the database by its Id
		var count int
		query := `SELECT COUNT(*) FROM "Lessons" WHERE lessonId = $1`
		err := db.DB.QueryRow(query, lesson.LessonID).Scan(&count)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error checking if lesson with ID %d exists: %v\n", lesson.LessonID, err)
			continue
		}

		// if the lesson doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO "Lessons" (lessonId, lessonText, lessonDifficulty) VALUES ($1, $2, $3)`
			_, err := db.DB.Exec(insertQuery, lesson.LessonID, lesson.LessonText, lesson.LessonDifficulty)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting lesson with lessonId %d: %v\n", lesson.LessonID, err)
			} else {
				fmt.Printf("Inserted lesson with ID %d and text: %s, difficulty: %s\n", lesson.LessonID, lesson.LessonText, lesson.LessonDifficulty)
			}
		}
	}
}
