import db from "../model/personalModel.js"

export const obtenerPersonal = (req, res) => {
    db.query("select * from personal", (err, results) => {
        if (err) return res.status(500).json({error: "Error al obtener datos"})
        res.json(results);
    });
};

export const agregarPersonal = (req, res) => {
  const { nombre, cargo, salario } = req.body;
  db.query(
    'INSERT INTO personal (nombre, cargo, sueldo) VALUES (?, ?, ?)',
    [nombre, cargo, salario],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al insertar' });
      res.status(201).json({ id: result.insertId, nombre, cargo, salario });
    }
  );
};

export const actualizarPersonal = (req, res) => {
      const { id } = req.params;
  const { nombre, cargo, salario } = req.body;
  db.query(
    'UPDATE personal SET nombre = ?, cargo = ?, sueldo = ? WHERE id = ?',
    [nombre, cargo, salario, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar' });
      res.json({ id, nombre, cargo, salario });
    }
  );
}

export const eliminarPersonal = (req, res) => {
    const { id } = req.params;
    db.query("delete from personal where id = ?", [id], (err) => {
        if (err) return res.stats(500).json({error:"Error al eliminar personal"});
        res.json({mensaje : "Empleado Eliminado exitosamente"})
    }); 
};

export default {
    obtenerPersonal,
    agregarPersonal,
    actualizarPersonal,
    eliminarPersonal
}