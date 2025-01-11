import { Sequelize } from "sequelize";
import { setupRelationships } from "./relationships.js";
import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";

const models = {
    User,
    Project,
    Task,
}

setupRelationships(models);

console.log('con:',models.Task.associations); // To verify `users` association exists


export default models;

// code for testing the database connection

/* const config = require("../config/database");

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        logging:config.logging
    }
);

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection established succesfully.');
    } catch (error) {
        console.error('Unable to connect to the databse', error);
    }
}

testConnection();

module.exports = sequelize; */

