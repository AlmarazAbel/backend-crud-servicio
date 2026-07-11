import nodemailer from "nodemailer";

const nodemailer = require("nodemailer");

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
transporter
  .verify()
  .then(() => {
    console.info('Servidor de correo listo para usar(Mailtrap Conectado)🤖')
  })
  .catch((error) => {
    console.error("Error al conectar con el servidor del correo:", error);
  });
