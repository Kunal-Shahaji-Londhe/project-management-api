// controllers/taskController.js
import models from "../models/index.js";
const { Project, User, Task } = models;

const taskController = {
    // Create task
    async createTask(req, res) {
        try {
            const { title, description, projectId } = req.body;
            
            // Check if project exists and user has access
            const project = await Project.findByPk(projectId);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Check if user is part of the project
            const isProjectMember = await project.hasUser(req.user.id);
            if (!isProjectMember) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            const task = await Task.create({
                title,
                description,
                status: 'TODO',
                projectId,
            });

            res.status(201).json({
                message: 'Task created successfully',
                task
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Read - Get all tasks for a project
    async getProjectTasks(req, res) {
        try {
            const tasks = await Task.findAll({
                where: { projectId: req.params.projectId },
                include: [{
                    model: User,
                    as: 'assignee',
                    attributes: ['id', 'username', 'email']
                }]
            });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Read - Get single task
    async getTask(req, res) {
        try {
            const task = await Task.findByPk(req.params.id, {
                include: [{
                    model: User,
                    as: 'assignee',
                    attributes: ['id', 'username', 'email']
                }]
            });
            
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Update task
    async updateTask(req, res) {
        try {
            const { title, description, status, assignedTo } = req.body;
            const task = await Task.findByPk(req.params.id);
            
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Check if user is part of the project
            const project = await Project.findByPk(task.projectId);
            const isProjectMember = await project.hasUser(req.user.id);
            if (!isProjectMember) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await task.update({ title, description, status, assignedTo });
            res.json({ message: 'Task updated successfully', task });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Delete task
    async deleteTask(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Check if user is project owner
            const project = await Project.findByPk(task.projectId);
            if (project.ownerId !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            await task.destroy();
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    },

    // Assign task to user
    async assignTask(req, res) {
        try {
            const { userId } = req.body;
            const task = await Task.findByPk(req.params.id);
            
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            // Check if user is part of the project
            const project = await Project.findByPk(task.projectId);
            const isProjectMember = await project.hasUser(req.user.id);
            if (!isProjectMember) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            // Check if assignee is part of the project
            const isAssigneeMember = await project.hasUser(userId);
            if (!isAssigneeMember) {
                return res.status(400).json({ message: 'Assignee must be a project member' });
            }

            await task.update({ assignedTo: userId });
            res.json({ message: 'Task assigned successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

export default taskController;