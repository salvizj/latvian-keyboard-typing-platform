package db

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func Initialize() {
	// Load environment variables from .env file
	if err := godotenv.Load(".env"); err != nil {
		fmt.Fprintf(os.Stderr, "Warning: Could not load .env file\n")
		os.Exit(1)
	}

	// Fetch the necessary environment variables
	user := os.Getenv("SUPABASE_USER")
	password := os.Getenv("SUPABASE_PASSWORD")
	host := os.Getenv("SUPABASE_HOST")
	port := os.Getenv("SUPABASE_PORT")
	dbname := os.Getenv("SUPABASE_DB_NAME")

	// Ensure all required environment variables are set
	if user == "" || password == "" || host == "" || port == "" || dbname == "" {
		fmt.Fprintf(os.Stderr, "Error: One or more environment variables are not set\n")
		os.Exit(1)
	}

	// Construct the PostgreSQL connection string for Supabase
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", user, password, host, port, dbname)

	// Open PostgreSQL connection and assign it to the global DB variable
	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to open database connection: %s\n", err)
		os.Exit(1)
	}

	// Ping the PostgreSQL database to verify the connection
	if err := DB.Ping(); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to ping database: %s\n", err)
		os.Exit(1)
	}

	// Successful connection message
	fmt.Println("Successfully connected to Supabase PostgreSQL database!")
}
