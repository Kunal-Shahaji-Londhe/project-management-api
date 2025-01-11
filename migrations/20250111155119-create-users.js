'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */

  await queryInterface.createTable('Users', {
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
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

  await queryInterface.dropTable('Users');
}
