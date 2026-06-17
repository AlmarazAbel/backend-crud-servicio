export const prueba = (req, res)=>{
    const vehiculos = ['🏎️', '🚗', '🚕']

    res.json({
        mensaje: 'Bienvenidos a nuestro backend',
        vehiculos
    })
}