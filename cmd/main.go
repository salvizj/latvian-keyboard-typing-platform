package main

import (
	"latvianKeyboardTypingPlatform/db"
	seed "latvianKeyboardTypingPlatform/db/seeds"
	"latvianKeyboardTypingPlatform/server"
)

// entry point
func main() {

	db.Initialize()

	db.CreateTables()

	seed.SeedLessons()
	seed.SeedLatvianWords()
	seed.SeedPoetTexts()

	server.StartServer()
}
