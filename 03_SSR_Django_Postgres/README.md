# Project Description

## 01: Project Description

This project build a Backend for a recipe APP with the following features:

1. TDD with Django Test Framework using unittest library
2. Token Authentification
3. Django Admin Interface
4. Django REST Framework
5. Postgres
6. Swagger for API documentation
7. Flake8 and Black for linting and formatting
8. Docker
9. CI/CD GitHub Actions
10. Deployment to AWS

## 02: Future Updates

1. Terraform
2. Poetry
3. Social Auth
4. MFA
5. Deployment to GCP
6. React Frontend

## 03: Local Development Usage

1. **Build & Run conatiner**

   ```bash
   docker compose up --build
   ```

2. **Run flake8**

   ```bash
   docker compose run --rm app sh -c "flake8"
   ```

3. **Run Black**

   ```bash
   docker compose run --rm app sh -c "black app"
   ```

4. **Create Django Project**

   ```bash
   docker compose run --rm app sh -c "django-admin startproject app ."
   ```

5. **Create New App**

   ```bash
   docker compose run --rm app sh -c "python manage.py startapp core"
   ```

6. **Django Run Test**

   ```bash
   docker compose run --rm app sh -c "python manage.py test"
   ```

7. **Create and Apply Migrations**

   ```bash
   docker compose run --rm app sh -c "python manage.py makemigrations"
   ```

   ```bash
   docker compose run --rm app sh -c "python manage.py wait_for_db && python manage.py migrate"
   ```

8. **Create Superuser**

   ```bash
   docker compose run --rm app sh -c "python manage.py createsuperuser"
   ```

9. **Create Superuser**

   ```bash
   docker compose run --rm app sh -c "python manage.py createsuperuser"
   ```
