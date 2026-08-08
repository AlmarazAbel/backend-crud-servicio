export const agregarAlCarrito = async (req,res)=>{
    try {
        res.send('Aqui debo ingresar un elemento al carrito')
    } catch (error) {
       console.error(error)
       res.status(500).json({mensaje:'Ocurrio un error al agregar un servicio al carrito'}) 
    }
}