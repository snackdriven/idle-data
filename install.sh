#!/bin/bash

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    case $color in
        "green") echo -e "\033[32m$message\033[0m" ;;
        "yellow") echo -e "\033[33m$message\033[0m" ;;
        "red") echo -e "\033[31m$message\033[0m" ;;
        *) echo "$message" ;;
    esac
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install system dependencies
install_system_deps() {
    print_status "green" "Installing system dependencies..."
    
    # Update package lists
    sudo apt-get update
    
    # Install basic dependencies
    sudo apt-get install -y \
        curl \
        git \
        build-essential \
        python3 \
        python3-pip
}

# Function to install Node.js
install_node() {
    if command_exists node; then
        print_status "yellow" "Node.js is already installed. Version: $(node --version)"
        return
    fi

    print_status "green" "Installing Node.js..."
    
    # Install Node.js 20.x
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Verify installation
    if command_exists node; then
        print_status "green" "Node.js installed successfully. Version: $(node --version)"
    else
        print_status "red" "Failed to install Node.js"
        exit 1
    fi
}

# Function to install Encore CLI
install_encore() {
    if command_exists encore; then
        print_status "yellow" "Encore CLI is already installed."
        return
    fi

    print_status "green" "Installing Encore CLI..."
    curl -L https://encore.dev/install.sh | bash

    # Verify installation
    if command_exists encore; then
        print_status "green" "Encore CLI installed successfully"
    else
        print_status "red" "Failed to install Encore CLI"
        exit 1
    fi
}

# Function to install project dependencies
install_dependencies() {
    print_status "green" "Installing project dependencies..."
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_status "red" "package.json not found. Are you in the correct directory?"
        exit 1
    fi

    # Install root dependencies
    print_status "green" "Installing root project dependencies..."
    npm install

    # Install frontend dependencies
    if [ -d "frontend" ]; then
        print_status "green" "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
    fi

    # Check if installation was successful
    if [ $? -eq 0 ]; then
        print_status "green" "All dependencies installed successfully!"
    else
        print_status "red" "Failed to install dependencies"
        exit 1
    fi
}

# Function to setup development environment
setup_dev_env() {
    print_status "green" "Setting up development environment..."

    # Create necessary directories
    mkdir -p .vscode

    # Create VSCode settings
    cat > .vscode/settings.json << EOL
{
    "typescript.tsdk": "node_modules/typescript/lib",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    "files.eol": "\n",
    "remote.WSL.fileWatcher.polling": true
}
EOL

    # Create environment file if it doesn't exist
    if [ ! -f ".env" ]; then
        cat > .env << EOL
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:4000

# Database Configuration (if needed)
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=idle_data

# Monitoring Configuration
MONITOR_INTERVAL=300
EOL
        print_status "yellow" "Created .env file with default values. Please update as needed."
    fi

    # Setup services
    setup_services
}

# Function to setup individual services
setup_services() {
    print_status "green" "Setting up services..."

    # Setup journal service
    if [ -d "journal" ]; then
        print_status "green" "Setting up journal service..."
        cd journal
        if [ ! -d "migrations" ]; then
            mkdir -p migrations
        fi
        cd ..
    fi

    # Setup monitor service
    if [ -d "monitor" ]; then
        print_status "green" "Setting up monitor service..."
        cd monitor
        if [ ! -d "migrations" ]; then
            mkdir -p migrations
        fi
        cd ..
    fi

    # Setup site service
    if [ -d "site" ]; then
        print_status "green" "Setting up site service..."
        cd site
        if [ ! -d "migrations" ]; then
            mkdir -p migrations
        fi
        cd ..
    fi

    # Setup frontend service
    if [ -d "frontend" ]; then
        print_status "green" "Setting up frontend service..."
        cd frontend
        # Ensure next.config.mjs exists
        if [ ! -f "next.config.mjs" ]; then
            print_status "yellow" "Creating next.config.mjs..."
            cat > next.config.mjs << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4000/api/:path*',
            },
        ]
    },
}

export default nextConfig
EOL
        fi
        cd ..
    fi
}

# Function to setup Docker environment
setup_docker() {
    print_status "green" "Setting up Docker environment..."

    # Create Dockerfile if it doesn't exist
    if [ ! -f "Dockerfile" ]; then
        cat > Dockerfile << EOL
FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    curl \\
    git \\
    && rm -rf /var/lib/apt/lists/*

# Install Encore CLI
RUN curl -L https://encore.dev/install.sh | bash

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install

# Copy project files
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Expose ports
EXPOSE 3000
EXPOSE 4000

# Start command
CMD ["./docker-start.sh"]
EOL
        print_status "green" "Created Dockerfile"
    fi

    # Create docker-compose.yml if it doesn't exist
    if [ ! -f "docker-compose.yml" ]; then
        cat > docker-compose.yml << EOL
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "4000:4000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/frontend/node_modules
      - /app/frontend/.next
    environment:
      - NODE_ENV=development
    depends_on:
      - db
    command: ./docker-start.sh

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=idle_data
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOL
        print_status "green" "Created docker-compose.yml"
    fi

    # Create docker-start.sh if it doesn't exist
    if [ ! -f "docker-start.sh" ]; then
        cat > docker-start.sh << EOL
#!/bin/bash

# Start Encore development server in the background
encore run &

# Wait for Encore to start
sleep 5

# Start frontend development server
cd frontend && npm run dev
EOL
        chmod +x docker-start.sh
        print_status "green" "Created docker-start.sh"
    fi

    # Create .dockerignore
    if [ ! -f ".dockerignore" ]; then
        cat > .dockerignore << EOL
node_modules
**/node_modules
npm-debug.log
.env
.git
.gitignore
.vscode
*.md
.next
**/dist
EOL
        print_status "green" "Created .dockerignore"
    fi
}

