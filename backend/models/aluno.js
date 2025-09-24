'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Adiciona validação de unicidade para evitar e-mails duplicados
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: true, // Agora é opcional no momento do cadastro
    },
    nivel_programacao: {
      type: DataTypes.ENUM('Iniciante', 'Intermediário', 'Avançado'),
      allowNull: true, // Alterado para opcional no momento do cadastro
    },
    dificuldades: {
      type: DataTypes.TEXT,
      allowNull: true, // Agora é opcional
    },
    objetivos: {
      type: DataTypes.TEXT,
      allowNull: true, // Agora é opcional
    },
    preferencias_aprendizado: {
      type: DataTypes.TEXT,
      allowNull: true, // Agora é opcional
    },
    linguagens_interesse: {
      type: DataTypes.TEXT,
      allowNull: true, // Agora é opcional
    },
  });

  // Definição das associações
  Aluno.associate = (models) => {
    Aluno.hasMany(models.Interacao, { foreignKey: 'id_aluno' });
    Aluno.belongsToMany(models.RecursoAprendizado, {
      through: 'AlunoRecurso',
      foreignKey: 'id_aluno',
    });
  };

  return Aluno;
};