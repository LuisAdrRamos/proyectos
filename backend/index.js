import express, { json } from 'express';
import path from 'path';
import cors from 'cors';

import personalRoutes from "./routes/personalRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use('/api', personalRoutes);

app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
