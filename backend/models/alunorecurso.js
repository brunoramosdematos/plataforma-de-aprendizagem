'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const AlunoRecurso = sequelize.define(
    'AlunoRecurso',
    {
      id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: true, // Agora permite valores nulos durante o cadastro inicial
        references: {
          model: 'Alunos', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_recurso: {
        type: DataTypes.INTEGER,
        allowNull: true, // Agora permite valores nulos durante o cadastro inicial
        references: {
          model: 'RecursoAprendizados', // Nome da tabela referenciada
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      progresso: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      feedback: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true, // Inclui campos createdAt e updatedAt automaticamente
      tableName: 'AlunoRecursos', // Nome da tabela no banco de dados
    }
  );

  AlunoRecurso.associate = (models) => {
    AlunoRecurso.belongsTo(models.Aluno, { foreignKey: 'id_aluno' });
    AlunoRecurso.belongsTo(models.RecursoAprendizado, { foreignKey: 'id_recurso' });
  };

  return AlunoRecurso;
};