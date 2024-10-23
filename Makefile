BINARY_NAME=latvian-typing-tutor

# Install dependencies for both frontend and backend
install:
	@cd web && npm install || (echo "Frontend install failed" && exit 1)
	@go mod tidy || (echo "Backend install failed" && exit 1)

build:
	@cd web && npm run build || (echo "Frontend build failed" && exit 1)
	@go build -o $(BINARY_NAME) cmd/main.go
	@chmod +x $(BINARY_NAME)
	@ls -l $(BINARY_NAME)

build-dev:
	@cd web && npm run build:dev || (echo "Frontend build failed" && exit 1)
	@go build -o $(BINARY_NAME) cmd/main.go
	@chmod +x $(BINARY_NAME)
	@ls -l $(BINARY_NAME)

run: build
	@echo "Running in production mode..."
	@./$(BINARY_NAME)

run-dev: build-dev
	@echo "Running in development mode..."
	@./$(BINARY_NAME)

format:
	@npx prettier --write "**/*.tsx" "**/*.ts"
	@go fmt ./...

# Clean up built binary
clean:
	@rm -f $(BINARY_NAME)
	@echo "Cleaned up built binaries."
