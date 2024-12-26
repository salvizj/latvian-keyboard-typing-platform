package db

import (
	"fmt"
	"os"
)

type Table struct {
	name  string
	query string
}

var tables = []Table{
	{
		name: "Users",
		query: `
			CREATE TABLE IF NOT EXISTS "Users" (
				userId UUID PRIMARY KEY,
				email TEXT NOT NULL,
				encriptedPassword TEXT NOT NULL
			);
		`,
	},
	{
		name: "PoetTexts",
		query: `
			CREATE TABLE IF NOT EXISTS "PoetTexts" (
				poetTextId SERIAL PRIMARY KEY,
				poetAuthor TEXT NOT NULL,
				poetFragmentName TEXT NOT NULL,
				poetTextContent TEXT NOT NULL
			);
		`,
	},

	{
		name: "Lessons",
		query: `
			CREATE TABLE IF NOT EXISTS "Lessons" (
				lessonId SERIAL PRIMARY KEY,
				lessonText TEXT NOT NULL,
				lessonDifficulty TEXT NOT NULL
			);
		`,
	},

	{
		name: "TypingTestSettings",
		query: `
			CREATE TABLE IF NOT EXISTS "TypingTestSettings" (
				typingTestSettingsId SERIAL PRIMARY KEY,
				textType TEXT NOT NULL CHECK (textType IN ('poet', 'custom')),
				textId INTEGER,
				customText TEXT,
				time INTEGER NOT NULL,
				FOREIGN KEY (textId) REFERENCES "PoetTexts"(poetTextId)
			);
		`,
	},

	{
		name: "TypingRaceSettings",
		query: `
			CREATE TABLE IF NOT EXISTS "TypingRaceSettings" (
				typingRaceSettingsId SERIAL PRIMARY KEY,
				textType TEXT NOT NULL CHECK (textType IN ('poet', 'custom')),
				textId INTEGER,
				customText TEXT,
				maxPlayerCount INTEGER NOT NULL,
				time INTEGER NOT NULL,
				FOREIGN KEY (textId) REFERENCES "PoetTexts"(poetTextId)
			);
		`,
	},

	{
		name: "TypingTests",
		query: `
			CREATE TABLE IF NOT EXISTS "TypingTests" (
				typingTestId SERIAL PRIMARY KEY,
				userId UUID NOT NULL,
				typingTestSettingsId INTEGER NOT NULL,
				wpm INTEGER NOT NULL,
				mistakeCount INTEGER NOT NULL,
				date DATE NOT NULL,
				FOREIGN KEY (typingTestSettingsId) REFERENCES "TypingTestSettings"(typingTestSettingsId),
				FOREIGN KEY (userId) REFERENCES "Users"(userId) ON DELETE CASCADE
			);
		`,
	},

	{
		name: "TypingRaces",
		query: `
			CREATE TABLE IF NOT EXISTS "TypingRaces" (
				typingRaceId UUID PRIMARY KEY,
				typingRaceSettingsId INTEGER NOT NULL,
				date DATE NOT NULL,
				FOREIGN KEY (typingRaceSettingsId) REFERENCES "TypingRaceSettings"(typingRaceSettingsId)
			);
		`,
	},

	{
		name: "LessonCompletion",
		query: `
			CREATE TABLE IF NOT EXISTS "LessonCompletion" (
				userId UUID,
				lessonId INTEGER NOT NULL,
				PRIMARY KEY (userId, lessonId),
				FOREIGN KEY (userId) REFERENCES "Users"(userId) ON DELETE CASCADE
			);

		`,
	},

	{
		name: "TypingRacePlayers",
		query: `
			CREATE TABLE IF NOT EXISTS "TypingRacePlayers" (
				typingRacePlayerId UUID PRIMARY KEY,
				typingRaceId UUID NOT NULL,
				username TEXT NOT NULL,
				userId UUID,
				role TEXT NOT NULL,
				place INTEGER NOT NULL,
				mistakeCount INTEGER NOT NULL,
				wpm INTEGER NOT NULL,
				FOREIGN KEY (typingRaceId) REFERENCES "TypingRaces"(typingRaceId),
				FOREIGN KEY (userId) REFERENCES "Users"(userId) ON DELETE CASCADE
			);
		`,
	},

	{
		name: "GameRecords",
		query: `
			CREATE TABLE IF NOT EXISTS "GameRecords" (
				gameRecordId SERIAL PRIMARY KEY,
				gameName TEXT NOT NULL,
				gameRecord INTEGER NOT NULL,
				userId UUID NOT NULL,
				FOREIGN KEY (userId) REFERENCES "Users"(userId) ON DELETE CASCADE
			);
		`,
	},

	{
		name: "LatvianWords",
		query: `
			CREATE TABLE IF NOT EXISTS "LatvianWords" (
				latvianWordId SERIAL PRIMARY KEY,
				latvianWord TEXT NOT NULL
			);
		`,
	},
}

func tableExists(tableName string) bool {
	var exists bool
	query := `SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = $1
    );`
	err := DB.QueryRow(query, tableName).Scan(&exists)
	if err != nil {
		return false
	}
	return exists
}

func createTable(tableName, tableQuery string) {
	_, err := DB.Exec(tableQuery)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating %s table: %v\n", tableName, err)
	} else {
		fmt.Printf("Table %s created successfully.\n", tableName)
	}
}

func CreateTables() {
	for _, table := range tables {
		if tableExists(table.name) {
		} else {
			fmt.Printf("Table %s does not exist. Proceeding to create.\n", table.name)
			createTable(table.name, table.query)
		}
	}
}
