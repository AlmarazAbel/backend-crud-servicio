import express from "express";

import cors from "cors";

import morgan from "morgan";

import { dirname } from "path";

import { fileURLToPath } from "url";

import '../database/db.js'

export default class Server {

  constructor() {

    //inicializar las propiedades del futuro objeto

    this.app = express();

    this.PORT = process.env.PORT || 3000;

<<<<<<< HEAD
    this.middlewares();
=======
    this.middlewares()

>>>>>>> feature/02-crud-servicios
  }

  // definir metodos

  middlewares() {
<<<<<<< HEAD
=======

>>>>>>> feature/02-crud-servicios
    this.app.use(cors()); //permite conexiones remotas

    this.app.use(express.json()); // permite interpretar los datos que lleguen en la solicitud o request en formato json

    this.app.use(morgan("dev"));

    const __dirname = dirname(fileURLToPath(import.meta.url));

    // configurar un archivo estatico como pagina principal

    this.app.use(express.static(__dirname + "/../../public"));
<<<<<<< HEAD
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.info(`Servidor activo en http://localhost:${this.PORT}`);
    });
  }
}
=======

  }

  listen() {

    this.app.listen(this.PORT, () => {

      console.info(`Servidor activo en http://localhost:${this.PORT}`);

    });

  }

}
>>>>>>> feature/02-crud-servicios
