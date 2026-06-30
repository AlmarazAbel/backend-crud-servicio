import { validationResult } from "express-validator";

const resultadoValidacion =(req,res,next)=>{

    const errors = validationResult(req)
   
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    //continuar con la siguiente ejecucion
    next()
}

export default resultadoValidacion