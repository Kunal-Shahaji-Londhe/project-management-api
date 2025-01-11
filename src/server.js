// src/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import sequelize from './config/database.js'
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Basic test route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
  console.log("Hey i still got it.")
});

// Sync database and start server

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
