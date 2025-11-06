#!/usr/bin/env bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create tmp directory and setup logging
mkdir -p tmp
LOG_FILE="tmp/startup.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "=== Setup started at $(date) ===" >> "$LOG_FILE"
echo -e "${GREEN}=== SynchronicityEngine Setup ===${NC}"
echo -e "${YELLOW}Logging to: $LOG_FILE${NC}\n"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
if npm install; then
    echo -e "${GREEN}✓ Dependencies installed${NC}\n"
else
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    read -p "Press Enter to close..."
    exit 1
fi

# Build all packages
echo -e "${YELLOW}Building all packages...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build successful${NC}\n"
else
    echo -e "${RED}✗ Build failed${NC}"
    read -p "Press Enter to close..."
    exit 1
fi

# Start Docker services
echo -e "${YELLOW}Starting Docker services...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found. Please install Docker Desktop.${NC}"
    read -p "Press Enter to close..."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}✗ Docker is not running. Please start Docker Desktop.${NC}"
    read -p "Press Enter to close..."
    exit 1
fi

if docker compose up -d; then
    echo -e "${GREEN}✓ Docker services started${NC}"
    echo -e "${YELLOW}Waiting for database to be ready...${NC}"

    # Wait for database to be healthy
    for i in {1..30}; do
        if docker compose exec -T postgres pg_isready -U synchronicity &> /dev/null; then
            echo -e "${GREEN}✓ Database is ready${NC}\n"
            break
        fi
        if [ $i -eq 30 ]; then
            echo -e "${RED}✗ Database failed to start${NC}"
            read -p "Press Enter to close..."
            exit 1
        fi
        sleep 1
    done
else
    echo -e "${RED}✗ Failed to start Docker services${NC}"
    read -p "Press Enter to close..."
    exit 1
fi

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
if npm run migrate --workspace=@synchronicity/persistence; then
    echo -e "${GREEN}✓ Migrations completed${NC}\n"
else
    echo -e "${RED}✗ Migrations failed${NC}"
    read -p "Press Enter to close..."
    exit 1
fi

# Success - start dev servers automatically
echo -e "${GREEN}=== Setup Complete! ===${NC}\n"
echo -e "${YELLOW}Starting dev servers...${NC}"
echo -e "${YELLOW}Backend will run on http://localhost:3000${NC}"
echo -e "${YELLOW}Frontend will run on http://localhost:5173${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Start backend in background
(cd apps/backend && npm run dev) &
BACKEND_PID=$!

# Start frontend (this will keep terminal open)
(cd apps/frontend && npm run dev)

# If frontend exits, kill backend
kill $BACKEND_PID 2>/dev/null
