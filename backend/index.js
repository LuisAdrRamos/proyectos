import express, { json } from 'express';
import cors from 'cors';

import personalRoutes from "./src/routes/personalRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use('/api', personalRoutes);

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
