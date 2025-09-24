'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Interacaos', [
      {
        id_aluno: 1,
        tipo: 'Forum',
        mensagem: 'Estou tendo dificuldades com loops em Python',
        data: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Interacaos', null, {});
  },
};