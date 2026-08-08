import mongoose from "mongoose";
const { Schema } = mongoose;

const carritoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
      required: "true",
      unique: "true",
    },
    items: [
      {
        servicio: {
          type: Schema.Types.ObjectId,
          ref: "servicio",
          required: "true",
        },
        cantidad: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Carrito = mongoose.model("carrito" ,carritoSchema)

export default Carrito;
