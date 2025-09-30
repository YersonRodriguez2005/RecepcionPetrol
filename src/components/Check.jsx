import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Users, FileText, Fuel, Building } from 'lucide-react';

const ChecklistRadicacionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});

    const getCurrentMonth = () => {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[new Date().getMonth()];
    };

    const categorias = {
        asesores: {
            titulo: "Asesores y Profesionales",
            icono: <Users size={16} />,
            items: [
                "Juan Nicolas Muñoz Diaz - Asesor Fiscal",
                "Nicolas Andres Calderon Rodriguez - Asesoría",
                "Garay Serrato Bryan - Revisor Fiscal",
                "Gutierrez Cardozo Luis Miguel - Contabilidad",
            ]
        },
        servicios: {
            titulo: "Servicios Especializados",
            icono: <FileText size={16} />,
            items: [
                "Francy Camacho - Papelería",
                "Escovial",
                "Marshall - Servicio de Escolta",
                "Marshall - Servicio de Vigilancia"
            ]
        },
        personal: {
            titulo: "Personal Interno",
            icono: <Users size={16} />,
            items: [
                "Jhonatan Mora - S.S.",
                "Jhonatan Mora - S.M.",
                "Jennifer Mora - S.S.",
                "Jhohn Edinson Mora - S.S.",
                "Leonidas Mora Tito - S.S.",
                "Leonidas Mora Tito - S.F."
            ]
        },
        serviciosPublicos: {
            titulo: "Servicios Públicos",
            icono: <Fuel size={16} />,
            items: [
                "Gas J1",
                "Línea J1",
                "Línea Jennifer"
            ]
        },
        arriendos: {
            titulo: "Arriendos",
            icono: <Building size={16} />,
            items: [
                "Arriendo Chaparral",
                "Arriendo Villavó",
                "Arriendo Girón"
            ]
        }
    };

    // Expandir todas las categorías por defecto al iniciar
    useEffect(() => {
        const initialExpanded = {};
        Object.keys(categorias).forEach(key => {
            initialExpanded[key] = true;
        });
        setExpandedCategories(initialExpanded);
    }, []);

    const handleCheckChange = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const toggleCategory = (categoryKey) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryKey]: !prev[categoryKey]
        }));
    };

    const resetChecklist = () => {
        if (window.confirm('¿Estás seguro de que quieres reiniciar todo el checklist?')) {
            setCheckedItems({});
        }
    };

    const getCategoryProgress = (categoryKey) => {
        const items = categorias[categoryKey].items;
        const completed = items.filter(item => checkedItems[item]).length;
        return {
            completed,
            total: items.length,
            percentage: Math.round((completed / items.length) * 100)
        };
    };

    const progress = (() => {
        const totalItems = Object.values(categorias).reduce((sum, cat) => sum + cat.items.length, 0);
        const completedItems = Object.values(checkedItems).filter(Boolean).length;
        return {
            completed: completedItems,
            total: totalItems,
            percentage: Math.round((completedItems / totalItems) * 100)
        };
    })();

    const getProgressColor = (percentage) => {
        if (percentage === 100) return 'bg-green-500';
        if (percentage >= 75) return 'bg-yellow-500';
        if (percentage >= 50) return 'bg-blue-500';
        return 'bg-gray-400';
    };

    return (
        <div className="relative">
            {/* Botón para abrir el checklist */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-medium ${progress.percentage === 100
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'text-black hover:opacity-90'
                    }`}
                style={{ backgroundColor: progress.percentage === 100 ? undefined : '#c9b977' }}
            >
                <Users size={18} />
                <span className="hidden sm:inline">Radicación {getCurrentMonth()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${progress.percentage === 100 ? 'bg-green-800' : 'bg-black bg-opacity-20'
                    }`}>
                    {progress.completed}/{progress.total}
                </span>
                {progress.percentage === 100 && <span className="text-sm">🎉</span>}
            </button>

            {/* Modal del checklist */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div
                        className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                        style={{ backgroundColor: '#191913' }}
                    >
                        {/* Header del modal */}
                        <div
                            className="p-6"
                            style={{ backgroundColor: '#020202' }}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold mb-1" style={{ color: '#c9b977' }}>
                                        📋 Checklist de Radicación - {getCurrentMonth()}
                                    </h3>
                                    <p className="text-sm" style={{ color: '#ecdda2', opacity: 0.8 }}>
                                        Progreso general: {progress.completed}/{progress.total} elementos ({progress.percentage}%)
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg transition-colors hover:opacity-80"
                                    style={{ backgroundColor: '#373739', color: '#ecdda2' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Barra de progreso principal */}
                            <div className="mt-4">
                                <div
                                    className="w-full rounded-full h-3 shadow-inner"
                                    style={{ backgroundColor: '#373739' }}
                                >
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress.percentage)}`}
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Contenido del modal */}
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                            {Object.entries(categorias).map(([categoriaKey, categoria]) => {
                                const categoryProgress = getCategoryProgress(categoriaKey);
                                const isExpanded = expandedCategories[categoriaKey];

                                return (
                                    <div key={categoriaKey} className="mb-4">
                                        {/* Header de categoría */}
                                        <div
                                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${categoryProgress.percentage === 100
                                                    ? 'border-green-500'
                                                    : 'border-opacity-30 hover:border-opacity-50'
                                                }`}
                                            style={{
                                                backgroundColor: categoryProgress.percentage === 100 ? '#191913' : '#020202',
                                                borderColor: categoryProgress.percentage === 100 ? undefined : '#ecdda2'
                                            }}
                                            onClick={() => toggleCategory(categoriaKey)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {categoria.icono}
                                                    <h4 className="font-semibold" style={{ color: '#ecdda2' }}>{categoria.titulo}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryProgress.percentage === 100
                                                            ? 'bg-green-600 text-white'
                                                            : 'text-black'
                                                        }`}
                                                        style={{ backgroundColor: categoryProgress.percentage === 100 ? undefined : '#c9b977' }}
                                                    >
                                                        {categoryProgress.completed}/{categoryProgress.total}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {categoryProgress.percentage === 100 && <span className="text-green-500">✓</span>}
                                                    <span className="text-sm" style={{ color: '#ecdda2', opacity: 0.7 }}>
                                                        {isExpanded ? '▼' : '▶'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Mini barra de progreso por categoría */}
                                            <div className="mt-2">
                                                <div
                                                    className="w-full rounded-full h-1.5"
                                                    style={{ backgroundColor: '#373739' }}
                                                >
                                                    <div
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(categoryProgress.percentage)}`}
                                                        style={{ width: `${categoryProgress.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items de la categoría */}
                                        {isExpanded && (
                                            <div className="mt-2 ml-4 space-y-2">
                                                {categoria.items.map((item, index) => (
                                                    <label
                                                        key={index}
                                                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${checkedItems[item]
                                                                ? 'border-green-500 shadow-sm'
                                                                : 'border-opacity-30 hover:border-opacity-50'
                                                            }`}
                                                        style={{
                                                            backgroundColor: checkedItems[item] ? '#191913' : '#020202',
                                                            borderColor: checkedItems[item] ? undefined : '#ecdda2'
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedItems[item] || false}
                                                            onChange={() => handleCheckChange(item)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${checkedItems[item]
                                                                ? 'bg-green-600 border-green-600 shadow-md'
                                                                : 'border-opacity-50 hover:border-opacity-80'
                                                            }`}
                                                            style={{ borderColor: checkedItems[item] ? undefined : '#c9b977' }}
                                                        >
                                                            {checkedItems[item] && <Check size={14} className="text-white" />}
                                                        </div>
                                                        <span className={`flex-1 font-medium transition-all duration-200 ${checkedItems[item]
                                                                ? 'line-through opacity-75'
                                                                : ''
                                                            }`}
                                                            style={{ color: checkedItems[item] ? '#c9b977' : '#ecdda2' }}
                                                        >
                                                            {item}
                                                        </span>
                                                        {checkedItems[item] && (
                                                            <span className="text-green-500 text-sm font-semibold ml-2">
                                                                ✓ Listo
                                                            </span>
                                                        )}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer con botones de acción */}
                        <div
                            className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3"
                            style={{ backgroundColor: '#020202', borderColor: '#373739' }}
                        >
                            <button
                                onClick={resetChecklist}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md font-medium"
                            >
                                <RotateCcw size={16} />
                                Reiniciar Todo
                            </button>

                            <div className="text-center">
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${progress.completed === progress.total
                                        ? 'bg-green-600 text-white'
                                        : 'text-black'
                                    }`}
                                    style={{ backgroundColor: progress.completed === progress.total ? undefined : '#c9b977' }}
                                >
                                    {progress.completed === progress.total
                                        ? '¡Todo completado! 🎉🎊'
                                        : `Faltan ${progress.total - progress.completed} elementos`
                                    }
                                </span>
                            </div>

                            <div className="text-xs" style={{ color: '#ecdda2', opacity: 0.7 }}>
                                ⚠️ Datos en memoria
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChecklistRadicacionComponent;