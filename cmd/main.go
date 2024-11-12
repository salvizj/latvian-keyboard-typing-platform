package main

import (
	"latvian-typing-tutor/db"
	"latvian-typing-tutor/server"
)

// entry point
func main() {

	db.Initialize()
	defer db.DB.Close()

	db.CreateTables()
	server.StartServer()
}
