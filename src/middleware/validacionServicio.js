import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validacionServicio = [
  body("nombreServicio")
    .notEmpty()
    .withMessage("El nombre del servicio es un campo obligatorio")
    .isString()
    .withMessage("El nombre del servicio debe ser uns String")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El nombre del servicio debe contener entre 5 y 100 caracteres",
    ),
  body("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric("El precio debe ser en formato numerioco")
    .isFloat({ min: 50 })
    .withMessage("El precio no puede ser menos de $50"),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripcion es un campo obligatorio")
    .isString()
    .withMessage("La descripcion debe ser uns String")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion debe contener entre 10 y 500 caracteres"),
  body("imagen")
    .notEmpty()
    .withMessage("La imagen es un campo obligatorio")
    .isString()
    .withMessage("La imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
    .withMessage(
      "La imagen debe ser una url valida y debe terminar con jpg|jpeg|png|webp|avif|svg ",
    ),

  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un campo obligatorio")
    .isString()
    .withMessage("La categoria debe ser un string")
    .isIn(["Desarrollo Web", "Backend & API", "Consultoría"])
    .withMessage("La categoria debe ser una de las siguientes opciones 'Desarrollo Web', 'Backend & API', 'Consultoría'"),

  resultadoValidacion,
];
