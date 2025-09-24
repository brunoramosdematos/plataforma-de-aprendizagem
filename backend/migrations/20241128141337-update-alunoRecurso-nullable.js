'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Atualizar a tabela existente 'AlunoRecursos' para permitir valores nulos nos campos 'id_aluno' e 'id_recurso'
    await queryInterface.changeColumn('AlunoRecursos', 'id_aluno', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitir valores nulos
      references: {
        model: 'Alunos', // Nome da tabela referenciada
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.changeColumn('AlunoRecursos', 'id_recurso', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitir valores nulos
      references: {
        model: 'RecursoAprendizados', // Nome da tabela referenciada
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverter as alterações para não permitir valores nulos
    await queryInterface.changeColumn('AlunoRecursos', 'id_aluno', {
      type: Sequelize.INTEGER,
      allowNull: false, // Não permitir valores nulos
      references: {
        model: 'Alunos', // Nome da tabela referenciada
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.changeColumn('AlunoRecursos', 'id_recurso', {
      type: Sequelize.INTEGER,
      allowNull: false, // Não permitir valores nulos
      references: {
        model: 'RecursoAprendizados', // Nome da tabela referenciada
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};