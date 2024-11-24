package main

import (
	"latvianKeyboardTypingPlatform/db"
	seed "latvianKeyboardTypingPlatform/db/seeds"
	"latvianKeyboardTypingPlatform/server"
)

// entry point
func main() {

	db.Initialize()
	defer db.DB.Close()

	db.CreateTables()

	seed.SeedLessons()
	seed.SeedPoetTexts()

	server.StartServer()
}
