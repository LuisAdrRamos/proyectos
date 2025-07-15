import { body } from "express-validator";

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

export const validarCliente = [
    body("identificacion")
        .isLength({ min: 10, max: 10 })
        .withMessage("La cédula debe tener 10 dígitos"),

    body("nombres")
        .notEmpty().withMessage("El nombre es obligatorio")
        .matches(regexNombre).withMessage("El nombre solo puede contener letras y espacios"),

    body("apellidos")
        .notEmpty().withMessage("El apellido es obligatorio")
        .matches(regexNombre).withMessage("El apellido solo puede contener letras y espacios"),

    body("fecha_nacimiento")
        .isISO8601().withMessage("Fecha inválida"),

    body("genero")
        .isIn(["Masculino", "Femenino"]).withMessage("Género inválido"),
];
