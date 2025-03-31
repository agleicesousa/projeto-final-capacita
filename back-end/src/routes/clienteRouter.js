import express from "express";
import { 
    criarClienteController, 
    buscarClientePorMesaController 
} from "../controllers/clienteController.js";

const router = express.Router();

router.post("/clientes", criarClienteController);
router.get("/clientes/mesa/:mesaNumero", buscarClientePorMesaController);

export default router;