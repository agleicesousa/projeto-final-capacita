import express from "express";
import { 
    criarPedidoComClienteController,
    listarPedidosController, 
    buscarPedidoPorIdController, 
    cancelarPedidoController 
} from "../controllers/pedidoController.js";

const router = express.Router();

router.post("/pedidos/com-cliente", criarPedidoComClienteController);
router.get("/pedidos", listarPedidosController);
router.get("/pedidos/:id", buscarPedidoPorIdController);
router.delete("/pedidos/:id", cancelarPedidoController);

export default router;