# Function to setup Git configuration
setup_git() {
    print_status "green" "Setting up Git configuration..."

    # Check if Git is installed
    if ! command_exists git; then
        print_status "red" "Git is not installed. Installing Git..."
        sudo apt-get install -y git
    fi

    # Check if git config exists
    if [ ! -f "~/.gitconfig" ]; then
        print_status "yellow" "Git configuration not found. Let's set it up..."
        
        # Prompt for Git configuration
        print_status "yellow" "Please enter your Git username:"
        read git_username
        print_status "yellow" "Please enter your Git email:"
        read git_email

        # Configure Git globally
        git config --global user.name "$git_username"
        git config --global user.email "$git_email"
        
        # Configure default branch name
        git config --global init.defaultBranch main
        
        # Configure line endings for cross-platform compatibility
        git config --global core.autocrlf input
    else
        print_status "yellow" "Git configuration already exists."
    fi

    # Initialize Git repository if not already initialized
    if [ ! -d ".git" ]; then
        print_status "green" "Initializing Git repository..."
        git init
        
        # Add .gitignore if it doesn't exist
        if [ ! -f ".gitignore" ]; then
            cat > .gitignore << EOL
# Dependencies
node_modules/
**/node_modules/

# Build outputs
.next/
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# System files
.DS_Store
Thumbs.db

# Database
*.sqlite
*.db

# Encore local development
.encore
EOL
            print_status "green" "Created .gitignore file"
        fi

        # Add all files and make initial commit
        git add .
        git commit -m "Initial commit"
    fi

    # Setup remote repository if not already set
    if ! git remote | grep -q "origin"; then
        print_status "yellow" "No remote repository found."
        print_status "yellow" "Please enter your remote repository URL (leave empty to skip):"
        read remote_url
        if [ ! -z "$remote_url" ]; then
            git remote add origin "$remote_url"
            print_status "green" "Remote repository added successfully."
            
            # Ask if user wants to push to remote
            print_status "yellow" "Would you like to push to the remote repository? (y/n)"
            read should_push
            if [ "$should_push" = "y" ]; then
                git push -u origin main
            fi
        fi
    else
        print_status "yellow" "Remote repository already configured."
    fi

    # Configure Git LFS if needed
    if [ -f ".gitattributes" ] || find . -type f -size +50M 2>/dev/null | grep -q .; then
        print_status "yellow" "Large files detected. Setting up Git LFS..."
        
        # Install Git LFS
        sudo apt-get install -y git-lfs
        
        # Initialize Git LFS
        git lfs install
        
        # Setup default LFS tracks if .gitattributes doesn't exist
        if [ ! -f ".gitattributes" ]; then
            cat > .gitattributes << EOL
*.png filter=lfs diff=lfs merge=lfs -text
*.jpg filter=lfs diff=lfs merge=lfs -text
*.jpeg filter=lfs diff=lfs merge=lfs -text
*.gif filter=lfs diff=lfs merge=lfs -text
*.pdf filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.tar.gz filter=lfs diff=lfs merge=lfs -text
EOL
            git add .gitattributes
            git commit -m "Add Git LFS configuration"
        fi
    fi

    print_status "green" "Git setup completed successfully!"
}

# Main installation process
main() {
    print_status "green" "Starting installation process..."

    # Setup Git first
    setup_git

    # Check if running in Docker
    if [ -f "/.dockerenv" ]; then
        print_status "yellow" "Running in Docker container, skipping system-level installations..."
    else
        # Install system dependencies
        install_system_deps

        # Install Node.js
        install_node

        # Install Encore CLI
        install_encore
    fi

    # Install project dependencies
    install_dependencies

    # Setup development environment
    setup_dev_env

    # Setup Docker environment
    setup_docker

    print_status "green" "Installation complete! 🎉"
    print_status "yellow" "Next steps:"
    print_status "yellow" "For local development:"
    print_status "yellow" "1. Run 'encore auth login' to authenticate with Encore"
    print_status "yellow" "2. In one terminal, run 'encore run' to start the backend services"
    print_status "yellow" "3. In another terminal, cd into frontend and run 'npm run dev'"
    print_status "yellow" "4. Visit http://localhost:3000 to view your application"
    print_status "yellow" "\nFor Docker development:"
    print_status "yellow" "1. Run 'docker-compose up --build' to start all services"
    print_status "yellow" "2. Visit http://localhost:3000 to view your application"
    print_status "yellow" "\nFor Git usage:"
    print_status "yellow" "1. Your repository is initialized and configured"
    print_status "yellow" "2. Use 'git push' to push changes to remote repository"
    print_status "yellow" "3. Use 'git pull' to get latest changes"
    print_status "yellow" "\nNote: Update the .env file with your specific configuration if needed"
}

# Run main installation
main 