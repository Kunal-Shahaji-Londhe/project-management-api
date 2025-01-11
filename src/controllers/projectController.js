// controllers/projectController.js
import models from "../models/index.js";
const { Project, User } = models;

export const projectController = {
    // Create project
    async createProject(req, res) {
        try {
            const { name, description } = req.body;
            
            const project = await Project.create({
                name,
                description,
                ownerId: req.user.id
            });

            // Add creator as project member
            await project.addUser(req.user.id);

            res.status(201).json({
                message: 'Project created successfully',
                project
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Read - Get all projects
    async getAllProjects(req, res) {
        try {
            const projects = await Project.findAll({
                include: [{
                    model: User,
                    attributes: ['id', 'username', 'email']
                }]
            });
            res.json(projects);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Read - Get single project
    async getProject(req, res) {
        try {
            const project = await Project.findByPk(req.params.id, {
                include: [{
                    model: User,
                    attributes: ['id', 'username', 'email']
                }]
            });
            
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            res.json(project);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Update project
    async updateProject(req, res) {
        try {
            const { name, description } = req.body;
            const project = await Project.findByPk(req.params.id);
            
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Check if user is project owner
            if (project.ownerId !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await project.update({ name, description });
            res.json({ message: 'Project updated successfully', project });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Delete project
    async deleteProject(req, res) {
        try {
            const project = await Project.findByPk(req.params.id);
            
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Check if user is project owner
            if (project.ownerId !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await project.destroy();
            res.json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Assign user to project
    async assignUser(req, res) {
        try {
            const { userId } = req.body;
            const project = await Project.findByPk(req.params.id);
            
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Check if user is project owner
            if (project.ownerId !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            const userToAssign = await User.findByPk(userId);
            if (!userToAssign) {
                return res.status(404).json({ message: 'User not found' });
            }

            await project.addUser(userId);
            res.json({ message: 'User assigned to project successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};