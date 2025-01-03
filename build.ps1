# Command-line argument handling
param (
    [string]$target
)

# Define the binary name
$BINARY_NAME = "latvian-typing-tutor.exe"

function Install {
    Write-Host "Installing frontend dependencies..."
    Set-Location web
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Frontend install failed"
        exit 1
    }
    Set-Location ..

    Write-Host "Installing backend dependencies..."
    go mod tidy
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Backend install failed"
        exit 1
    }
}

function Build {
    Write-Host "Building frontend..."
    Set-Location web
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Frontend build failed"
        exit 1
    }
    Set-Location ..

    Write-Host "Building backend..."
    go build -o $BINARY_NAME cmd/main.go
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Backend build failed"
        exit 1
    }
    Write-Host "Build complete: $BINARY_NAME"
}

function BuildDev {
    Write-Host "Building frontend in development mode..."
    Set-Location web
    npm run build:dev
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Frontend build failed"
        exit 1
    }
    Set-Location ..

    Write-Host "Building backend in development mode..."
    go build -o $BINARY_NAME cmd/main.go
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Backend build failed"
        exit 1
    }
    Write-Host "Development build complete: $BINARY_NAME"
}

function Run {
    Build
    Write-Host "Running in production mode..."
    & "./$BINARY_NAME"
}

function RunDev {
    BuildDev
    Write-Host "Running in development mode..."
    & "./$BINARY_NAME"
}


function Format {
    Write-Host "Formatting frontend code..."
    npx prettier --write "web/**/*.tsx" "web/**/*.ts"
    Write-Host "Formatting backend code..."
    go fmt ./...
}

function Clean {
    if (Test-Path $BINARY_NAME) {
        Remove-Item $BINARY_NAME -Force
        Write-Host "Cleaned up built binaries."
    } else {
        Write-Host "No binaries to clean."
    }
}
function Linters {
 Write-Host "Running Go linter..."
    golangci-lint run ./...
    Set-Location web
    Write-Host "Running ESLint..."
    npm run lint
    Set-Location  ..
    
}


switch ($target) {
    "install" { Install }
    "build" { Build }
    "build-dev" { BuildDev }
    "run" { Run }
    "run-dev" { RunDev }
    "format" { Format }
    "clean" { Clean }
    "linters" { Linters }
    default { Write-Host "Usage: ./build.ps1 [install|build|build-dev|run|run-dev|format|clean|linters]" }
}
