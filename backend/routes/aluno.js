// routes/aluno.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Aluno, AlunoRecurso, RecursoAprendizado } = require('../models'); // Importa os modelos necessários
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware de autenticação

// Variável de ambiente para JWT
const JWT_SECRET = process.env.JWT_SECRET || 'secretdeteste'; // Certifique-se de definir JWT_SECRET no .env

// Endpoint para criar um novo aluno
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, email e senha' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10); // Criptografa a senha antes de salvar
    const aluno = await Aluno.create({ nome, email, senha: hashedPassword });
    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para listar todos os alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt'],
    });
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para buscar um aluno por ID
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'email', 'createdAt', 'updatedAt', 'nivel_programacao'],
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Novo endpoint para a Dashboard
router.get('/:id/dashboard', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID no token corresponde ao ID da requisição
    if (parseInt(id, 10) !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado: ID do token não corresponde ao ID da requisição' });
    }

    // Busca informações do aluno
    const aluno = await Aluno.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'nivel_programacao'],
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Ajuste no nome da tabela para acessar corretamente os recursos associados ao aluno
    const recursos = await AlunoRecurso.findAll({
      where: { id_aluno: id },
      include: [
        {
          model: RecursoAprendizado,
          attributes: ['titulo', 'tipo'],
        },
      ],
    });

    // Dados fictícios para progresso e estatísticas (atualizar conforme necessário)
    const progresso = {
      cursos_concluidos: 3, // Placeholder
      total_cursos: 10, // Placeholder
    };

    // Monta a resposta da Dashboard
    const dashboardData = {
      aluno,
      progresso,
      recursos,
      mensagens_motivacionais: [
        "Continue se esforçando! Você está indo muito bem!",
        "Complete mais um módulo para desbloquear um troféu!",
      ],
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Erro ao buscar dados da Dashboard:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para atualizar os dados de um aluno
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o ID no token corresponde ao ID da requisição
    if (parseInt(id, 10) !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado: ID do token não corresponde ao ID da requisição' });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    const { nome, email, senha, nivel_programacao, data_nascimento, dificuldades, objetivos, preferencias_aprendizado, linguagens_interesse } = req.body;

    const hashedPassword = senha ? await bcrypt.hash(senha, 10) : aluno.senha;
    await aluno.update({
      nome,
      email,
      senha: hashedPassword,
      nivel_programacao,
      data_nascimento,
      dificuldades,
      objetivos,
      preferencias_aprendizado,
      linguagens_interesse: linguagens_interesse?.join(',') || '',
    });

    console.log('Dados atualizados com sucesso para o aluno ID:', id);
    res.status(200).json({ message: 'Dados do aluno atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar os dados do aluno:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para excluir um aluno
router.delete('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await aluno.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const aluno = await Aluno.findOne({ where: { email } });
    if (!aluno) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = jwt.sign({ id: aluno.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, nome: aluno.nome });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;