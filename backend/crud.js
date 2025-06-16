app.use(express.json()); // Para recibir JSON en POST y PUT

// GET todos los empleados
app.get('/api/personal', (req, res) => {
  connection.query('SELECT * FROM personal', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en la consulta' });
    res.json(results);
  });
});

// POST nuevo empleado
app.post('/api/personal', (req, res) => {
  const { nombre, cargo, salario } = req.body;
  connection.query(
    'INSERT INTO personal (nombre, cargo, sueldo) VALUES (?, ?, ?)',
    [nombre, cargo, salario],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al insertar' });
      res.status(201).json({ id: result.insertId, nombre, cargo, salario });
    }
  );
});

// PUT (actualizar empleado)
app.put('/api/personal/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, cargo, salario } = req.body;
  connection.query(
    'UPDATE personal SET nombre = ?, cargo = ?, sueldo = ? WHERE id = ?',
    [nombre, cargo, salario, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar' });
      res.json({ id, nombre, cargo, salario });
    }
  );
});

// DELETE empleado
app.delete('/api/personal/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM personal WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar' });
    res.json({ mensaje: 'Empleado eliminado' });
  });
});
