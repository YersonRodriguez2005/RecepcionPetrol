import React, { useState, useMemo } from 'react';

const DotacionComponent = () => {
    // Datos de dotación con productos y precios
    const data = [
        { unidad: 1, descripcion: "VALORACION MEDICA CARDIO Y OSTEO", precio: 28000 },
        { unidad: 1, descripcion: "GLICEMIA", precio: 6000 },
        { unidad: 1, descripcion: "PERFIL LIPIDICO", precio: 22000 },
        { unidad: 1, descripcion: "EXAMEN OPTOMETRIA", precio: 20000 },
        { unidad: 1, descripcion: "AUDIOMETRIA", precio: 15000 },
        { unidad: 1, descripcion: "PRUEBA PSICOSENSOMETRICA", precio: 33000 },
        { unidad: 1, descripcion: "PRUEBA PSICOTECNICA", precio: 22000 },
        { unidad: 1, descripcion: "ELECTROCARDIOGRAMA", precio: 31000 },
        { unidad: 1, descripcion: "E.M.O. EN ALTURA", precio: 11000 },
        { unidad: 1, descripcion: "TAMIZAJE PANEL 2", precio: 20000 },
        { unidad: 1, descripcion: "ALCOHOL", precio: 16000 },
        { unidad: 1, descripcion: "ESPIROMETRIA", precio: 22000 }
    ];

    const [search, setSearch] = useState({
        descripcion: '',
        precioMin: '',
        precioMax: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setSearch({
            descripcion: '',
            precioMin: '',
            precioMax: ''
        });
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesPrecioMin = !search.precioMin || item.precio >= parseFloat(search.precioMin);
            const matchesDescripcion = item.descripcion.toLowerCase().includes(search.descripcion.toLowerCase());
            const matchesPrecioMax = !search.precioMax || item.precio <= parseFloat(search.precioMax);

            return matchesDescripcion && matchesPrecioMin && matchesPrecioMax;
        });
    }, [search]);

    // Calcular estadísticas
    const stats = useMemo(() => {
        const total = data.length;
        const valorTotal = data.reduce((sum, item) => sum + item.precio, 0);
        const precioPromedio = valorTotal / total;
        const precioMaximo = Math.max(...data.map(item => item.precio));
        const precioMinimo = Math.min(...data.map(item => item.precio));

        return { total, valorTotal, precioPromedio, precioMaximo, precioMinimo };
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const getPriceCategory = (precio) => {
        if (precio <= 10000) return 'bg-green-100 text-green-800';
        if (precio <= 30000) return 'bg-yellow-100 text-yellow-800';
        if (precio <= 50000) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    const getPriceCategoryLabel = (precio) => {
        if (precio <= 10000) return 'Económico';
        if (precio <= 30000) return 'Moderado';
        if (precio <= 50000) return 'Alto';
        return 'Premium';
    };

    const hasActiveFilters = search.descripcion || search.precioMin || search.precioMax;

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Sistema de Dotación</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
                        <div className="text-sm text-gray-300">Total Productos</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-lg font-bold text-green-400">{formatCurrency(stats.valorTotal)}</div>
                        <div className="text-sm text-gray-300">Valor Total</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-lg font-bold text-purple-400">{formatCurrency(stats.precioPromedio)}</div>
                        <div className="text-sm text-gray-300">Precio Promedio</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-lg font-bold text-red-400">{formatCurrency(stats.precioMaximo)}</div>
                        <div className="text-sm text-gray-300">Precio Máximo</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700">
                        <div className="text-lg font-bold text-green-400">{formatCurrency(stats.precioMinimo)}</div>
                        <div className="text-sm text-gray-300">Precio Mínimo</div>
                    </div>
                </div>

                {/* Search Filters */}
                <div className="bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Filtros de Búsqueda</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-red-400 hover:text-red-300 font-medium"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="number"
                            name="precioMin"
                            placeholder="Precio mínimo"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search.precioMin}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Filtrar por descripción"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search.descripcion}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="precioMax"
                            placeholder="Precio máximo"
                            className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={search.precioMax}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-4">
                    <p className="text-gray-300">
                        Mostrando <span className="font-semibold text-blue-400">{filteredData.length}</span> de {data.length} productos
                        {filteredData.length > 0 && (
                            <span className="ml-4 text-sm">
                                Valor filtrado: <span className="font-semibold text-green-400">
                                    {formatCurrency(filteredData.reduce((sum, item) => sum + item.precio, 0))}
                                </span>
                            </span>
                        )}
                    </p>
                </div>

                {/* Table */}
                <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                        Unidad
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                        Descripción
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                                        Precio
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="px-6 py-4 text-base font-bold text-white">
                                                {item.unidad}
                                            </td>
                                            <td className="px-6 py-4 text-base font-bold text-gray-200 max-w-md">
                                                {item.descripcion}
                                            </td>
                                            <td className="px-6 py-4 text-base font-bold text-green-400">
                                                {formatCurrency(item.precio)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <div className="text-gray-400">
                                                <div className="text-lg font-medium mb-2 text-white">No se encontraron productos</div>
                                                <p className="text-sm">Intenta modificar los filtros de búsqueda</p>
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={clearFilters}
                                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                                                    >
                                                        Limpiar filtros
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DotacionComponent;