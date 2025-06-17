// App.jsx
import { useEffect, useState } from 'react';
import {
  getEmpleados,
  agregarEmpleado,
  eliminarEmpleado,
  actualizarEmpleado
} from './api/personalAPI';

import BuscadorNombre from './components/BuscarNombre';
import Filtros from './components/Filtros';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark, faPenToSquare, faL } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({ nombre: "", cargo: "", sueldo: "" });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  // Busqueda de empleados
  const [busqueda, setBusqueda] = useState("");

  // Filtros
  const [cargosSeleccionados, setCargosSeleccionados] = useState([]);
  const [rangoSalario, setRangoSalario] = useState([0, 3000]);
  const maxSalario = Math.max(...empleados.map(e => e.sueldo || 0));

  const cargarEmpleados = async () => {
    try {
      const res = await getEmpleados();
      setEmpleados(res);
    } catch (error) {
      toast.error("Error al cargar los Empleados");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        const res = await actualizarEmpleado(idEditar, form);
        toast.success(res.mensaje);
      } else {
        const res = await agregarEmpleado(form);
        toast.success(res.mensaje);
      }
      setForm({ nombre: "", cargo: "", sueldo: "" });
      setModoEdicion(false);
      setIdEditar(null);
      cargarEmpleados();
    } catch {
      toast.error("Error al guardar datos");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estas seguro de eliminar este empleado?")) return;
    try {
      const res = await eliminarEmpleado(id);
      toast.success(res.mensaje);
      cargarEmpleados();
    } catch (error) {
      toast.error("Error al eliminar empleado")
    }
  };

  const handleUpdate = (empleado) => {
    setForm({
      nombre: empleado.nombre,
      cargo: empleado.cargo,
      sueldo: empleado.sueldo
    });

    setModoEdicion(true);
    setIdEditar(empleado.id);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setIdEditar(null);
    setForm({ nombre: "", cargo: "", sueld: "" });
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const empleadosFiltrados = empleados.filter(e =>
    e.nombre.toLowerCase().includes(busqueda) &&
    e.sueldo >= rangoSalario[0] &&
    e.sueldo <= rangoSalario[1] &&
    (cargosSeleccionados.length === 0 || cargosSeleccionados.includes(e.cargo))
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Gestión de Personal</h1>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="grid grid-cols-5 grid-rows-5 auto-rows-min gap-2">

        {/* Columna izquierda: div1 + div3 + div4 agrupados */}
        <div className="col-span-1 flex flex-col gap-2">
          {/* div4 - Formulario */}
          <div className="bg-gray-800 p-4 rounded">
            <form onSubmit={handleSubmit}>
              <h3>Agregar/Actualizar Personal</h3>
              <input
                type="text"
                id="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              />
              <input
                type="text"
                id="cargo"
                value={form.cargo}
                onChange={handleChange}
                placeholder="Cargo"
                required
                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              />
              <input
                type="number"
                id="salario"
                value={form.salario}
                onChange={handleChange}
                placeholder="Salario"
                required
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              >
                {modoEdicion ? "Actualizar" : "Agregar"}
              </button>

              {modoEdicion && (
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="mt-2 bg-red-700 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
                >
                  Cancelar edición
                </button>
              )}
            </form>
          </div>

          {/* div1 - Buscador */}
          <div className="bg-gray-800 p-2 rounded">
            <BuscadorNombre busqueda={busqueda} setBusqueda={setBusqueda} />
          </div>

          {/* div3 - Filtros */}
          <div className="bg-gray-800 p-4 rounded">
            <Filtros
              empleados={empleados}
              cargosSeleccionados={cargosSeleccionados}
              setCargosSeleccionados={setCargosSeleccionados}
              rango={rangoSalario}
              setRango={setRangoSalario}
              maximo={maxSalario}
            />
          </div>
        </div>

        {/* div2 - Lista de empleados */}
        <div className="col-span-5 row-span- col-start-2 overflow-y-auto max-h-[auto] space-y-2">
          {empleadosFiltrados.map((e) => (
            <div key={e.id} className="bg-gray-800 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-blue-300 font-bold">{e.nombre}</p>
                <p className="text-sm">{e.cargo} - ${e.sueldo}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleUpdate(e)} className="text-green-600 hover:text-green-400">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:text-red-400">
                  <FontAwesomeIcon icon={faUserXmark} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}