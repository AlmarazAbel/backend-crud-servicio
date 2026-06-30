import { body, param } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const reglasServicio = [
  body("nombreServicio")
   
    
    .isString()
    .withMessage("El nombre del servicio debe ser uns String")
    .isLength({ min: 5, max: 100 })
    .withMessage(
      "El nombre del servicio debe contener entre 5 y 100 caracteres",
    ),
  body("precio")
    
    
    .isNumeric("El precio debe ser en formato numerioco")
    .isFloat({ min: 50 })
    .withMessage("El precio no puede ser menos de $50"),
  body("descripcion")
    
    
    .isString()
    .withMessage("La descripcion debe ser uns String")
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripcion debe contener entre 10 y 500 caracteres"),
  body("imagen")
    
    
    .isString()
    .withMessage("La imagen debe ser un string")
    .matches(/^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/)
    .withMessage(
      "La imagen debe ser una url valida y debe terminar con jpg|jpeg|png|webp|avif|svg ",
    ),

  body("categoria")
    
    
    .isString()
    .withMessage("La categoria debe ser un string")
    .isIn(["Desarrollo Web", "Backend & API", "Consultoría"])
    .withMessage("La categoria debe ser una de las siguientes opciones 'Desarrollo Web', 'Backend & API', 'Consultoría'"),


]
//para el post y el put
export const validacionServicio =[
    ...reglasServicio.map((regla)=>regla.notEmpty().withMessage('el campo es un dato obligatorio')),resultadoValidacion
]
//para el patch
export const validacionPathServicio = [
    ...reglasServicio.map((regla) =>regla.optional({values:"falsy"})),resultadoValidacion
]

export const validacionIDServicio =[
param('id').isMongoId().withMessage('El id enviado no tiene el formato de ID Mongo DB'),resultadoValidacion
]