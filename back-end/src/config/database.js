import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

// Função para conectar ao banco de dados
export async function connectDB() {
    try {
        await prisma.$connect();
        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1);
    }
}

// Função para desconectar do banco de dados
export async function disconnectDB() {
    await prisma.$disconnect();
}

// Middleware para injetar o Prisma Client nas requisições
export const prismaMiddleware = (req, res, next) => {
    req.prisma = prisma;
    next();
};

// Exportando Prisma Client para uso em outros arquivos
export default prisma;