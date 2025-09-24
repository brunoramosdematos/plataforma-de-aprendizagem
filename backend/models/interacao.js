'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Interacao = sequelize.define('Interacao', {
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Alunos', // Nome da tabela referenciada
        key: 'id',
      },
    },
    tipo: {
      type: DataTypes.ENUM('Forum', 'Chat', 'Tutoria'),
      allowNull: false,
    },
    mensagem: {
      type: DataTypes.TEXT,
    },
    data: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Define o valor padrão como o timestamp atual
    },
  });

  Interacao.associate = (models) => {
    Interacao.belongsTo(models.Aluno, { foreignKey: 'id_aluno' });
  };

  return Interacao;
};