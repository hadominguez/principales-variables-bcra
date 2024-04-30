import React, { useState, useEffect } from 'react';
import "@/app/globals.css";


const Home = () => {
    const [variables, setVariables] = useState<any[]>([]);
    const [variableData, setVariableData] = useState<any[]>([]);
    const [selectedVariables, setSelectedVariables] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const fetchVariables = async () => {
        try {
            const response = await fetch('/api/estadisticas/principalesvariables');
            const data = await response.json();
            setVariables(data.results);
            setError(null);
        } catch (error) {
            setError('Error fetching variables');
        }
    };

    const fetchVariableData = async () => {
        try {
            const response = await fetch(`/api/estadisticas/datosvariable/${selectedVariables.join(',')}/${startDate}/${endDate}`);
            const data = await response.json();
            setVariableData(data.results);
            setError(null);
        } catch (error) {
            setError('Error fetching variable data');
        }
    };

    useEffect(() => {
        fetchVariables();
    }, []);

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Principales Variables del BCRA</h1>
                <p className="text-lg font-semibold">
                    Bienvenido/a a la página de información financiera, donde facilitamos el acceso a datos importantes proporcionados por el Banco Central de la República Argentina (BCRA) a través de su API de Principales Variables. Esta API ofrece una forma sencilla y eficiente de acceder a información financiera clave, permitiendo a analistas, empresarios y financistas tomar decisiones.
                </p>
                <p className="mt-4">
                    Para acceder a la información original proporcionada desde el BCRA, puede acceder desde <a href="https://www.bcra.gob.ar/BCRAyVos/catalogo-de-APIs-banco-central.asp" className="text-blue-500 underline">aquí</a>.
                </p>
            </div>
            <div className="container mx-auto px-4 py-8" style={{ display: "flex" }}>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">Variables</h1>
                    {variables.length > 0 && (
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Descripción</th>
                                    <th className="border px-4 py-2">Valor</th>
                                    <th className="border px-4 py-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variables.map((data) => (
                                    <tr key={data.idVariable} className="border-t">
                                        <td className="border px-4 py-2">{data.descripcion}</td>
                                        <td className="border px-4 py-2">{data.valor}</td>
                                        <td className="border px-4 py-2">{data.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-4">Selecciona la variable a buscar</h1>
                    {variables.length > 0 && (
                        <select
                            className="block w-full p-2 border mb-4"
                            value={selectedVariables}
                            onChange={(e) => setSelectedVariables(Array.from(e.target.selectedOptions, (option) => option.value))}
                        >
                            <option key={null}>-</option>
                            {variables.map((variable) => (
                                <option key={variable.idVariable} value={variable.idVariable}>
                                    {variable.descripcion}
                                </option>
                            ))}
                        </select>
                    )}
                    <h1 className="text-2xl font-bold mb-4">Selecciona fechas</h1>
                    <div className="mb-4">
                        <label className="block mb-2">Fecha de inicio:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="p-2 border w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Fecha de fin:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="p-2 border w-full"
                        />
                    </div>
                    <button
                        onClick={fetchVariableData}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Consultar
                    </button>
                    {variableData.length > 0 && (
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Valor</th>
                                    <th className="border px-4 py-2">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variableData.map((data) => (
                                    <tr key={data.fecha} className="border-t">
                                        <td className="border px-4 py-2">{data.fecha}</td>
                                        <td className="border px-4 py-2">{data.valor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {error && <p className="text-red-500">Error: {error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Home;

