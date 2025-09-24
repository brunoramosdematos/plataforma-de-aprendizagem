// Importa o framework Express para criar o servidor e gerenciar rotas
const express = require('express');
const cors = require('cors'); // Middleware para resolver problemas de CORS

// Importa as rotas específicas para cada tabela do banco de dados
const alunoRoutes = require('./routes/aluno'); // Rotas para Aluno
const recursoAprendizadoRoutes = require('./routes/recursoAprendizado'); // Rotas para RecursoAprendizado
const interacaoRoutes = require('./routes/interacao'); // Rotas para Interacao
const alunoRecursoRoutes = require('./routes/alunoRecurso'); // Rotas para AlunoRecurso

// Cria a instância principal do aplicativo Express
const app = express();

// Middleware para processar requisições JSON
// Garante que o corpo das requisições (JSON) seja automaticamente convertido em objetos JavaScript
app.use(express.json());

// Middleware para resolver problemas de CORS
// Permite que o frontend no localhost:3000 acesse o backend no localhost:5000
const corsOptions = {
  origin: 'http://localhost:3000', // Permite acesso apenas do frontend local
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};
app.use(cors(corsOptions)); // Aplica o middleware de CORS

// Define as rotas principais da API
// Cada rota é conectada a um conjunto específico de funcionalidades relacionadas a uma tabela
app.use('/alunos', alunoRoutes); // Gerencia operações CRUD para a tabela Aluno
app.use('/recursos', recursoAprendizadoRoutes); // Gerencia operações CRUD para a tabela RecursoAprendizado
app.use('/interacoes', interacaoRoutes); // Gerencia operações CRUD para a tabela Interacao
app.use('/aluno-recursos', alunoRecursoRoutes); // Gerencia operações CRUD para a tabela AlunoRecurso

// Rota raiz (endpoint principal)
// Verifica o funcionamento básico da API
app.get('/', (req, res) => res.send('API funcionando!'));

// Middleware para tratar rotas inexistentes
// É acionado quando nenhuma rota correspondente é encontrada
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' }); // Retorna erro 404
});

// Middleware para tratamento de erros internos
// Garante que erros sejam capturados e uma mensagem amigável seja retornada
app.use((err, req, res, next) => {
  console.error(err.stack); // Loga o erro no console para debug
  res.status(500).json({ error: 'Erro interno no servidor' }); // Retorna erro 500
});

// Define a porta em que o servidor será iniciado
// Usa a variável de ambiente PORT, caso disponível, ou o padrão 5000
const PORT = process.env.PORT || 5000;

// Inicializa o servidor e escuta requisições na porta especificada
// Exibe uma mensagem no console indicando que o servidor está funcionando
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));