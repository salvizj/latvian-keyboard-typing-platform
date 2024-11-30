package seed

import (
	"fmt"
	"latvianKeyboardTypingPlatform/db"
	"latvianKeyboardTypingPlatform/types"
	"os"
)

var lessons = []types.Lesson{
	{LessonId: 1, LessonText: "a ā A Ā", LessonDifficulty: "beginner"},
	{LessonId: 2, LessonText: "a ā A Ā aā āa Āa āA ĀA āaā ĀaĀ", LessonDifficulty: "beginner"},
	{LessonId: 3, LessonText: "āra ārā Āra Ārā ĀRA ĀRĀ", LessonDifficulty: "beginner"},
	{LessonId: 4, LessonText: "i ī I Ī", LessonDifficulty: "beginner"},
	{LessonId: 5, LessonText: "i ī I Ī iī īi Īi īI ĪI īiī ĪiĪ īIī ĪIĪ ĪiĪI IīĪi", LessonDifficulty: "beginner"},
	{LessonId: 6, LessonText: "ai āi Ai Āi ĀI īa iā Īa ĪA āī Āī", LessonDifficulty: "beginner"},
	{LessonId: 7, LessonText: "īrā Īra ĪRĀ Āri ĀRI īri aī Aī ĀĪ", LessonDifficulty: "intermediate"},
	{LessonId: 8, LessonText: "s š S Š", LessonDifficulty: "beginner"},
	{LessonId: 9, LessonText: "sa šā Sa Šā ŠĀ si ši Si Ši ŠI šis Šis ŠIS sīs Sīs SĪS", LessonDifficulty: "intermediate"},
	{LessonId: 10, LessonText: "sai šāi Sai Šāi ŠĀI īsa īša Īsa Īša ĪŠA", LessonDifficulty: "intermediate"},
	{LessonId: 11, LessonText: "sāi šī Sāi Šī ŠĪ saša Saša SAŠA šais Šais ŠAIS", LessonDifficulty: "intermediate"},
	{LessonId: 12, LessonText: "e ē E Ē", LessonDifficulty: "beginner"},
	{LessonId: 13, LessonText: "e ē E Ē eē ēe Eē Ēe ĒE ēeē ĒeĒ ēEē ĒEĒ", LessonDifficulty: "beginner"},
	{LessonId: 14, LessonText: "sei šei Sei Šei ŠEI ēsa ēša Ēsa Ēša ĒŠA", LessonDifficulty: "intermediate"},
	{LessonId: 15, LessonText: "ēst Ēst ĒST sēs Sēs SĒS esi Esi ESI šēse Šēse ŠĒSE", LessonDifficulty: "intermediate"},
	{LessonId: 16, LessonText: "t r T R", LessonDifficulty: "beginner"},
	{LessonId: 17, LessonText: "tr rt Tr Rt TR RT tēr rēt Tēr Rēt TĒR RĒT trī rīt TRĪ RĪT", LessonDifficulty: "intermediate"},
	{LessonId: 18, LessonText: "tēs rēs Tēs Rēs TĒS RĒS šērt Šērt ŠĒRT", LessonDifficulty: "intermediate"},
	{LessonId: 19, LessonText: "rīts Rīts RĪTS tēre Tēre TĒRE sērt Sērt SĒRT rīta Rīta RĪTA", LessonDifficulty: "advanced"},
	{LessonId: 20, LessonText: "u ū U Ū", LessonDifficulty: "beginner"},
	{LessonId: 21, LessonText: "tu ūt Tu Ūt TU ŪT rūt Rūt RŪT tūr Tūr TŪR ūtra Ūtra ŪTRA", LessonDifficulty: "intermediate"},
	{LessonId: 22, LessonText: "sūt Sūt SŪT rūs Rūs RŪS tūs Tūs TŪS", LessonDifficulty: "intermediate"},
	{LessonId: 23, LessonText: "ūtru Ūtru ŪTRU tūre Tūre TŪRE sūrs Sūrs SŪRS sūtra Sūtra SŪTRA", LessonDifficulty: "advanced"},
	{LessonId: 24, LessonText: "n ņ N Ņ", LessonDifficulty: "beginner"},
	{LessonId: 25, LessonText: "na ņa Na Ņa ŅA nē ņē Nē Ņē ŅĒ ņem Ņem ŅEM", LessonDifficulty: "intermediate"},
	{LessonId: 26, LessonText: "nūt ņūt Nūt Ņūt ŅŪT ņērt Ņērt ŅĒRT", LessonDifficulty: "intermediate"},
	{LessonId: 27, LessonText: "nāsi Nāsi NĀSI ņemt Ņemt ŅEMT ēna Ēna ĒNA nēsis Nēsis NĒSIS", LessonDifficulty: "advanced"},
	{LessonId: 28, LessonText: "k ķ K Ķ", LessonDifficulty: "beginner"},
	{LessonId: 29, LessonText: "ka ķa Ka Ķa ĶA ke ķe Ke Ķe ĶE kī ķī Kī Ķī ĶĪ", LessonDifficulty: "intermediate"},
	{LessonId: 30, LessonText: "kūt ķūt Kūt Ķūt ĶŪT ķērt Ķērt ĶĒRT", LessonDifficulty: "intermediate"},
	{LessonId: 31, LessonText: "kāre Kāre KĀRE ķēķis Ķēķis ĶĒĶIS kūts Kūts KŪTS ķēniņš Ķēniņš ĶĒNIŅŠ", LessonDifficulty: "advanced"},
	{LessonId: 32, LessonText: "o m O M", LessonDifficulty: "beginner"},
	{LessonId: 33, LessonText: "om mo Om Mo OM MO mā mē Mā Mē MĀ MĒ mūs Mūs MŪS", LessonDifficulty: "intermediate"},
	{LessonId: 34, LessonText: "mēs Mēs MĒS ome Ome OME māk Māk MĀK", LessonDifficulty: "intermediate"},
	{LessonId: 35, LessonText: "māte Māte MĀTE mērs Mērs MĒRS mēness Mēness MĒNESS", LessonDifficulty: "advanced"},
	{LessonId: 36, LessonText: "l ļ L Ļ", LessonDifficulty: "beginner"},
	{LessonId: 37, LessonText: "la ļa La Ļa ĻA le ļe Le Ļe ĻE lī ļī Lī Ļī ĻĪ", LessonDifficulty: "intermediate"},
	{LessonId: 38, LessonText: "lēt ļēt Lēt Ļēt ĻĒT ļūt Ļūt ĻŪT lūk Lūk LŪK", LessonDifficulty: "intermediate"},
	{LessonId: 39, LessonText: "lāse Lāse LĀSE ļoti Ļoti ĻOTI lēni Lēni LĒNI līme Līme LĪME ļāva Ļāva ĻĀVA", LessonDifficulty: "advanced"},
	{LessonId: 40, LessonText: "d p v D P V", LessonDifficulty: "beginner"},
	{LessonId: 41, LessonText: "da pa va Da Pa Va DA PA VA dē pē vē Dē Pē Vē DĒ PĒ VĒ", LessonDifficulty: "intermediate"},
	{LessonId: 42, LessonText: "dēl pēl vēl Dēl Pēl Vēl DĒL PĒL VĒL vērt Vērt VĒRT", LessonDifficulty: "intermediate"},
	{LessonId: 43, LessonText: "dēls Dēls DĒLS pīle Pīle PĪLE vērt Vērt VĒRT vēlme Vēlme VĒLME dēsts Dēsts DĒSTS", LessonDifficulty: "advanced"},
	{LessonId: 44, LessonText: "j z ž J Z Ž", LessonDifficulty: "beginner"},
	{LessonId: 45, LessonText: "ja za ža Ja Za Ža JA ZA ŽA jē zē že Jē Zē Že JĒ ZĒ ŽE", LessonDifficulty: "intermediate"},
	{LessonId: 46, LessonText: "jūs zūs žūs Jūs Zūs Žūs JŪS ZŪS ŽŪS žēl Žēl ŽĒL", LessonDifficulty: "intermediate"},
	{LessonId: 47, LessonText: "jūra Jūra JŪRA zīme Zīme ZĪME žēls Žēls ŽĒLS jēls Jēls JĒLS zāle Zāle ZĀLE", LessonDifficulty: "advanced"},
	{LessonId: 48, LessonText: "b g ģ B G Ģ", LessonDifficulty: "beginner"},
	{LessonId: 49, LessonText: "ba ga ģa Ba Ga Ģa BA GA ĢA bē ģē Bē Ģē BĒ ĢĒ", LessonDifficulty: "intermediate"},
	{LessonId: 50, LessonText: "bēr ģēr Bēr Ģēr BĒR ĢĒR gāz Gāz GĀZ būt Būt BŪT", LessonDifficulty: "intermediate"},
	{LessonId: 51, LessonText: "bite Bite BITE ģērbt Ģērbt ĢĒRBT gāze Gāze GĀZE bēres Bēres BĒRES ģērbies Ģērbies ĢĒRBIES", LessonDifficulty: "advanced"},
	{LessonId: 52, LessonText: "c č f h C Č F H", LessonDifficulty: "beginner"},
	{LessonId: 53, LessonText: "ca ča fa ha Ca Ča Fa Ha CA ČA FA HA cē čē fē hē Cē Čē Fē Hē", LessonDifficulty: "intermediate"},
	{LessonId: 54, LessonText: "cēl čēl fēn hēl Cēl Čēl Fēn Hēl CĒL ČĒL FĒN HĒL", LessonDifficulty: "intermediate"},
	{LessonId: 55, LessonText: "celt Celt CELT čība Čība ČĪBA fine Fine FINE halle Halle HALLE čūska Čūska ČŪSKA", LessonDifficulty: "advanced"},
}

func SeedLessons() {
	for _, lesson := range lessons {

		// Step 1: Check if the lesson already exists in the database by its ID
		var count int
		query := `SELECT COUNT(*) FROM Lessons WHERE lessonId = $1`
		err := db.DB.QueryRow(query, lesson.LessonId).Scan(&count)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error checking if lesson with ID %d exists: %v\n", lesson.LessonId, err)
			continue
		}

		// Step 2: If the lesson doesn't exist, insert it into the database
		if count == 0 {
			insertQuery := `INSERT INTO Lessons (lessonId, lessonText, lessonDifficulty) VALUES ($1, $2, $3)`
			_, err := db.DB.Exec(insertQuery, lesson.LessonId, lesson.LessonText, lesson.LessonDifficulty)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error inserting lesson with lessonId %d: %v\n", lesson.LessonId, err)
			} else {
				fmt.Printf("Inserted lesson with ID %d and text: %s, difficulty: %s\n", lesson.LessonId, lesson.LessonText, lesson.LessonDifficulty)
			}
		} else {
			fmt.Printf("Lesson with ID %d already exists. Skipping.\n", lesson.LessonId)
		}
	}
}
