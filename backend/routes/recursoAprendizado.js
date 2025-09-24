// routes/recursoAprendizado.js
const express = require('express');
const { RecursoAprendizado } = require('../models');
const auth = require('../middleware/auth'); // Middleware de autenticação
const router = express.Router();

// Criar um novo recurso (requer autenticação)
router.post('/', auth, async (req, res) => {
  try {
    const recurso = await RecursoAprendizado.create(req.body);
    res.status(201).json(recurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os recursos (não requer autenticação)
router.get('/', async (req, res) => {
  try {
    const recursos = await RecursoAprendizado.findAll();
    res.status(200).json(recursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar um recurso por ID (requer autenticação)
router.get('/:id', auth, async (req, res) => {
  try {
    const recurso = await RecursoAprendizado.findByPk(req.params.id);
    if (!recurso) {
      return res.status(404).json({ error: 'Recurso não encontrado' });
    }
    res.status(200).json(recurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar um recurso (requer autenticação)
router.put('/:id', auth, async (req, res) => {
  try {
    const recurso = await RecursoAprendizado.findByPk(req.params.id);
    if (!recurso) {
      return res.status(404).json({ error: 'Recurso não encontrado' });
    }
    await recurso.update(req.body);
    res.status(200).json(recurso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir um recurso (requer autenticação)
router.delete('/:id', auth, async (req, res) => {
  try {
    const recurso = await RecursoAprendizado.findByPk(req.params.id);
    if (!recurso) {
      return res.status(404).json({ error: 'Recurso não encontrado' });
    }
    await recurso.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;