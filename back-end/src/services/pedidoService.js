import prisma from "../config/database.js";

export const criarPedidoComCliente = async (clienteData, mesaId, itens) => {
    // Calcula o total baseado nos itens
    const total = itens.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0);

    return await prisma.$transaction(async (prisma) => {
        // 1. Criar o cliente
        const cliente = await prisma.cliente.create({
            data: {
                nome: clienteData.nome,
                mesaNumero: mesaId ? parseInt(mesaId) : null
            }
        });

        // 2. Criar o pedido associado
        const pedido = await prisma.pedido.create({
            data: {
                clienteId: cliente.id,
                mesaNumero: mesaId ? parseInt(mesaId) : null,
                total,
                itens: {
                    create: itens.map(item => ({
                        menuId: item.menuId,
                        quantidade: item.quantidade,
                        precoUnitario: item.precoUnitario,
                        observacoes: item.observacoes || null
                    }))
                }
            },
            include: {
                itens: true,
                cliente: true,
                mesa: true
            }
        });

        return pedido;
    });
};

export const listarPedidos = async () => {
    return await prisma.pedido.findMany({
        include: {
            itens: true,
            cliente: true,
            mesa: true
        }
    });
};

export const buscarPedidoPorId = async (id) => {
    return await prisma.pedido.findUnique({
        where: { id: parseInt(id) },
        include: { itens: true, cliente: true, mesa: true }
    });
};

export const cancelarPedido = async (id) => {
    return await prisma.pedido.delete({ where: { id: parseInt(id) } });
};
