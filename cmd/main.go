package main

import (
	"latvianKeyboardTypingPlatform/db"
	seed "latvianKeyboardTypingPlatform/db/seeds"
	"latvianKeyboardTypingPlatform/server"
)

func main() {

	db.Initialize()

	db.CreateTables()

	seed.Lessons()
	seed.LatvianWords()
	seed.PoetTexts()

	server.StartServer()
}
