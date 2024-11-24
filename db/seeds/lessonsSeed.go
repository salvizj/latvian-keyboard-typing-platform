package seed

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var lessons = []types.Lesson{

	// Group 1: a ā A Ā
	{Id: 1, LessonType: "Letter Introduction", LessonText: "a ā A Ā"},
	{Id: 2, LessonType: "Practice", LessonText: "a ā A Ā aā āa Āa āA ĀA āaā ĀaĀ"},
	{Id: 3, LessonType: "Words", LessonText: "āra ārā Āra Ārā ĀRA ĀRĀ"},

	// Group 2: i ī I Ī
	{Id: 4, LessonType: "Letter Introduction", LessonText: "i ī I Ī"},
	{Id: 5, LessonType: "Practice", LessonText: "i ī I Ī iī īi Īi īI ĪI īiī ĪiĪ īIī ĪIĪ ĪiĪI IīĪi"},
	{Id: 6, LessonType: "Combined", LessonText: "ai āi Ai Āi ĀI īa iā Īa ĪA āī Āī"},
	{Id: 7, LessonType: "Words", LessonText: "īrā Īra ĪRĀ Āri ĀRI īri aī Aī ĀĪ"},

	// Group 3: s š S Š
	{Id: 8, LessonType: "Letter Introduction", LessonText: "s š S Š"},
	{Id: 9, LessonType: "Practice", LessonText: "sa šā Sa Šā ŠĀ si ši Si Ši ŠI šis Šis ŠIS sīs Sīs SĪS"},
	{Id: 10, LessonType: "Combined", LessonText: "sai šāi Sai Šāi ŠĀI īsa īša Īsa Īša ĪŠA"},
	{Id: 11, LessonType: "Words", LessonText: "sāi šī Sāi Šī ŠĪ saša Saša SAŠA šais Šais ŠAIS"},

	// Group 4: e ē E Ē
	{Id: 12, LessonType: "Letter Introduction", LessonText: "e ē E Ē"},
	{Id: 13, LessonType: "Practice", LessonText: "e ē E Ē eē ēe Eē Ēe ĒE ēeē ĒeĒ ēEē ĒEĒ"},
	{Id: 14, LessonType: "Combined", LessonText: "sei šei Sei Šei ŠEI ēsa ēša Ēsa Ēša ĒŠA"},
	{Id: 15, LessonType: "Words", LessonText: "ēst Ēst ĒST sēs Sēs SĒS esi Esi ESI šēse Šēse ŠĒSE"},

	// Group 5: t T r R
	{Id: 16, LessonType: "Letter Introduction", LessonText: "t r T R"},
	{Id: 17, LessonType: "Practice", LessonText: "tr rt Tr Rt TR RT tēr rēt Tēr Rēt TĒR RĒT trī rīt TRĪ RĪT"},
	{Id: 18, LessonType: "Combined", LessonText: "tēs rēs Tēs Rēs TĒS RĒS šērt Šērt ŠĒRT"},
	{Id: 19, LessonType: "Words", LessonText: "rīts Rīts RĪTS tēre Tēre TĒRE sērt Sērt SĒRT rīta Rīta RĪTA"},

	// Group 6: u ū U Ū
	{Id: 20, LessonType: "Letter Introduction", LessonText: "u ū U Ū"},
	{Id: 21, LessonType: "Practice", LessonText: "tu ūt Tu Ūt TU ŪT rūt Rūt RŪT tūr Tūr TŪR ūtra Ūtra ŪTRA"},
	{Id: 22, LessonType: "Combined", LessonText: "sūt Sūt SŪT rūs Rūs RŪS tūs Tūs TŪS"},
	{Id: 23, LessonType: "Words", LessonText: "ūtru Ūtru ŪTRU tūre Tūre TŪRE sūrs Sūrs SŪRS sūtra Sūtra SŪTRA"},

	// Group 7: n ņ N Ņ
	{Id: 24, LessonType: "Letter Introduction", LessonText: "n ņ N Ņ"},
	{Id: 25, LessonType: "Practice", LessonText: "na ņa Na Ņa ŅA nē ņē Nē Ņē ŅĒ ņem Ņem ŅEM"},
	{Id: 26, LessonType: "Combined", LessonText: "nūt ņūt Nūt Ņūt ŅŪT ņērt Ņērt ŅĒRT"},
	{Id: 27, LessonType: "Words", LessonText: "nāsi Nāsi NĀSI ņemt Ņemt ŅEMT ēna Ēna ĒNA nēsis Nēsis NĒSIS"},

	// Group 8: k ķ K Ķ
	{Id: 28, LessonType: "Letter Introduction", LessonText: "k ķ K Ķ"},
	{Id: 29, LessonType: "Practice", LessonText: "ka ķa Ka Ķa ĶA ke ķe Ke Ķe ĶE kī ķī Kī Ķī ĶĪ"},
	{Id: 30, LessonType: "Combined", LessonText: "kūt ķūt Kūt Ķūt ĶŪT ķērt Ķērt ĶĒRT"},
	{Id: 31, LessonType: "Words", LessonText: "kāre Kāre KĀRE ķēķis Ķēķis ĶĒĶIS kūts Kūts KŪTS ķēniņš Ķēniņš ĶĒNIŅŠ"},

	// Group 9: o O m M
	{Id: 32, LessonType: "Letter Introduction", LessonText: "o m O M"},
	{Id: 33, LessonType: "Practice", LessonText: "om mo Om Mo OM MO mā mē Mā Mē MĀ MĒ mūs Mūs MŪS"},
	{Id: 34, LessonType: "Combined", LessonText: "mēs Mēs MĒS ome Ome OME māk Māk MĀK"},
	{Id: 35, LessonType: "Words", LessonText: "māte Māte MĀTE mērs Mērs MĒRS mēness Mēness MĒNESS"},

	// Group 10: l ļ L Ļ
	{Id: 36, LessonType: "Letter Introduction", LessonText: "l ļ L Ļ"},
	{Id: 37, LessonType: "Practice", LessonText: "la ļa La Ļa ĻA le ļe Le Ļe ĻE lī ļī Lī Ļī ĻĪ"},
	{Id: 38, LessonType: "Combined", LessonText: "lēt ļēt Lēt Ļēt ĻĒT ļūt Ļūt ĻŪT lūk Lūk LŪK"},
	{Id: 39, LessonType: "Words", LessonText: "lāse Lāse LĀSE ļoti Ļoti ĻOTI lēni Lēni LĒNI līme Līme LĪME ļāva Ļāva ĻĀVA"},

	// Group 11: d D p P v V
	{Id: 40, LessonType: "Letter Introduction", LessonText: "d p v D P V"},
	{Id: 41, LessonType: "Practice", LessonText: "da pa va Da Pa Va DA PA VA dē pē vē Dē Pē Vē DĒ PĒ VĒ"},
	{Id: 42, LessonType: "Combined", LessonText: "dēl pēl vēl Dēl Pēl Vēl DĒL PĒL VĒL vērt Vērt VĒRT"},
	{Id: 43, LessonType: "Words", LessonText: "dēls Dēls DĒLS pīle Pīle PĪLE vērt Vērt VĒRT vēlme Vēlme VĒLME dēsts Dēsts DĒSTS"},

	// Group 12: j J z ž Z Ž
	{Id: 44, LessonType: "Letter Introduction", LessonText: "j z ž J Z Ž"},
	{Id: 45, LessonType: "Practice", LessonText: "ja za ža Ja Za Ža JA ZA ŽA jē zē že Jē Zē Že JĒ ZĒ ŽE"},
	{Id: 46, LessonType: "Combined", LessonText: "jūs zūs žūs Jūs Zūs Žūs JŪS ZŪS ŽŪS žēl Žēl ŽĒL"},
	{Id: 47, LessonType: "Words", LessonText: "jūra Jūra JŪRA zīme Zīme ZĪME žēls Žēls ŽĒLS jēls Jēls JĒLS zāle Zāle ZĀLE"},

	// Group 13: b B g ģ G Ģ
	{Id: 48, LessonType: "Letter Introduction", LessonText: "b g ģ B G Ģ"},
	{Id: 49, LessonType: "Practice", LessonText: "ba ga ģa Ba Ga Ģa BA GA ĢA bē ģē Bē Ģē BĒ ĢĒ"},
	{Id: 50, LessonType: "Combined", LessonText: "bēr ģēr Bēr Ģēr BĒR ĢĒR gāz Gāz GĀZ būt Būt BŪT"},
	{Id: 51, LessonType: "Words", LessonText: "bite Bite BITE ģērbt Ģērbt ĢĒRBT gāze Gāze GĀZE bēres Bēres BĒRES ģērbies Ģērbies ĢĒRBIES"},

	// Final Group 14: c č C Č f F h H
	{Id: 52, LessonType: "Letter Introduction", LessonText: "c č f h C Č F H"},
	{Id: 53, LessonType: "Practice", LessonText: "ca ča fa ha Ca Ča Fa Ha CA ČA FA HA cē čē fē hē Cē Čē Fē Hē"},
	{Id: 54, LessonType: "Combined", LessonText: "cēl čēl fēn hēl Cēl Čēl Fēn Hēl CĒL ČĒL FĒN HĒL"},
	{Id: 55, LessonType: "Words", LessonText: "celt Celt CELT čība Čība ČĪBA fine Fine FINE halle Halle HALLE čūska Čūska ČŪSKA"},
}

func SeedLessons() {
	for _, lesson := range lessons {

		// Step 1: Check if the lesson already exists in the database by its ID
		var count int
		query := `SELECT COUNT(*) FROM Lessons WHERE id = ?`
		err := db.DB.QueryRow(query, lesson.Id).Scan(&count)
		if err != nil {
			if err != sql.ErrNoRows {
				fmt.Fprintf(os.Stderr, "Error checking if lesson with ID %d exists: %v\n", lesson.Id, err)
			}
			continue
		}

		// Step 2: If the lesson doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO Lessons (id, lessonType, lessonText) VALUES (?, ?, ?)`
			_, err := db.DB.Exec(insertQuery, lesson.Id, lesson.LessonType, lesson.LessonText)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting lesson with ID %d: %v\n", lesson.Id, err)
			} else {
				fmt.Printf("Inserted lesson with ID %d and text: %s\n", lesson.Id, lesson.LessonText)
			}
		}
	}
}
