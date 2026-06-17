import {Router} from "express"
import serviciosRouter from "./servicios.routes.js"

const router= Router()


router.use('/servicios',serviciosRouter)

export default router