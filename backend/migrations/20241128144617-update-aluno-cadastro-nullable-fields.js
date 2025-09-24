'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alterar os campos opcionais para permitir valores nulos
    await queryInterface.changeColumn('Alunos', 'data_nascimento', {
      type: Sequelize.DATE,
      allowNull: true, // Permite valor nulo
    });

    await queryInterface.changeColumn('Alunos', 'nivel_programacao', {
      type: Sequelize.ENUM('Iniciante', 'Intermediário', 'Avançado'),
      allowNull: true, // Permite valor nulo
    });

    await queryInterface.changeColumn('Alunos', 'dificuldades', {
      type: Sequelize.TEXT,
      allowNull: true, // Permite valor nulo
    });

    await queryInterface.changeColumn('Alunos', 'objetivos', {
      type: Sequelize.TEXT,
      allowNull: true, // Permite valor nulo
    });

    await queryInterface.changeColumn('Alunos', 'preferencias_aprendizado', {
      type: Sequelize.TEXT,
      allowNull: true, // Permite valor nulo
    });

    await queryInterface.changeColumn('Alunos', 'linguagens_interesse', {
      type: Sequelize.TEXT,
      allowNull: true, // Permite valor nulo
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverter as alterações para os campos obrigatórios
    await queryInterface.changeColumn('Alunos', 'data_nascimento', {
      type: Sequelize.DATE,
      allowNull: false, // Reverte para valor obrigatório
    });

    await queryInterface.changeColumn('Alunos', 'nivel_programacao', {
      type: Sequelize.ENUM('Iniciante', 'Intermediário', 'Avançado'),
      allowNull: false, // Reverte para valor obrigatório
    });

    await queryInterface.changeColumn('Alunos', 'dificuldades', {
      type: Sequelize.TEXT,
      allowNull: false, // Reverte para valor obrigatório
    });

    await queryInterface.changeColumn('Alunos', 'objetivos', {
      type: Sequelize.TEXT,
      allowNull: false, // Reverte para valor obrigatório
    });

    await queryInterface.changeColumn('Alunos', 'preferencias_aprendizado', {
      type: Sequelize.TEXT,
      allowNull: false, // Reverte para valor obrigatório
    });

    await queryInterface.changeColumn('Alunos', 'linguagens_interesse', {
      type: Sequelize.TEXT,
      allowNull: false, // Reverte para valor obrigatório
    });
  },
};