import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, prismaMiddleware } from './config/database.js';

import pedidoRouter from './routes/pedidoRouter.js';
import clienteRouter from './routes/clienteRouter.js';
import menuRouter from './routes/menuRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Middlewares globais
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(prismaMiddleware);

// Rotas
app.use('/api', pedidoRouter);
app.use('/api', clienteRouter);
app.use('/api', menuRouter);

// Rota de verificação de saúde
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        database: 'Conectado',
        timestamp: new Date().toISOString()
    });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar o servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Manipulador de encerramento
process.on('SIGTERM', () => {
    server.close(async () => {
        await disconnectDB();
        console.log('Servidor encerrado');
        process.exit(0);
    });
});

export default app;