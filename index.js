import router from "./src/routes/index.routes.js";
import Server from "./src/server/config.js";

//instanciar la clase server
const server = new Server()
//agregar las rutas
//http://localhost:3000/api/servcicios/test
server.app.use('/api', router)
//escuchar el puerto correspondiente
server.listen();