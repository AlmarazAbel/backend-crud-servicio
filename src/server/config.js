import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default class Server {
  constructor() {
    //inicializar las propiedades del futuro objeto
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.middlewares();
  }
  //definir metodos
middlewares(){
this.app.use(cors());
this.app.use(express.json());
this.app.use(morgan ('dev'));
const __dirname= dirname(fileURLToPath(import.meta.url));

//configurar un archivo statico
this.app.use(express.static(__dirname + "/../../public"))
}


  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Servidor  corriendo en http://localhost:${this.PORT}`);
    });
  }
}
