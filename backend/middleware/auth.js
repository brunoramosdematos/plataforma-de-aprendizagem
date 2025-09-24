// Importa o módulo 'jsonwebtoken' para manipular tokens JWT
const jwt = require('jsonwebtoken');

// Middleware para verificar e validar tokens JWT em requisições
module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    console.error('Token não fornecido.');
    return res.status(401).json({ error: 'Acesso negado: token não fornecido' });
  }

  const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretdeteste');
    console.log('Token decodificado com sucesso:', verified); // Loga os dados do token decodificado
    req.user = { id: verified.id }; // Adiciona o ID ao objeto req
    next(); // Passa para o próximo middleware
  } catch (error) {
    console.error('Erro ao validar token:', error.message);
    res.status(400).json({ error: 'Token inválido' });
  }
};