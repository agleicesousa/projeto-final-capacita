import express from 'express';
import {
  adicionarItemMenu,
  buscarItemMenuPorId,
  buscarItensMenuPorCategoria,
  listarTodosItensMenu,
  handleAtualizarItemMenu,
  handleDesativarItemMenu
} from '../controllers/menuController.js';

const router = express.Router();

router.post('/menu/itens', adicionarItemMenu);
router.get('/menu/itens', listarTodosItensMenu);
router.get('/menu/itens/:id', buscarItemMenuPorId);
router.get('/menu/itens/categoria/:categoria', buscarItensMenuPorCategoria);
router.put('/menu/itens/:id', handleAtualizarItemMenu);
router.delete('/menu/itens/:id', handleDesativarItemMenu);

export default router;