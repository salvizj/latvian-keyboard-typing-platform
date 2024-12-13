package main

import (
	"latvianKeyboardTypingPlatform/db"
	seed "latvianKeyboardTypingPlatform/db/seeds"
	"latvianKeyboardTypingPlatform/server"
)

func main() {

	db.Initialize()

	db.CreateTables()

	seed.SeedLessons()
	seed.SeedLatvianWords()
	seed.SeedPoetTexts()

	server.StartServer()
}
