import {
  criarItemMenu,
  buscarItemPorId,
  buscarItensPorCategoria,
  listarTodosItens,
  atualizarItemMenu as atualizarItemService,
  desativarItemMenu as desativarItemService
} from '../services/menuService.js';

// Adição de novo item ao menu
export const adicionarItemMenu = async (req, res) => {
  const { nome, preco, categoria, descricao, imagem, disponivel } = req.body;

  if (!nome || !preco || !categoria) {
      return res.status(400).json({
          success: false,
          message: 'Nome, preço e categoria são obrigatórios'
      });
  }

  if (isNaN(preco) || preco <= 0) {
      return res.status(400).json({
          success: false,
          message: 'Preço deve ser um número positivo'
      });
  }

  try {
      const novoItem = await criarItemMenu(
          nome, 
          preco, 
          categoria, 
          descricao, 
          imagem, 
          disponivel
      );
      
      res.status(201).json({
          success: true,
          data: novoItem,
          message: 'Item criado com sucesso'
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Erro ao criar item no menu',
          error: error.message
      });
  }
};

// Buscar item por ID
export const buscarItemMenuPorId = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
      return res.status(400).json({
          success: false,
          message: 'ID deve ser um número válido'
      });
  }

  try {
      const item = await buscarItemPorId(id);

      res.json({
          success: true,
          data: item
      });
  } catch (error) {
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      res.status(statusCode).json({
          success: false,
          message: 'Erro ao buscar item',
          error: error.message
      });
  }
};

// Buscar itens por categoria
export const buscarItensMenuPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  try {
      const itens = await buscarItensPorCategoria(categoria);

      res.json({
          success: true,
          data: itens,
          count: itens.length
      });
  } catch (error) {
      const statusCode = error.message.includes('inválida') ? 400 : 500;
      res.status(statusCode).json({
          success: false,
          message: 'Erro ao buscar itens por categoria',
          error: error.message
      });
  }
};

// Listar todos os itens do menu
export const listarTodosItensMenu = async (req, res) => {
  try {
      const itens = await listarTodosItens();

      res.json({
          success: true,
          data: itens,
          count: itens.length
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Erro ao listar itens do menu',
          error: error.message
      });
  }
};

// Atualizar item do menu
export const handleAtualizarItemMenu = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  if (isNaN(id)) {
      return res.status(400).json({
          success: false,
          message: 'ID deve ser um número válido'
      });
  }

  try {
      const itemAtualizado = await atualizarItemService(id, dadosAtualizados);
      
      res.json({
          success: true,
          data: itemAtualizado,
          message: 'Item atualizado com sucesso'
      });
  } catch (error) {
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      res.status(statusCode).json({
          success: false,
          message: 'Erro ao atualizar item',
          error: error.message
      });
  }
};

// Desativar item do menu
export const handleDesativarItemMenu = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
      return res.status(400).json({
          success: false,
          message: 'ID deve ser um número válido'
      });
  }

  try {
      const itemDesativado = await desativarItemService(id);
      
      res.json({
          success: true,
          data: itemDesativado,
          message: 'Item desativado com sucesso'
      });
  } catch (error) {
      const statusCode = error.message.includes('não encontrado') ? 404 : 500;
      res.status(statusCode).json({
          success: false,
          message: 'Erro ao desativar item',
          error: error.message
      });
  }
};