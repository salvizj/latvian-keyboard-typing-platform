package seed

import (
	"database/sql"
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var lessons = []types.Lesson{
	{Id: 1, LessonText: "a ā A Ā"},
	{Id: 2, LessonText: "a ā A Ā aā āa Āa āA ĀA āaā ĀaĀ"},
	{Id: 3, LessonText: "āra ārā Āra Ārā ĀRA ĀRĀ"},
	{Id: 4, LessonText: "i ī I Ī"},
	{Id: 5, LessonText: "i ī I Ī iī īi Īi īI ĪI īiī ĪiĪ īIī ĪIĪ ĪiĪI IīĪi"},
	{Id: 6, LessonText: "ai āi Ai Āi ĀI īa iā Īa ĪA āī Āī"},
	{Id: 7, LessonText: "īrā Īra ĪRĀ Āri ĀRI īri aī Aī ĀĪ"},
	{Id: 8, LessonText: "s š S Š"},
	{Id: 9, LessonText: "sa šā Sa Šā ŠĀ si ši Si Ši ŠI šis Šis ŠIS sīs Sīs SĪS"},
	{Id: 10, LessonText: "sai šāi Sai Šāi ŠĀI īsa īša Īsa Īša ĪŠA"},
	{Id: 11, LessonText: "sāi šī Sāi Šī ŠĪ saša Saša SAŠA šais Šais ŠAIS"},
	{Id: 12, LessonText: "e ē E Ē"},
	{Id: 13, LessonText: "e ē E Ē eē ēe Eē Ēe ĒE ēeē ĒeĒ ēEē ĒEĒ"},
	{Id: 14, LessonText: "sei šei Sei Šei ŠEI ēsa ēša Ēsa Ēša ĒŠA"},
	{Id: 15, LessonText: "ēst Ēst ĒST sēs Sēs SĒS esi Esi ESI šēse Šēse ŠĒSE"},
	{Id: 16, LessonText: "t r T R"},
	{Id: 17, LessonText: "tr rt Tr Rt TR RT tēr rēt Tēr Rēt TĒR RĒT trī rīt TRĪ RĪT"},
	{Id: 18, LessonText: "tēs rēs Tēs Rēs TĒS RĒS šērt Šērt ŠĒRT"},
	{Id: 19, LessonText: "rīts Rīts RĪTS tēre Tēre TĒRE sērt Sērt SĒRT rīta Rīta RĪTA"},
	{Id: 20, LessonText: "u ū U Ū"},
	{Id: 21, LessonText: "tu ūt Tu Ūt TU ŪT rūt Rūt RŪT tūr Tūr TŪR ūtra Ūtra ŪTRA"},
	{Id: 22, LessonText: "sūt Sūt SŪT rūs Rūs RŪS tūs Tūs TŪS"},
	{Id: 23, LessonText: "ūtru Ūtru ŪTRU tūre Tūre TŪRE sūrs Sūrs SŪRS sūtra Sūtra SŪTRA"},
	{Id: 24, LessonText: "n ņ N Ņ"},
	{Id: 25, LessonText: "na ņa Na Ņa ŅA nē ņē Nē Ņē ŅĒ ņem Ņem ŅEM"},
	{Id: 26, LessonText: "nūt ņūt Nūt Ņūt ŅŪT ņērt Ņērt ŅĒRT"},
	{Id: 27, LessonText: "nāsi Nāsi NĀSI ņemt Ņemt ŅEMT ēna Ēna ĒNA nēsis Nēsis NĒSIS"},
	{Id: 28, LessonText: "k ķ K Ķ"},
	{Id: 29, LessonText: "ka ķa Ka Ķa ĶA ke ķe Ke Ķe ĶE kī ķī Kī Ķī ĶĪ"},
	{Id: 30, LessonText: "kūt ķūt Kūt Ķūt ĶŪT ķērt Ķērt ĶĒRT"},
	{Id: 31, LessonText: "kāre Kāre KĀRE ķēķis Ķēķis ĶĒĶIS kūts Kūts KŪTS ķēniņš Ķēniņš ĶĒNIŅŠ"},
	{Id: 32, LessonText: "o m O M"},
	{Id: 33, LessonText: "om mo Om Mo OM MO mā mē Mā Mē MĀ MĒ mūs Mūs MŪS"},
	{Id: 34, LessonText: "mēs Mēs MĒS ome Ome OME māk Māk MĀK"},
	{Id: 35, LessonText: "māte Māte MĀTE mērs Mērs MĒRS mēness Mēness MĒNESS"},
	{Id: 36, LessonText: "l ļ L Ļ"},
	{Id: 37, LessonText: "la ļa La Ļa ĻA le ļe Le Ļe ĻE lī ļī Lī Ļī ĻĪ"},
	{Id: 38, LessonText: "lēt ļēt Lēt Ļēt ĻĒT ļūt Ļūt ĻŪT lūk Lūk LŪK"},
	{Id: 39, LessonText: "lāse Lāse LĀSE ļoti Ļoti ĻOTI lēni Lēni LĒNI līme Līme LĪME ļāva Ļāva ĻĀVA"},
	{Id: 40, LessonText: "d p v D P V"},
	{Id: 41, LessonText: "da pa va Da Pa Va DA PA VA dē pē vē Dē Pē Vē DĒ PĒ VĒ"},
	{Id: 42, LessonText: "dēl pēl vēl Dēl Pēl Vēl DĒL PĒL VĒL vērt Vērt VĒRT"},
	{Id: 43, LessonText: "dēls Dēls DĒLS pīle Pīle PĪLE vērt Vērt VĒRT vēlme Vēlme VĒLME dēsts Dēsts DĒSTS"},
	{Id: 44, LessonText: "j z ž J Z Ž"},
	{Id: 45, LessonText: "ja za ža Ja Za Ža JA ZA ŽA jē zē že Jē Zē Že JĒ ZĒ ŽE"},
	{Id: 46, LessonText: "jūs zūs žūs Jūs Zūs Žūs JŪS ZŪS ŽŪS žēl Žēl ŽĒL"},
	{Id: 47, LessonText: "jūra Jūra JŪRA zīme Zīme ZĪME žēls Žēls ŽĒLS jēls Jēls JĒLS zāle Zāle ZĀLE"},
	{Id: 48, LessonText: "b g ģ B G Ģ"},
	{Id: 49, LessonText: "ba ga ģa Ba Ga Ģa BA GA ĢA bē ģē Bē Ģē BĒ ĢĒ"},
	{Id: 50, LessonText: "bēr ģēr Bēr Ģēr BĒR ĢĒR gāz Gāz GĀZ būt Būt BŪT"},
	{Id: 51, LessonText: "bite Bite BITE ģērbt Ģērbt ĢĒRBT gāze Gāze GĀZE bēres Bēres BĒRES ģērbies Ģērbies ĢĒRBIES"},
	{Id: 52, LessonText: "c č f h C Č F H"},
	{Id: 53, LessonText: "ca ča fa ha Ca Ča Fa Ha CA ČA FA HA cē čē fē hē Cē Čē Fē Hē"},
	{Id: 54, LessonText: "cēl čēl fēn hēl Cēl Čēl Fēn Hēl CĒL ČĒL FĒN HĒL"},
	{Id: 55, LessonText: "celt Celt CELT čība Čība ČĪBA fine Fine FINE halle Halle HALLE čūska Čūska ČŪSKA"},
}

func SeedLessons() {
	for _, lesson := range lessons {

		// Step 1: Check if the lesson already exists in the database by its ID
		var count int
		query := `SELECT COUNT(*) FROM Lessons WHERE lessonId = ?`
		err := db.DB.QueryRow(query, lesson.Id).Scan(&count)
		if err != nil {
			if err != sql.ErrNoRows {
				fmt.Fprintf(os.Stderr, "Error checking if lesson with ID %d exists: %v\n", lesson.Id, err)
			}
			continue
		}

		// Step 2: If the lesson doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO Lessons (lessonId,  lessonText) VALUES (?, ?)`
			_, err := db.DB.Exec(insertQuery, lesson.Id, lesson.LessonText)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting lesson with ID %d: %v\n", lesson.Id, err)
			} else {
				fmt.Printf("Inserted lesson with ID %d and text: %s\n", lesson.Id, lesson.LessonText)
			}
		}
	}
}
