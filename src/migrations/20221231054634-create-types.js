'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Types', {
            typeId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            campId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Camps',
                    key: 'campId',
                },
                onDelete: 'cascade',
            },
            typeLists: {
                type: Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Types');
    },
};
