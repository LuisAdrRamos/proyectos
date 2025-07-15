// App.jsx
import { useEffect, useState } from 'react';
import {
  getClientes,
  agregarCliente,
  eliminarCliente,
  actualizarCliente
} from './api/personalAPI'; // ⚠️ Si ya lo renombraste, cámbialo a clienteAPI

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    fecha_nacimiento: "",
    genero: ""
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  // Busqueda por nombre o apellido
  const [busqueda, setBusqueda] = useState("");

  const cargarClientes = async () => {
    try {
      const res = await getClientes();
      setClientes(res);
    } catch (error) {
      toast.error("Error al cargar los clientes");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        const res = await actualizarCliente(idEditar, form);
        toast.success(res.mensaje);
      } else {
        const res = await agregarCliente(form);
        toast.success(res.mensaje);
      }
      setForm({
        identificacion: "",
        nombres: "",
        apellidos: "",
        fecha_nacimiento: "",
        genero: ""
      });
      setModoEdicion(false);
      setIdEditar(null);
      cargarClientes();
    } catch {
      toast.error("Error al guardar datos");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este cliente?")) return;
    try {
      const res = await eliminarCliente(id);
      toast.success(res.mensaje);
      cargarClientes();
    } catch (error) {
      toast.error("Error al eliminar cliente");
    }
  };

  const handleUpdate = (cliente) => {
    setForm({
      identificacion: cliente.identificacion,
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      fecha_nacimiento: cliente.fecha_nacimiento?.slice(0, 10),
      genero: cliente.genero
    });

    setModoEdicion(true);
    setIdEditar(cliente.id);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setIdEditar(null);
    setForm({
      identificacion: "",
      nombres: "",
      apellidos: "",
      fecha_nacimiento: "",
      genero: ""
    });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((c) =>
    (c.nombres + " " + c.apellidos).toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Gestión de Clientes</h1>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <div className="grid grid-cols-5 grid-rows-5 auto-rows-min gap-2">
        {/* Columna izquierda: formulario y búsqueda */}
        <div className="col-span-1 flex flex-col gap-2">
          {/* Buscador */}
          <div className="bg-gray-800 p-2 rounded">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre/apellido"
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>

          {/* Formulario */}
          <div className="bg-gray-800 p-4 rounded">
            <form onSubmit={handleSubmit}>
              <h3>Agregar/Actualizar Cliente</h3>

              <input
                type="text"
                id="identificacion"
                value={form.identificacion}
                onChange={handleChange}
                placeholder="Identificación"
                required
                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              />

              <input
                type="text"
                id="nombres"
                value={form.nombres}
                onChange={handleChange}
                placeholder="Nombres"
                required
                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              />

              <input
                type="text"
                id="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                placeholder="Apellidos"
                required
                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              />

              <input
                type="date"
                id="fecha_nacimiento"
                value={form.fecha_nacimiento}
                onChange={handleChange}
                required
                className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
              />

              <select
                id="genero"
                value={form.genero}
                onChange={handleChange}
                required
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              >
                <option value="">Seleccione Género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="binario">Prefiero no decirlo</option>
              </select>

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
        </div>

        {/* Lista de clientes */}
        <div className="col-span-4 col-start-2 overflow-y-auto max-h-[auto] space-y-2">
          {clientesFiltrados.map((c) => (
            <div key={c.id} className="bg-gray-800 p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="text-blue-300 font-bold">{c.nombres} {c.apellidos}</p>
                <p className="text-sm">ID: {c.identificacion}</p>
                <p className="text-sm">Nacimiento: {c.fecha_nacimiento?.slice(0, 10)}</p>
                <p className="text-sm">Género: {c.genero}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleUpdate(c)} className="text-green-600 hover:text-green-400">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-400">
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
