// components/BuscadorNombre.jsx
import React from 'react';

export default function BuscadorNombre({ busqueda, setBusqueda }) {
    return (
        <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
            className="w-full max-w-md p-2 bg-gray-700 text-white rounded"
        />
    );
}