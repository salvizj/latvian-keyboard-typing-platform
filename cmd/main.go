package main

import (
	"latvian-typing-tutor/server"
	"log"
)

func main() {
	srv := server.NewServer()
	if err := srv.Start(); err != nil {
		log.Fatal(err)
	}
}
