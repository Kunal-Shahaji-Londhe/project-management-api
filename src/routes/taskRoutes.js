import express from 'express';
import taskController from '../controllers/taskController.js'
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All task routes are protected

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create new task (Only project owners/members can create tasks.)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               projectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/', auth, taskController.createTask);

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks for a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/project/:projectId', auth, taskController.getProjectTasks);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get specific task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Task details
 */
router.get('/:id', auth, taskController.getTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   put:
 *     tags: [Tasks]
 *     summary: Update task (Only project owners/members can update tasks.)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [TODO, IN_PROGRESS, DONE]
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put('/:id', auth, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{taskId}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task (Only project owners can delete tasks.)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:id', auth, taskController.deleteTask);

/**
 * @swagger
 * /api/tasks/{taskId}/assign:
 *   post:
 *     tags: [Tasks]
 *     summary: Assign task to user (Only project members can assign tasks.)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task assigned
 */
router.post('/:id/assign', auth, taskController.assignTask);

export default router;