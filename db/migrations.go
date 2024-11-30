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
			CREATE TABLE IF NOT EXISTS Users (
				userId TEXT PRIMARY KEY
			);
		`,
	},
	{
		name: "Lessons",
		query: `
			CREATE TABLE IF NOT EXISTS Lessons (
				lessonId SERIAL PRIMARY KEY,
				lessonText TEXT NOT NULL,
				lessonDifficulty TEXT NOT NULL
			);
		`,
	},
	{
		name: "LessonProgress",
		query: `
			CREATE TABLE IF NOT EXISTS LessonProgress (
				lessonProgressId SERIAL PRIMARY KEY,
				userId TEXT NOT NULL,
				lessonId INTEGER NOT NULL,
				isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
				FOREIGN KEY (lessonId) REFERENCES Lessons(lessonId),
				FOREIGN KEY (userId) REFERENCES Users(userId) 
			);
		`,
	},
	{
		name: "PoetTexts",
		query: `
			CREATE TABLE IF NOT EXISTS PoetTexts (
				poetTextId SERIAL PRIMARY KEY,
				poetAuthor TEXT NOT NULL,
				poetFragmentName TEXT NOT NULL,
				poetTextContent TEXT NOT NULL
			);
		`,
	},
	{name: "Records",
		query: `
			CREATE TABLE IF NOT EXISTS Records (
				recordId SERIAL PRIMARY KEY,
				gameName TEXT NOT NULL,
				record INTEGER NOT NULL,
				userId TEXT NOT NULL, 
				FOREIGN KEY (userId) REFERENCES Users(userId)
			);
		`,
	},
	{
		name: "LatvianWords",
		query: `
			CREATE TABLE IF NOT EXISTS LatvianWords (
				latvianWordId SERIAL PRIMARY KEY,
				latvianWord TEXT NOT NULL
			);
		`,
	},
	{
		name: "TypingTests",
		query: `
			CREATE TABLE IF NOT EXISTS TypingTest (
				typingTestId SERIAL PRIMARY KEY,          
				userId TEXT NOT NULL,                           
				typingTestSettingsId INTEGER NOT NULL,         
				wpm INTEGER NOT NULL,   
				mistakeCount INTEGER NOT NULL,      
				timestamp BIGINT NOT NULL,                  
				FOREIGN KEY (typingTestSettingsId) REFERENCES TypingTestSettings(typingTestSettingsId),
				FOREIGN KEY (userId) REFERENCES Users(userId) 
			);
		`,
	},
	{
		name: "TypingRace",
		query: `
			CREATE TABLE IF NOT EXISTS TypingRace (
				typingRaceId TEXT PRIMARY KEY,   
				typingRaceSettingsId INTEGER NOT NULL,      
				timestamp BIGINT NOT NULL,                
				FOREIGN KEY (typingRaceSettingsId) REFERENCES TypingRaceSettings(typingRaceSettingsId)
			);
		`,
	},
	{
		name: "TypingTestSettings",
		query: `
			CREATE TABLE IF NOT EXISTS TypingTestSettings (
				typingTestSettingsId SERIAL PRIMARY KEY,
				textType TEXT NOT NULL CHECK (textType IN ('poet', 'custom')),
				textId INTEGER,
				customText TEXT,
				time INTEGER NOT NULL,
				FOREIGN KEY (textId) REFERENCES PoetTexts(poetTextId)
			);
		`,
	},
	{
		name: "TypingRaceSettings",
		query: `
			CREATE TABLE IF NOT EXISTS TypingRaceSettings (
				typingRaceSettingsId SERIAL PRIMARY KEY,
				textType TEXT NOT NULL CHECK (textType IN ('poet', 'custom')),
				textId INTEGER,
				customText TEXT,
				maxPlayerCount INTEGER NOT NULL,
				time INTEGER NOT NULL,
				FOREIGN KEY (textId) REFERENCES PoetTexts(poetTextId)
			);
		`,
	},
	{
		name: "TypingRacePlayers",
		query: `
			CREATE TABLE IF NOT EXISTS TypingRacePlayers (
				typingRacePlayerId SERIAL PRIMARY KEY,
				typingRaceId TEXT NOT NULL,
				username TEXT NOT NULL,
				userId TEXT NOT NULL,
				role TEXT NOT NULL,
				place INTEGER NOT NULL,
				mistakeCount INTEGER NOT NULL,
				wpm INTEGER NOT NULL,
				typingRaceSettingsId INTEGER NOT NULL,
				FOREIGN KEY (typingRaceId) REFERENCES TypingRace(typingRaceId),
				FOREIGN KEY (userId) REFERENCES Users(userId) 
			);
		`,
	},
}

func tableExists(tableName string) bool {
	var exists bool
	query := `SELECT EXISTS (
		SELECT 1 FROM information_schema.tables 
		WHERE table_name = $1
	);`
	err := DB.QueryRow(query, tableName).Scan(&exists)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error checking if table %s exists: %v\n", tableName, err)
		return false
	}
	return exists
}

func createTable(tableName, tableQuery string) {
	if tableExists(tableName) {
		fmt.Printf("Table %s already exists. Skipping creation.\n", tableName)
		return
	}

	_, err := DB.Exec(tableQuery)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error creating %s table: %v\n", tableName, err)
	} else {
		fmt.Printf("Table %s created successfully.\n", tableName)
	}
}

func CreateTables() {
	for _, table := range tables {
		createTable(table.name, table.query)
	}
}
