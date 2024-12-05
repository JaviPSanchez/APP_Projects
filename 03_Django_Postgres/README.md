# Project Setup and Usage

## Python Environment Setup

1. **Run flake8**

   ```bash
   docker compose run --rm app sh -c "flake8"
   ```

1. **Create Django Project**

   ```bash
   docker compose run --rm app sh -c "django-admin startproject app ."
   ```
