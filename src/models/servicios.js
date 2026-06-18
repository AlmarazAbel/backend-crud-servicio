import mongoose from "mongoose";
const { Schema } = mongoose;

const servicioSchema = new Schema(
  {
    nombreServicio: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 50,
    },
    descripcion: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
      validate: {
        validator: (valor) => {
          return /^https:\/\/.+\.(jpg|jpeg|png|webp|avif|svg)$/.test(valor);
        },
      },
    },
    categoria: {
      type: String,
      required: true,
      enum: ["Desarrollo Web", "Backend & API", "Consultoría"],
    },
  },
  {
    timestamps: true,
  },
);

const Servicio = mongoose.model('services')
export default Servicio