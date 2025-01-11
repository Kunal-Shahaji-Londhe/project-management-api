import express from 'express';
import { projectController } from '../controllers/projectController.js'
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All project routes are protected

/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags: [Projects]
 *     summary: Create new project
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 */
router.post('/', auth, projectController.createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Get all projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/', auth, projectController.getAllProjects);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   get:
 *     tags: [Projects]
 *     summary: Get specific project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Project details
 */
router.get('/:id', auth, projectController.getProject);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   put:
 *     tags: [Projects]
 *     summary: Update project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
router.put('/:id', auth, projectController.updateProject);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   delete:
 *     tags: [Projects]
 *     summary: Delete project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete('/:id', auth, projectController.deleteProject);

/**
 * @swagger
 * /api/projects/{projectId}/assign:
 *   post:
 *     tags: [Projects]
 *     summary: Assign user to project (Only project owners can assign users.)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
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
 *         description: User assigned to project
 */
router.post('/:id/assign', auth, projectController.assignUser);

export default router;