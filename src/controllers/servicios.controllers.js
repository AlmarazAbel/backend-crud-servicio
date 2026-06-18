export const prueba = (req, res)=>{
    const vehiculos = ['🏎️', '🚗', '🚕']

    res.json({
        mensaje: 'Bienvenidos a nuestro backend',
        vehiculos
    })
}

export const crearServicio = async(req,res)=>{
    try {
        console.log(req.body)
    } catch (error) {
        console.error(error)
        res.status(500).json{mensaje:'ocurrio un error al intentar crear el servicio'}
    }
}