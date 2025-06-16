const BASE_URL = import.meta.env.VITE_API_URL; // Sin /personal

export const getEmpleados = async () => {
  const res = await fetch(`${BASE_URL}/personal`);
  return await res.json();
};

export const agregarEmpleado = async (datos) => {
  const res = await fetch(`${BASE_URL}/agregar-personal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return await res.json();
};

export const eliminarEmpleado = async (id) => {
  const res = await fetch(`${BASE_URL}/eliminar-personal/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
};

export const actualizarEmpleado = async (id, datos) => {
  const res = await fetch(`${BASE_URL}/actualizar-personal/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  return await res.json();
};