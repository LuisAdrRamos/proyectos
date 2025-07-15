import { Router } from "express";

import {
    obtenerClientes,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
} from "../controller/personalController.js"

const router = Router();

router.get('/clientes', obtenerClientes);
router.post('/agregar-cliente', agregarCliente);
router.put('/actualizar-cliente/:id', actualizarCliente);
router.delete('/eliminar-cliente/:id', eliminarCliente);

export default router;