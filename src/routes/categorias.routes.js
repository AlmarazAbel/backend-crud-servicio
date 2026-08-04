import  {Router} from "express"
import { crearCategoria, listarCategorias } from "../controllers/categorias.controllers.js"

const router = Router()

//todo: agregar las rutas para editar ,borrar y obtener una categoria
router.route("/").post(crearCategoria).get(listarCategorias)

export default router