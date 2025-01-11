'use strict';
import { v4 as uuidv4 } from 'uuid';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */

  // Store IDs to use for relationships
  const userIds = {};
  const projectIds = {};

  // 1. Seed Users
  const users = [
    {
      id: uuidv4(),
      username: 'john_doe',
      email: 'john@example.com',
      password: '$2b$10$mW5mRXH3mh8PNG0Q1DHkUOc6O9syxEYpz1YwGDGkrGF1BGqGUkEK2', // 'password123'
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      username: 'jane_smith',
      email: 'jane@example.com',
      password: '$2b$10$mW5mRXH3mh8PNG0Q1DHkUOc6O9syxEYpz1YwGDGkrGF1BGqGUkEK2', // 'password123'
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      username: 'mike_wilson',
      email: 'mike@example.com',
      password: '$2b$10$mW5mRXH3mh8PNG0Q1DHkUOc6O9syxEYpz1YwGDGkrGF1BGqGUkEK2', // 'password123'
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Insert users and store their IDs
  await queryInterface.bulkInsert('Users', users);
  users.forEach(user => {
    userIds[user.username] = user.id;
  });

  // 2. Seed Projects
  const projects = [
    {
      id: uuidv4(),
      name: 'E-commerce Platform',
      description: 'Build a new e-commerce platform with advanced features',
      ownerId: userIds['john_doe'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'Mobile App Development',
      description: 'Develop iOS and Android apps for the platform',
      ownerId: userIds['jane_smith'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      name: 'API Integration',
      description: 'Integrate third-party APIs and services',
      ownerId: userIds['mike_wilson'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Insert projects and store their IDs
  await queryInterface.bulkInsert('Projects', projects);
  projects.forEach(project => {
    projectIds[project.name] = project.id;
  });

  // 3. Seed Tasks
  const tasks = [
    {
      id: uuidv4(),
      title: 'Database Design',
      description: 'Design database schema for e-commerce platform',
      status: 'IN_PROGRESS',
      projectId: projectIds['E-commerce Platform'],
      assignedTo: userIds['john_doe'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'User Authentication',
      description: 'Implement user authentication system',
      status: 'TODO',
      projectId: projectIds['E-commerce Platform'],
      assignedTo: userIds['jane_smith'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'UI Design',
      description: 'Design mobile app UI/UX',
      status: 'TODO',
      projectId: projectIds['Mobile App Development'],
      assignedTo: userIds['mike_wilson'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      title: 'Payment Integration',
      description: 'Integrate payment gateway APIs',
      status: 'DONE',
      projectId: projectIds['API Integration'],
      assignedTo: userIds['jane_smith'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Insert tasks
  await queryInterface.bulkInsert('Tasks', tasks);
}

export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */

  // Delete in reverse order to respect foreign key constraints
  await queryInterface.bulkDelete('Tasks', null, {});
  await queryInterface.bulkDelete('Projects', null, {});
  await queryInterface.bulkDelete('Users', null, {});
}
