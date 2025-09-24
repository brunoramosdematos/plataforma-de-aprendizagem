// routes/alunoRecurso.js
const express = require('express');
const { AlunoRecurso, Aluno, RecursoAprendizado } = require('../models');
const auth = require('../middleware/auth'); // Middleware de autenticação
const router = express.Router();

// Criar uma nova relação Aluno-Recurso (requer autenticação)
router.post('/', auth, async (req, res) => {
  try {
    const alunoRecurso = await AlunoRecurso.create(req.body);
    res.status(201).json(alunoRecurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todas as relações Aluno-Recurso (requer autenticação)
router.get('/', auth, async (req, res) => {
  try {
    const alunoRecursos = await AlunoRecurso.findAll({
      include: [
        { model: Aluno, attributes: ['nome', 'email'] },
        { model: RecursoAprendizado, attributes: ['titulo', 'tipo'] },
      ],
    });
    res.status(200).json(alunoRecursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar uma relação Aluno-Recurso por ID (requer autenticação)
router.get('/:id', auth, async (req, res) => {
  try {
    const alunoRecurso = await AlunoRecurso.findByPk(req.params.id, {
      include: [
        { model: Aluno, attributes: ['nome', 'email'] },
        { model: RecursoAprendizado, attributes: ['titulo', 'tipo'] },
      ],
    });
    if (!alunoRecurso) {
      return res.status(404).json({ error: 'Relação não encontrada' });
    }
    res.status(200).json(alunoRecurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma relação Aluno-Recurso (requer autenticação)
router.put('/:id', auth, async (req, res) => {
  try {
    const alunoRecurso = await AlunoRecurso.findByPk(req.params.id);
    if (!alunoRecurso) {
      return res.status(404).json({ error: 'Relação não encontrada' });
    }
    await alunoRecurso.update(req.body);
    res.status(200).json(alunoRecurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma relação Aluno-Recurso (requer autenticação)
router.delete('/:id', auth, async (req, res) => {
  try {
    const alunoRecurso = await AlunoRecurso.findByPk(req.params.id);
    if (!alunoRecurso) {
      return res.status(404).json({ error: 'Relação não encontrada' });
    }
    await alunoRecurso.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;