import { DataTypes } from "sequelize";
import sequelize from '../config/database.js'

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: DataTypes.TEXT,
    ownerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key:'id'
        }
    }
});

export default Project;