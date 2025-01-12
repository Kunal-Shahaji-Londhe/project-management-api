# Project Management API

A RESTful API for project management built with Node.js, Express, and PostgreSQL with Sequelize ORM.

## Features

- User Authentication (Register, Login)
- User Management (CRUD operations)
- Project Management
- Task Management
- API Documentation with Swagger
- JWT-based Authentication
- Database Integration with PostgreSQL using Sequelize ORM
- Model associations and relationships

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
- Sequelize CLI (`npm install -g sequelize-cli`)

## Installation

1. Clone the repository
```bash
git clone <repo-url>
cd project-management-api
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret_key
API_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
```
## Database Setup with Sequelize

1. Make sure PostgreSQL is installed and running on your machine

2. Create `.env` file in the root directory with your database credentials:
```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
```

3. Create the database:
```bash
npx sequelize-cli db:create
```

4. Run the existing migrations:
```bash
npx sequelize-cli db:migrate
```
This will create all necessary tables in your database based on the migration files in the `migrations` folder.

5. Seed the database with initial data:
```bash
npx sequelize-cli db:seed:all
```
This will populate your tables with sample data from the seed files in the `seeders` folder.

If you need to reset the database:
```bash
# Undo all seeds
npx sequelize-cli db:seed:undo:all

# Undo all migrations
npx sequelize-cli db:migrate:undo:all

# Drop database (use with caution!)
npx sequelize-cli db:drop
```
## Database Structure

### Models

The project uses the following Sequelize models:

1. User Model
```javascript
// Basic structure
const User = {
  id: UUID,
  username: STRING,
  email: STRING,
  password: STRING,
}
```

2. Project Model
```javascript
// Basic structure
const Project = {
  id: UUID,
  name: STRING,
  description: TEXT,
  ownerId: UUID,  // Foreign key
}
```

3. Task Model
```javascript
// Basic structure
const Task = {
  id: UUID,
  title: STRING,
  description: TEXT,
  status: ENUM,
  projectId: UUID,  // Foreign key
  userId: UUID,     // Foreign key
}
```

### Model Associations

```javascript
// Associations

// User <-> Project (many to many)
User.belongsToMany(Project, { through: 'UserProjects'});
Project.belongsToMany(User, { through: 'UserProjects'});

// Project -> Task (one to many)    
Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

// User -> Task (One to many, for task assignment)
Task.belongsTo(User, { as : 'assignee', foreignKey: 'assignedTo'});

// User -> Project (One to many , for project ownership)
Project.belongsTo(User, { as: 'owner', foreignKey: 'ownerId'})
```

## Running the Application

Development mode:
```bash
nodemon src/server.js
```

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user

### Users
- GET `/api/users/me` - Get current user profile
- GET `/api/users` - Get all users
- PUT `/api/users/:id` - Update user profile
- DELETE `/api/users/:id` - Delete user

### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create new project
- GET `/api/projects/:id` - Get specific project
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project
- POST  `/api/projects/:id/assign` - Assign user to project

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create new task
- GET `/api/tasks/:id` - Get specific task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task
- POST  `/api/tasks/:id/assign` - Assign task to user

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:
```json
{
  "error": "Error message description"
}
```
