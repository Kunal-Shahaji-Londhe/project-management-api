import express from 'express'
import { userController } from '../controllers/userController.js';
import { auth } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Public routes
// USER ROUTES
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Users]
 *     summary: Register new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered
 */
router.post('/register', userController.register);

// Protected routes

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 */
router.get('/me', auth, userController.getUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get('/', auth, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     tags: [Users]
 *     summary: Update user profile (Only logged in user can update their own profile.)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/:id', auth, userController.updateUser);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user (Only logged in user can delete their own profile.)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/:id', auth, userController.deleteUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', userController.login);

export default router;