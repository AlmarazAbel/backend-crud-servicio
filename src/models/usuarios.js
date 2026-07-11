import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;


const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (valor) => {
          return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            valor,
          );
        },
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (valor) => {
          return /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,50}$/.test(
            valor,
          );
        },
      },
    },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "cliente"],
      default: "cliente",
    },
    //campos nuevos para verificar un registro
    isVerified:{
type:Boolean,
default:false
    },
    verificationCode:{
type:String
    },
    verificationExpires:{
      type: Date
    }
  },
  {
    timestamps: true,
  },
);
usuarioSchema.pre('save',async function () {
    const usuario=this;
    //si es el password no fue modificado
    if(!usuario.isModified('password')) return;
        //hasheamos el password
        try {
            const salt = await bcrypt.genSalt(10)
            usuario.password=await bcrypt.hash(usuario.password,salt)
            
        } catch (error) {
            console.error(error)
            throw error
        }
})

const Usuario = mongoose.model('usuario', usuarioSchema)
export default Usuario