// routes/interacao.js
const express = require('express');
const { Interacao } = require('../models');
const auth = require('../middleware/auth'); // Middleware de autenticação
const router = express.Router();

// Criar uma nova interação (requer autenticação)
router.post('/', auth, async (req, res) => {
  try {
    const interacao = await Interacao.create({ ...req.body, id_aluno: req.user.id });
    res.status(201).json(interacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todas as interações (não requer autenticação)
router.get('/', async (req, res) => {
  try {
    const interacoes = await Interacao.findAll();
    res.status(200).json(interacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar uma interação por ID (requer autenticação)
router.get('/:id', auth, async (req, res) => {
  try {
    const interacao = await Interacao.findByPk(req.params.id);
    if (!interacao) {
      return res.status(404).json({ error: 'Interação não encontrada' });
    }
    res.status(200).json(interacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma interação (requer autenticação)
router.put('/:id', auth, async (req, res) => {
  try {
    const interacao = await Interacao.findByPk(req.params.id);
    if (!interacao) {
      return res.status(404).json({ error: 'Interação não encontrada' });
    }
    await interacao.update(req.body);
    res.status(200).json(interacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma interação (requer autenticação)
router.delete('/:id', auth, async (req, res) => {
  try {
    const interacao = await Interacao.findByPk(req.params.id);
    if (!interacao) {
      return res.status(404).json({ error: 'Interação não encontrada' });
    }
    await interacao.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;