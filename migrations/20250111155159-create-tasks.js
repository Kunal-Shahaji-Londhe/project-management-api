'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */

  await queryInterface.createTable('Tasks', {
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
  })
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  await queryInterface.dropTable('Tasks')
}
