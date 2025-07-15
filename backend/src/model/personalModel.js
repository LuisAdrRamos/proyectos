import { createConnection } from "mysql2";
import dotenv from 'dotenv';
dotenv.config(); // carga las variables del archivo .env

const db = createConnection({
  host: process.env.DB_HOST || "mysql",
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4"
});

db.connect((err) => {
  if (err) throw err;
  db.query("SET NAMES utf8mb4", (err) => {
    if (err) throw err;
    console.log("Base de datos conectada con codificación utf8mb4");
  });
});


export default db;