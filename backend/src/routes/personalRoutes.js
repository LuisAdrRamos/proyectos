import { Router } from "express";

import {
    obtenerPersonal,
    agregarPersonal,
    actualizarPersonal,
    eliminarPersonal
} from "../controller/personalController.js"

const router = Router();

router.get('/personal', obtenerPersonal);
router.post('/agregar-personal', agregarPersonal);
router.put('/actualizar-personal/:id', actualizarPersonal);
router.delete('/eliminar-personal/:id', eliminarPersonal);

export default router;