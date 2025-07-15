import { Router } from "express";
import { validarCliente } from "../validators/personalValidator.js";
import { validarErrores } from "../middlewares/validarErrores.js";

import {
    obtenerClientes,
    agregarCliente,
    actualizarCliente,
    eliminarCliente
} from "../controller/personalController.js"

const router = Router();

router.get('/clientes', obtenerClientes);
router.post('/agregar-cliente', validarCliente, validarErrores, agregarCliente);
router.put('/actualizar-cliente/:id', validarCliente, validarErrores, actualizarCliente);
router.delete('/eliminar-cliente/:id', eliminarCliente);

export default router;