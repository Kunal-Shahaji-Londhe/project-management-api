'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable('Projects', {
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
  })
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */

  await queryInterface.dropTable('Projects');
}
