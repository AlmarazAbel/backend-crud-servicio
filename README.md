# Conceptos de NodeJS
Estre es un proyecto es una praactica de los primeros conceptos de node js ,donde implrementaremos middlewares,endpoints y fue construido con pnpm como gestor de paquetes
## Demo del backend
Podes ver una demo del proyecto en produccion [aqui]() 
## Librerias utilizadas
-Nodejs v24.4 o cualquier version posterior a 22
-ExpressJS
-Cors
-Morgan
## Instalacion y configuracion del proyecto
1- clonar el repositorio
`https://github.com/AlmarazAbel/backend-crud-servicio.git`
2- instalar dependencias
`pnpm install`
3- iniciar aplicaciones
```bash
# comando de produccion
pnpm start
# comando de desarrollo
pnpm run dev
```
## Endpoints
```bash
# Metodo: get
/api/salud



```
- Metodo: POST
- Endpoint: https://backend-crud-servicio.onrender.com/api/servicio
- Descripcion: Este endpoint crea un servicio

- Body:
```
{
"nombreServicio": "crear api",
        "precio": 177,
               "imagen": "https://misitio.com/imagenes/tienda-online.jpg",
        "categoria": "Backend & API", 
        "descripcion": "Backend 1234 asdasdasss"
        
}
```
codigos de respuestas:
- 201: Created
- 400: Bad request
- 500: Error interno del servidos

# autor
Almaraz abel