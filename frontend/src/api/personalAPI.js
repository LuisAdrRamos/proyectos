const BASE_URL = import.meta.env.VITE_API_URL;
console.log("BASE_URL =>", BASE_URL);

export const getClientes = async () => {
  const res = await fetch(`${BASE_URL}/clientes`);
  const text = await res.text();
  console.log("Respuesta cruda:", text);
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Error al parsear JSON:", e);
    throw e;
  }
};


export const agregarCliente = async (datos) => {
  const res = await fetch(`${BASE_URL}/agregar-cliente`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return await res.json();
};

export const eliminarCliente = async (id) => {

  const res = await fetch(`${BASE_URL}/eliminar-cliente/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};

export const actualizarCliente = async (id, datos) => {
  const res = await fetch(`${BASE_URL}/actualizar-cliente/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return await res.json();
};