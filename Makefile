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

clean:
	@if [ -f $(BINARY_NAME) ]; then \
		rm -f $(BINARY_NAME); \
		echo "Cleaned up built binaries."; \
	else \
		echo "No binaries to clean."; \
	fi

.PHONY: install build build-dev run clean
