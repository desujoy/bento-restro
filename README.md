# Bento Restaurant Management System

A modern and efficient restaurant management system designed to streamline operations for Bento-style restaurants.

## Video Demo
[![bento-restro video](https://img.youtube.com/vi/RtueEzZhKL0/0.jpg)](https://www.youtube.com/watch?v=RtueEzZhKL0)

## Features

- **Menu Management**: Easily manage and update your restaurant's menu items
- **Order Processing**: Handle customer orders efficiently
- **Table Management**: Track table occupancy and reservations
- **Inventory Control**: Monitor and manage ingredient stock levels
- **Staff Management**: Handle employee schedules and roles
- **Sales Reports**: Generate detailed reports and analytics
- **User-friendly Interface**: Modern and intuitive design for ease of use

## Tech Stack

- Frontend: React.js
- Backend: Python with Django REST Framework
- Database: PostgreSQL
- Containerization: Docker & Docker Compose
- Additional Libraries: (See package.json and Pipfile for details)

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git (for version control)

### Installation

#### Option 1: Using Docker (Recommended)

1. Clone the repository
```bash
git clone https://github.com/desujoy/bento-restro.git
cd bento-restro
```

2. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```env
SECRET_KEY=your_django_secret_key
FRONTEND_URL=http://localhost
BACKEND_API=http://localhost:8000
```

3. Start the application using Docker Compose
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: `http://localhost` (Port 80)
- Backend API: `http://localhost:8000`
- Database: PostgreSQL running on default port (not exposed)

Services included:
- Frontend: React application served through Nginx
- Backend: Django REST Framework application
- Database: PostgreSQL 13

To stop the services:
```bash
docker-compose down
```

To remove all data including database volume:
```bash
docker-compose down -v
```

#### Option 2: Manual Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/bento-restro.git
cd bento-restro
```

2. Set up Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# Apply database migrations
python manage.py migrate
# Create a superuser (optional)
python manage.py createsuperuser
# Run development server
python manage.py runserver
```

3. Set up Frontend
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
bento-restro/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Public assets
│   ├── Dockerfile     # Frontend container configuration
│   └── package.json   # Frontend dependencies
├── backend/           # Django backend application
│   ├── core/          # Main Django app
│   ├── restro_backend/# Django project settings
│   ├── fixtures/      # Initial data fixtures
│   ├── manage.py      # Django management script
│   ├── Dockerfile     # Backend container configuration
│   ├── start.sh       # Container startup script
│   ├── Pipfile        # Python dependencies
│   └── requirements.txt# Python dependencies (alternative)
├── docker-compose.yml # Docker Compose configuration
└── .env              # Environment variables
```

## API Documentation

The Django backend provides a REST API that can be accessed at:
- API Root: `http://localhost:8000/api/`
- Admin Interface: `http://localhost:8000/admin/`
- API Documentation: `http://localhost:8000/api/docs/` (if enabled)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by modern restaurant management systems
- Built with love for the restaurant industry

## Development

### Working with Docker

#### Viewing logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

#### Accessing the Django shell
```bash
docker-compose exec backend python manage.py shell
```

#### Database Operations
```bash
# Create migrations
docker-compose exec backend python manage.py makemigrations

# Apply migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser
```
