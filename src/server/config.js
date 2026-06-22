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

    this.middlewares()

  }

  // definir metodos

  middlewares() {
    this.app.use(cors()); //permite conexiones remotas

    this.app.use(express.json()); // permite interpretar los datos que lleguen en la solicitud o request en formato json

    this.app.use(morgan("dev"));

    const __dirname = dirname(fileURLToPath(import.meta.url));

    // configurar un archivo estatico como pagina principal

    this.app.use(express.static(__dirname + "/../../public"));

  }

  listen() {

    this.app.listen(this.PORT, () => {

      console.info(`Servidor activo en http://localhost:${this.PORT}`);

    });

  }

}
