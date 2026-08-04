import mongoose, { Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
      minLength: 2,
      maxLength: 100,
      requied: true,
      trim: true,
    },
    descripcion: {
      type: String,
      minLength: 10,
      maxLength: 250,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Categoria = mongoose.model("categoria", categoriaSchema);

export default Categoria;
