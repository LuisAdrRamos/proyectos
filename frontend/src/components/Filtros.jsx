import { useEffect, useState } from "react";

export default function Filtros({
    empleados,
    cargosSeleccionados,
    setCargosSeleccionados,
    rango,
    setRango,
    maximo
}) {
    const [cargosUnicos, setCargosUnicos] = useState([]);

    useEffect(() => {
        const unicos = [...new Set(empleados.map((e) => e.cargo))];
        setCargosUnicos(unicos);
    }, [empleados]);

    const toggleCargo = (cargo) => {
        if (cargosSeleccionados.includes(cargo)) {
            setCargosSeleccionados(cargosSeleccionados.filter((c) => c !== cargo));
        } else {
            setCargosSeleccionados([...cargosSeleccionados, cargo]);
        }
    };

    return (
        <div className="col-span-2 bg-gray-800 p-4 rounded">

            <h2 className="text-white font-semibold mb-2">Filtrar por cargo</h2>
            {cargosUnicos.map((cargo) => (
                <label key={cargo} className="flex items-center text-sm text-white mb-1">
                    <input
                        type="checkbox"
                        checked={cargosSeleccionados.includes(cargo)}
                        onChange={() => toggleCargo(cargo)}
                        className="mr-2"
                    />
                    {cargo}
                </label>
            ))}

            {/* Filtro por salario máximo */}
            <h2 className="text-white font-semibold mt-4 mb-2">Filtrar por salario máximo</h2>
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="range"
                    min="0"
                    max={maximo}
                    value={rango[1]}
                    onChange={(e) => setRango([rango[0], +e.target.value])}
                />
                <span>${rango[1]}</span>
            </div>

            {/* Filtro por salario mínimo */}
            <h2 className="text-white font-semibold mb-2">Filtrar por salario mínimo</h2>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    min="0"
                    max={maximo}
                    value={rango[0]}
                    onChange={(e) => setRango([+e.target.value, rango[1]])}
                />
                <span>${rango[0]}</span>
            </div>
        </div>
    );
}
