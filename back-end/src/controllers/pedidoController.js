import { 
    criarPedidoComCliente,
    listarPedidos, 
    buscarPedidoPorId, 
    cancelarPedido 
} from "../services/pedidoService.js";

export const criarPedidoComClienteController = async (req, res) => {
    try {
        const { cliente, mesaId, itens } = req.body;

        // Validações básicas
        if (!cliente?.nome) {
            return res.status(400).json({ error: "Nome do cliente é obrigatório" });
        }

        if (!itens || itens.length === 0) {
            return res.status(400).json({ error: "O pedido deve conter itens" });
        }

        const pedido = await criarPedidoComCliente(cliente, mesaId, itens);
        
        res.status(201).json({ 
            success: true,
            message: "Pedido criado com sucesso", 
            data: pedido 
        });
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ 
            success: false,
            error: "Erro ao criar pedido. Tente novamente mais tarde.",
            details: error.message 
        });
    }
};

export const listarPedidosController = async (req, res) => {
    try {
        const pedidos = await listarPedidos();
        res.json({ message: "Pedidos listados com sucesso", pedidos });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pedidos. Tente novamente mais tarde." });
    }
};

export const buscarPedidoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await buscarPedidoPorId(id);
        if (!pedido)
            return res.status(404).json({ error: "Pedido não encontrado. Verifique o código do pedido." });
        res.json({ message: "Pedido encontrado com sucesso", pedido });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pedido. Tente novamente mais tarde." });
    }
};

export const cancelarPedidoController = async (req, res) => {
    try {
        const { id } = req.params;
        await cancelarPedido(id);
        res.status(200).json({ message: "Pedido cancelado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao cancelar pedido. Tente novamente mais tarde." });
    }
};
