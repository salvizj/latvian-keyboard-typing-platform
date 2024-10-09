package main

import (
	"latvian-typing-tutor/internal/server"
	"log"
)

func main() {
	srv := server.NewServer()
	if err := srv.Start(); err != nil {
		log.Fatal(err)
	}
}
