'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('AlunoRecursos', [
      {
        id_aluno: 1,
        id_recurso: 1,
        progresso: '75%',
        feedback: 'Muito bom até agora',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('AlunoRecursos', null, {});
  },
};