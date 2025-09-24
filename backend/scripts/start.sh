#!/bin/bash
set -e

# Função para verificar a conexão com o banco de dados usando Sequelize
wait_for_db() {
  echo "Aguardando o banco de dados ficar disponível..."
  while true; do
    node -e "
      const { sequelize } = require('./models'); // Conexão com Sequelize
      sequelize.authenticate()
        .then(() => {
          console.log('Banco de dados disponível!');
          process.exit(0); // Sucesso
        })
        .catch((err) => {
          console.error('Banco de dados não está pronto:', err.message);
          process.exit(1); // Falha
        });
    " && break
    echo "Banco de dados ainda não está pronto, tentando novamente em 2 segundos..."
    sleep 2
  done
}

echo "Desinstalando bcrypt (se existir)..."
npm uninstall bcrypt || true

echo "Reinstalando bcrypt para o ambiente do container..."
npm install bcrypt

# Aguarda o banco de dados estar pronto antes de prosseguir
wait_for_db

echo "Iniciando a aplicação..."
npm run start:dev