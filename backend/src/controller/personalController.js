import db from "../model/personalModel.js"

export const obtenerClientes = (req, res) => {
  db.query("SELECT * FROM cliente", (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener datos" });
    res.json(results)
  });
};

export const agregarCliente = (req, res) => {
  const { identificacion, nombres, apellidos, fecha_nacimiento, genero } = req.body;
  db.query(
    "INSERT INTO cliente (identificacion, nombres, apellidos, fecha_nacimiento, genero) VALUES (?, ?, ?, ?, ?)",
    [identificacion, nombres, apellidos, fecha_nacimiento, genero],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Error al insertar cliente" });
      res.status(201).json({
        mensaje: "Cliente agregado con éxito",
        id: result.insertId
      });
    }
  );
};

export const actualizarCliente = (req, res) => {
  const { id } = req.params;
  const { identificacion, nombres, apellidos, fecha_nacimiento, genero } = req.body;
  db.query(
    "UPDATE cliente SET identificacion = ?, nombres = ?, apellidos = ?, fecha_nacimiento = ?, genero = ? WHERE id = ?",
    [identificacion, nombres, apellidos, fecha_nacimiento, genero, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al actualizar cliente" });
      res.json({ mensaje: "Cliente actualizado con éxito" });
    }
  );
};

export const eliminarCliente = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cliente WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar cliente" });
    res.json({ mensaje: "Cliente eliminado exitosamente" });
  });
};


export default {
  obtenerClientes,
  agregarCliente,
  actualizarCliente,
  eliminarCliente
}