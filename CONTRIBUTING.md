# Contributing to Bento Restaurant Management System

Thank you for your interest in contributing to Bento Restaurant Management System! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Prerequisites

- Python 3.8+
- Node.js and npm
- Docker and Docker Compose (for local development)
- Git

### Setting Up Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/bento-restro.git
cd bento-restro
```

3. Add the original repository as upstream:
```bash
git remote add upstream https://github.com/desujoy/bento-restro.git
```

4. Create a branch for your work:
```bash
git checkout -b feature/your-feature-name
```

### Development Workflow

1. Set up the development environment using Docker:
```bash
docker-compose up --build
```

2. Make your changes in your feature branch
3. Write or update tests as needed
4. Run tests to ensure everything works
5. Update documentation if you're changing functionality

### Commit Guidelines

We follow conventional commits for clear communication:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or updating tests
- `chore:` - Changes to build process or auxiliary tools

Example:
```bash
git commit -m "feat: add table reservation feature"
```

### Pull Request Process

1. Update your fork with the latest upstream changes:
```bash
git fetch upstream
git rebase upstream/main
```

2. Push your changes to your fork:
```bash
git push origin feature/your-feature-name
```

3. Create a Pull Request through GitHub
4. Fill in the PR template with:
   - Description of changes
   - Related issue numbers
   - Screenshots (if UI changes)
   - List of changes made

### Pull Request Review

- All PRs require at least one review from a maintainer
- Address any comments or requested changes
- Once approved, a maintainer will merge your PR

## Testing

### Backend (Django)
```bash
# Run tests
docker-compose exec backend python manage.py test

# Run with coverage
docker-compose exec backend coverage run manage.py test
docker-compose exec backend coverage report
```

### Frontend (React)
```bash
# Run tests
docker-compose exec frontend npm test

# Run with coverage
docker-compose exec frontend npm test -- --coverage
```

## Style Guide

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints where possible
- Maximum line length: 88 characters (Black formatter)
- Use docstrings for functions and classes

### JavaScript/React (Frontend)
- Follow ESLint configuration
- Use functional components with hooks
- Use TypeScript for type safety
- Follow project's existing patterns for components and state management

## Getting Help

- Create an issue for bugs or feature requests
- Join our community discussions in GitHub Discussions
- Tag maintainers in comments if you need specific help

## Recognition

Contributors will be recognized in:
- The project's README.md
- GitHub's contributors page
- Release notes when their contributions are included

Thank you for contributing to Bento Restaurant Management System!
