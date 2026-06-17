import router from "./src/routes/index.routes.js"
import Server from "./src/server/config.js"

const server =new  Server()

//localhost:3000/api/servicios/test
server.app.use('/api', router);
server.listen()