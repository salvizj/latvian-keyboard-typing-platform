BINARY_NAME := latvian-typing-tutor.exe

install:
	@echo "Installing frontend dependencies..."
	cd web && npm install
	@if [ $$? -ne 0 ]; then echo "Frontend install failed"; exit 1; fi
	@echo "Installing backend dependencies..."
	go mod tidy
	@if [ $$? -ne 0 ]; then echo "Backend install failed"; exit 1; fi

build:
	@echo "Building frontend..."
	cd web && npm run build
	@if [ $$? -ne 0 ]; then echo "Frontend build failed"; exit 1; fi
	@echo "Building backend..."
	go build -o $(BINARY_NAME) cmd/main.go
	@if [ $$? -ne 0 ]; then echo "Backend build failed"; exit 1; fi
	@echo "Build complete: $(BINARY_NAME)"

build-dev:
	@echo "Building frontend in development mode..."
	cd web && npm run build:dev
	@if [ $$? -ne 0 ]; then echo "Frontend build failed"; exit 1; fi
	@echo "Building backend in development mode..."
	go build -o $(BINARY_NAME) cmd/main.go
	@if [ $$? -ne 0 ]; then echo "Backend build failed"; exit 1; fi
	@echo "Development build complete: $(BINARY_NAME)"

run: build
	@echo "Running in production mode..."
	./$(BINARY_NAME)

build-and-run: build
	@echo "Running project in production mode..."
	./$(BINARY_NAME)

build-and-run-dev: build-dev
	@echo "Running project in development mode..."
	./$(BINARY_NAME)

format:
	@echo "Formatting frontend code..."
	npx prettier --write "web/**/*.tsx" "web/**/*.ts"
	@echo "Formatting backend code..."
	go fmt ./...

clean:
	@if [ -f $(BINARY_NAME) ]; then \
		rm -f $(BINARY_NAME); \
		echo "Cleaned up built binaries."; \
	else \
		echo "No binaries to clean."; \
	fi

linters:
	@echo "Running Go linter..."
	golangci-lint run ./...
	@echo "Running ESLint on frontend code..."
	cd web && npm run lint
	@if [ $$? -ne 0 ]; then echo "ESLint failed"; exit 1; fi

.PHONY: install build build-dev run build-and-run build-and-run-dev format clean linters
