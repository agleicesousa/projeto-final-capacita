import prisma from "../config/database.js";

export const criarCliente = async (nome, mesaNumero) => {
    return await prisma.cliente.create({
        data: {
            nome,
            mesaNumero: mesaNumero ? parseInt(mesaNumero) : null,
        },
        include: {
            mesa: true,
        },
    });
};

export const buscarClientePorMesa = async (mesaNumero) => {
    return await prisma.cliente.findFirst({
        where: {
            mesaNumero: parseInt(mesaNumero),
        },
        include: {
            pedidos: true,
            mesa: true,
        },
    });
};
