'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const RecursoAprendizado = sequelize.define('RecursoAprendizado', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    tipo: {
      type: DataTypes.ENUM('Tutorial', 'Curso', 'Exercício'),
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  RecursoAprendizado.associate = (models) => {
    RecursoAprendizado.belongsToMany(models.Aluno, {
      through: 'AlunoRecurso',
      foreignKey: 'id_recurso',
    });
  };

  return RecursoAprendizado;
};