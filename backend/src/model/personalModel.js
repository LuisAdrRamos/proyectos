import { createConnection } from "mysql2";

const db = createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'base_empleados'
});

export default db;