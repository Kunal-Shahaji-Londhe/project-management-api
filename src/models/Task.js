import { DataTypes } from "sequelize";
import sequelize from '../config/database.js'

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM('TODO', 'IN_PROGRESS',"DONE"),
        defaultValue: "TODO"
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Projects',
            key:'id'
        }
    },
    assignedTo: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id'
        }
    } 
});

export default Task;