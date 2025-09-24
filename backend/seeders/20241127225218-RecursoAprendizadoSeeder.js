'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('RecursoAprendizados', [
      {
        titulo: 'Curso de Python para Iniciantes',
        descricao: 'Curso completo de Python',
        tipo: 'Curso',
        link: 'https://example.com/python-curso',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('RecursoAprendizados', null, {});
  },
};