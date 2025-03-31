import { criarCliente, buscarClientePorMesa } from "../services/clienteService.js";
import prisma from "../config/database.js";

export const criarClienteController = async (req, res) => {
    try {
        const { nome, mesaNumero } = req.body;

        if (mesaNumero) {
            const mesaExiste = await prisma.mesa.findUnique({
                where: { numero: parseInt(mesaNumero) },
            });
            if (!mesaExiste) {
                return res.status(400).json({ error: "Mesa não encontrada" });
            }
        }

        const cliente = await criarCliente(nome, mesaNumero);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar cliente" });
    }
};

export const buscarClientePorMesaController = async (req, res) => {
    try {
        const { mesaNumero } = req.params;

        if (!mesaNumero) {
            return res.status(400).json({ error: "Número da mesa é obrigatório" });
        }

        const cliente = await buscarClientePorMesa(mesaNumero);

        if (!cliente) {
            return res
                .status(404)
                .json({ error: "Nenhum cliente encontrado nesta mesa" });
        }

        res.json(cliente);
    } catch (error) {
        console.error("Erro ao buscar cliente por mesa:", error);
        res.status(500).json({ error: "Erro ao buscar cliente" });
    }
};
