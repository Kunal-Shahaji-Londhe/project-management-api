// controllers/userController.js
import models from "../models/index.js";
const { User } = models;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userController = {
    // Create - Register new user
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            let user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            user = await User.create({
                username,
                email,
                password: hashedPassword
            });

            // Generate JWT
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'User registered successfully',
                token
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // In userController.js, add this method
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Logged in successfully',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Read - Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] }
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Read - Get single user
    async getUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                attributes: { exclude: ['password'] }
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Update user
    async updateUser(req, res) {
        try {
            const { username, email } = req.body;
            const user = await User.findByPk(req.params.id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if user is authorized to update
            if (user.id !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await user.update({ username, email });
            res.json({ message: 'User updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if user is authorized to delete
            if (user.id !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await user.destroy();
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};