package main

import (
	"latvian-typing-tutor/db"
	seed "latvian-typing-tutor/db/seeds"
	"latvian-typing-tutor/server"
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
