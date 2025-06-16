import { useEffect, useState } from 'react';
import {
  getEmpleados,
  agregarEmpleado,
  eliminarEmpleado
} from './api/personalAPI';

export default function App() {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({ nombre: '', cargo: '', salario: '' });
  const [mensaje, setMensaje] = useState('');

  const cargarEmpleados = async () => {
    const data = await getEmpleados();
    setEmpleados(data);
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const res = await agregarEmpleado(form);
    setMensaje('Empleado agregado con éxito');
    setForm({ nombre: '', cargo: '', salario: '' });
    cargarEmpleados();
  };

  const manejarEliminar = async (id) => {
    await eliminarEmpleado(id);
    setMensaje('Empleado eliminado');
    cargarEmpleados();
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Gestión de Personal</h1>

      {mensaje && (
        <div className="mb-4 text-green-400 font-semibold">{mensaje}</div>
      )}

      <form onSubmit={manejarSubmit} className="bg-gray-800 p-4 rounded w-full max-w-md mb-6">
        <input type="text" id="nombre" value={form.nombre} onChange={manejarCambio}
          placeholder="Nombre" required className="w-full p-2 mb-2 bg-gray-700 rounded" />
        <input type="text" id="cargo" value={form.cargo} onChange={manejarCambio}
          placeholder="Cargo" required className="w-full p-2 mb-2 bg-gray-700 rounded" />
        <input type="number" id="salario" value={form.salario} onChange={manejarCambio}
          placeholder="Salario" required className="w-full p-2 mb-4 bg-gray-700 rounded" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
          Agregar
        </button>
      </form>

      <div className="w-full max-w-md space-y-2">
        {empleados.map((e) => (
          <div key={e.id} className="bg-gray-800 p-4 rounded shadow flex justify-between">
            <div>
              <p className="text-blue-300 font-bold">{e.nombre}</p>
              <p className="text-sm">{e.cargo} - ${e.sueldo}</p>
            </div>
            <button onClick={() => manejarEliminar(e.id)} className="text-red-400 hover:text-red-600">
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
