import prisma from '../config/database.js';
import { CategoriaMenu } from '@prisma/client';

// Criar novo item no menu
export const criarItemMenu = async (nome, preco, categoria, descricao = null, imagem = null, disponivel = true) => {
    try {
        // Validar categoria
        const categoriaUpper = categoria.toUpperCase();
        if (!Object.values(CategoriaMenu).includes(categoriaUpper)) {
            throw new Error('Categoria inválida');
        }

        const novoItem = await prisma.menu.create({
            data: {
                nome,
                descricao,
                preco: parseFloat(preco),
                categoria: categoriaUpper,
                disponivel,
                imagem
            }
        });

        return novoItem;
    } catch (error) {
        console.error('Erro no serviço ao criar item:', error);
        throw error;
    }
};

// Buscar item por ID
export const buscarItemPorId = async (id) => {
    try {
        const item = await prisma.menu.findUnique({
            where: { id: parseInt(id) }
        });

        if (!item) {
            throw new Error('Item não encontrado');
        }

        return item;
    } catch (error) {
        console.error('Erro no serviço ao buscar item por ID:', error);
        throw error;
    }
};

// Buscar itens por categoria
export const buscarItensPorCategoria = async (categoria) => {
    try {
        const categoriaUpper = categoria.toUpperCase();
        if (!Object.values(CategoriaMenu).includes(categoriaUpper)) {
            throw new Error('Categoria inválida');
        }

        const itens = await prisma.menu.findMany({
            where: { 
                categoria: categoriaUpper,
                disponivel: true
            },
            orderBy: { nome: 'asc' }
        });

        return itens;
    } catch (error) {
        console.error('Erro no serviço ao buscar por categoria:', error);
        throw error;
    }
};

// Listar todos os itens disponíveis
export const listarTodosItens = async () => {
    try {
        const itens = await prisma.menu.findMany({
            where: { disponivel: true },
            orderBy: [
                { categoria: 'asc' },
                { nome: 'asc' }
            ]
        });

        return itens;
    } catch (error) {
        console.error('Erro no serviço ao listar itens:', error);
        throw error;
    }
};

// Atualizar item do menu
export const atualizarItemMenu = async (id, dadosAtualizados) => {
    try {
        const itemAtualizado = await prisma.menu.update({
            where: { id: parseInt(id) },
            data: dadosAtualizados
        });

        return itemAtualizado;
    } catch (error) {
        console.error('Erro no serviço ao atualizar item:', error);
        throw error;
    }
};

// Desativar item do menu
export const desativarItemMenu = async (id) => {
    try {
        const item = await prisma.menu.update({
            where: { id: parseInt(id) },
            data: { disponivel: false }
        });

        return item;
    } catch (error) {
        console.error('Erro no serviço ao desativar item:', error);
        throw error;
    }
};