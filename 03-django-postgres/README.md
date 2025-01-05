# Recipe API Backend

A robust Django-based REST API for managing recipes, with features including user authentication, image upload, and filtering capabilities.

## Features

### Core Technologies

- Django REST Framework for API development
- PostgreSQL database
- Docker & Docker Compose for containerization
- Nginx as reverse proxy
- uWSGI as application server

### Key Functionalities

- Token-based authentication
- User management (register, login, profile)
- Recipe CRUD operations with image upload
- Tags and ingredients management
- Filtering recipes by tags/ingredients
- Comprehensive API documentation with Swagger/OpenAPI
- Health check endpoint

### Development Tools

- Test-Driven Development (TDD) with Django Test Framework
- Code quality tools:
  - Flake8 for linting
  - Black for code formatting
- CI/CD with GitHub Actions
- Production-ready Docker setup

## Local Development

### Prerequisites

- Docker and Docker Compose installed
- Git

### Environment Setup

1. Clone the repository
2. Create a `.env` file with the following variables:

```bash
DB_NAME=devdb
DB_USER=devuser
DB_PASS=changeme
DJANGO_SECRET_KEY=your-secret-key
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
```

### Development Commands

1. **Build and Run Services**

```bash
# Start services
docker compose up --build

# Stop services
docker compose down

# Remove volumes
docker compose down --volumes
```

2. **Code Quality**

```bash
# Run Flake8
docker compose run --rm app sh -c "flake8"

# Run Black
docker compose run --rm app sh -c "black app"
```

3. **Django Management**

```bash
# Run tests
docker compose run --rm app sh -c "python manage.py test"

# Create migrations
docker compose run --rm app sh -c "python manage.py makemigrations"

# Apply migrations
docker compose run --rm app sh -c "python manage.py wait_for_db && python manage.py migrate"

# Create superuser
docker compose run --rm app sh -c "python manage.py createsuperuser"
```

### Production Deployment

1. **Build and Run Production Services**

```bash
# Build production image
docker compose -f docker-compose-production.yml build

# Start services
docker compose -f docker-compose-production.yml up

# Clean Start Up
docker compose -f docker-compose-production.yml down --volumes

# Deploy only app service updates (no dependencies)
docker compose -f docker-compose-production.yml up --no-deps -d app

# View logs
docker compose -f docker-compose-production.yml logs
```

2. **Production Setup on Ubuntu**

```bash
# Install Docker
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker packages
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start Docker service
systemctl status docker.service
systemctl start docker-service

# Configure user permissions
sudo usermod -aG docker $USER
sudo apt install docker-compose
```

## API Documentation

Once the service is running, access the API documentation at:

- Swagger UI: `http://localhost:8000/api/docs/`
- OpenAPI Schema: `http://localhost:8000/api/schema/`

## Future Enhancements

- Infrastructure as Code with Terraform
- Poetry for dependency management
- Social Authentication
- Multi-Factor Authentication (MFA)
- AWS deployment option
- Frontend UI development
