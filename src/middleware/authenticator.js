import jwt from "jsonwebtoken"
export const authenticate = (req,res,next)=>{
//leer o verificar el token de la cookie

try {
    const token = req.cookies.token
if(!token) {
return res.status(401).json({mensaje:'Acceso no autorizado :no hay un token en la solicitud'})
}
//verificar el token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
//guardar la respuesta en la peticion 
req.user= decoded

next()

} catch (error) {
    console.error(error)
    res.status(403).json({mensaje:'acceso denegado token invalido o expirado'})
}




}