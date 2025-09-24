'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Alunos', [
      {
        nome: 'João Silva',
        email: 'joao.silva@example.com',
        senha: 'senha123',
        data_nascimento: '1990-01-01',
        nivel_programacao: 'Iniciante',
        dificuldades: 'Falta de prática',
        objetivos: 'Aprender Python',
        preferencias_aprendizado: 'Vídeos',
        linguagens_interesse: 'Python, JavaScript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Alunos', null, {});
  },
};