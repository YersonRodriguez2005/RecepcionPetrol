import React, { useState, useMemo } from 'react';

const SistemaExamenesComponent = () => {
    // Datos de ejemplo para demostrar el componente
    const [data] = useState([
        { unidad: 1, descripcion: "VALORACION MEDICA CARDIO Y OSTEO", precio: 29400 },
        { unidad: 1, descripcion: "GLICEMIA", precio: 6300 },
        { unidad: 1, descripcion: "PERFIL LIPIDICO", precio: 23100 },
        { unidad: 1, descripcion: "EXAMEN OPTOMETRIA", precio: 21000 },
        { unidad: 1, descripcion: "AUDIOMETRIA", precio: 15000 },
        { unidad: 1, descripcion: "PRUEBA PSICOSENSOMETRICA", precio: 33000 },
        { unidad: 1, descripcion: "PRUEBA PSICOTECNICA", precio: 23100 },
        { unidad: 1, descripcion: "ELECTROCARDIOGRAMA", precio: 31000 },
        { unidad: 1, descripcion: "E.M.O. EN ALTURA", precio: 11000 },
        { unidad: 1, descripcion: "TAMIZAJE PANEL 2", precio: 21000 },
        { unidad: 1, descripcion: "ALCOHOL", precio: 16800 },
        { unidad: 1, descripcion: "ESPIROMETRIA", precio: 22000 }
    ]);

    const [search, setSearch] = useState({
        precioMin: '',
        descripcion: '',
        precioMax: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesDescription = item.descripcion.toLowerCase().includes(search.descripcion.toLowerCase());
            const matchesMinPrice = !search.precioMin || item.precio >= parseFloat(search.precioMin);
            const matchesMaxPrice = !search.precioMax || item.precio <= parseFloat(search.precioMax);
            
            return matchesDescription && matchesMinPrice && matchesMaxPrice;
        });
    }, [data, search]);

    const stats = useMemo(() => {
        if (data.length === 0) return { total: 0, valorTotal: 0, precioPromedio: 0, precioMaximo: 0, precioMinimo: 0 };
        
        const precios = data.map(item => item.precio);
        const valorTotal = precios.reduce((sum, precio) => sum + precio, 0);
        
        return {
            total: data.length,
            valorTotal,
            precioPromedio: valorTotal / data.length,
            precioMaximo: Math.max(...precios),
            precioMinimo: Math.min(...precios)
        };
    }, [data]);

    const hasActiveFilters = search.precioMin || search.descripcion || search.precioMax;

    const clearFilters = () => {
        setSearch({
            precioMin: '',
            descripcion: '',
            precioMax: ''
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div style={{ backgroundColor: '#373739' }} className="min-h-screen">
            <div className="p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#c9b977' }}>Sistema de Exámenes</h2>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-2xl font-bold" style={{ color: '#c9b977' }}>{stats.total}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Total Exámenes</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-lg font-bold" style={{ color: '#c9b977' }}>{formatCurrency(stats.valorTotal)}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Valor Total</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-lg font-bold" style={{ color: '#ecdda2' }}>{formatCurrency(stats.precioPromedio)}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Precio Promedio</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-lg font-bold text-red-400">{formatCurrency(stats.precioMaximo)}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Precio Máximo</div>
                    </div>
                    <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 border">
                        <div className="text-lg font-bold text-green-400">{formatCurrency(stats.precioMinimo)}</div>
                        <div className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Precio Mínimo</div>
                    </div>
                </div>

                {/* Search Filters */}
                <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow p-6 mb-6 border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: '#ecdda2' }}>Filtros de Búsqueda</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm hover:opacity-80 font-medium"
                                style={{ color: '#c9b977' }}
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
                            style={{ 
                                backgroundColor: '#020202', 
                                borderColor: '#ecdda2',
                                color: '#ecdda2'
                            }}
                            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60 focus:outline-none"
                            value={search.precioMin}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="descripcion"
                            placeholder="Filtrar por descripción"
                            style={{ 
                                backgroundColor: '#020202', 
                                borderColor: '#ecdda2',
                                color: '#ecdda2'
                            }}
                            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60 focus:outline-none"
                            value={search.descripcion}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="precioMax"
                            placeholder="Precio máximo"
                            style={{ 
                                backgroundColor: '#020202', 
                                borderColor: '#ecdda2',
                                color: '#ecdda2'
                            }}
                            className="border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-opacity-50 placeholder-opacity-60 focus:outline-none"
                            value={search.precioMax}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Results Counter */}
                <div className="mb-4">
                    <p style={{ color: '#ecdda2' }}>
                        Mostrando <span className="font-semibold" style={{ color: '#c9b977' }}>{filteredData.length}</span> de {data.length} exámenes
                        {filteredData.length > 0 && (
                            <span className="ml-4 text-sm">
                                Valor filtrado: <span className="font-semibold" style={{ color: '#c9b977' }}>
                                    {formatCurrency(filteredData.reduce((sum, item) => sum + item.precio, 0))}
                                </span>
                            </span>
                        )}
                    </p>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: '#191913', borderColor: '#020202' }} className="rounded-lg shadow overflow-hidden border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead style={{ backgroundColor: '#020202' }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#c9b977' }}>
                                        Unidad
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#c9b977' }}>
                                        Descripción
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#c9b977' }}>
                                        Precio
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ borderColor: '#020202' }}>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="hover:opacity-80 transition-opacity">
                                            <td className="px-6 py-4 text-base font-bold" style={{ color: '#ecdda2' }}>
                                                {item.unidad}
                                            </td>
                                            <td className="px-6 py-4 text-base font-bold max-w-md" style={{ color: '#ecdda2' }}>
                                                {item.descripcion}
                                            </td>
                                            <td className="px-6 py-4 text-base font-bold" style={{ color: '#c9b977' }}>
                                                {formatCurrency(item.precio)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center">
                                            <div>
                                                <div className="text-lg font-medium mb-2" style={{ color: '#c9b977' }}>No se encontraron exámenes</div>
                                                <p className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>Intenta modificar los filtros de búsqueda</p>
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={clearFilters}
                                                        style={{ backgroundColor: '#c9b977' }}
                                                        className="mt-4 px-4 py-2 text-black rounded-lg hover:opacity-90 text-sm font-medium transition-opacity"
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

export default SistemaExamenesComponent;