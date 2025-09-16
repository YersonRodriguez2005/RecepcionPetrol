import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Users, FileText, CreditCard, Building, Phone, Fuel } from 'lucide-react';

const ChecklistRadicacion = () => {
    // Organización por categorías
    const categorias = {
        asesores: {
            titulo: "Asesores y Profesionales",
            icono: <Users size={16} />,
            items: [
                "Juan Nicolas Muñoz Diaz - Asesor Fiscal",
                "Nicolas Andres Calderon Rodriguez - Asesoría",
                "Garay Serrato Bryan - Revisor Fiscal",
                "Gutierrez Cardozo Luis Miguel - Contabilidad 1",
                "Gutierrez Cardozo Luis Miguel - Contabilidad 2"
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

    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});

    // Cargar estado del checklist desde localStorage al montar el componente
    useEffect(() => {
        const savedChecklist = localStorage.getItem('radicacion-checklist-v2');
        if (savedChecklist) {
            try {
                setCheckedItems(JSON.parse(savedChecklist));
            } catch (error) {
                console.error('Error al cargar checklist:', error);
            }
        }
        
        // Por defecto, expandir todas las categorías
        const defaultExpanded = {};
        Object.keys(categorias).forEach(categoria => {
            defaultExpanded[categoria] = true;
        });
        setExpandedCategories(defaultExpanded);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Guardar estado en localStorage cuando cambie
    useEffect(() => {
        try {
            localStorage.setItem('radicacion-checklist-v2', JSON.stringify(checkedItems));
        } catch (error) {
            console.error('Error al guardar checklist:', error);
        }
    }, [checkedItems]);

    const handleCheckChange = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const resetChecklist = () => {
        if (window.confirm('¿Estás seguro de que quieres reiniciar todo el checklist?')) {
            setCheckedItems({});
        }
    };

    const toggleCategory = (categoria) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoria]: !prev[categoria]
        }));
    };

    const getTotalItems = () => {
        return Object.values(categorias).reduce((total, categoria) => total + categoria.items.length, 0);
    };

    const getProgress = () => {
        const total = getTotalItems();
        const completed = Object.values(checkedItems).filter(Boolean).length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    };

    const getCategoryProgress = (categoria) => {
        const items = categorias[categoria].items;
        const completed = items.filter(item => checkedItems[item]).length;
        return { completed, total: items.length, percentage: Math.round((completed / items.length) * 100) };
    };

    const progress = getProgress();

    const getProgressColor = (percentage) => {
        if (percentage === 100) return 'bg-green-600';
        if (percentage >= 70) return 'bg-blue-600';
        if (percentage >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const getCurrentMonth = () => {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[new Date().getMonth()];
    };

    return (
        <div className="relative">
            {/* Botón para abrir el checklist */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 ${
                    progress.percentage === 100 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
                <Users size={18} />
                <span className="hidden sm:inline">Radicación {getCurrentMonth()}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    progress.percentage === 100 ? 'bg-green-800' : 'bg-blue-800'
                }`}>
                    {progress.completed}/{progress.total}
                </span>
                {progress.percentage === 100 && <span className="text-sm">🎉</span>}
            </button>

            {/* Modal del checklist */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">
                                        📋 Checklist de Radicación - {getCurrentMonth()}
                                    </h3>
                                    <p className="text-gray-300 text-sm">
                                        Progreso general: {progress.completed}/{progress.total} elementos ({progress.percentage}%)
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {/* Barra de progreso principal */}
                            <div className="mt-4">
                                <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
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
                                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                                categoryProgress.percentage === 100 
                                                    ? 'bg-green-50 border-2 border-green-200'
                                                    : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                                            }`}
                                            onClick={() => toggleCategory(categoriaKey)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {categoria.icono}
                                                    <h4 className="font-semibold text-gray-800">{categoria.titulo}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        categoryProgress.percentage === 100 
                                                            ? 'bg-green-200 text-green-800' 
                                                            : 'bg-gray-200 text-gray-700'
                                                    }`}>
                                                        {categoryProgress.completed}/{categoryProgress.total}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {categoryProgress.percentage === 100 && <span className="text-green-600">✓</span>}
                                                    <span className="text-sm text-gray-500">
                                                        {isExpanded ? '▼' : '▶'}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {/* Mini barra de progreso por categoría */}
                                            <div className="mt-2">
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
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
                                                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                                            checkedItems[item]
                                                                ? 'bg-green-50 border-green-200 text-green-800 shadow-sm'
                                                                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-gray-800'
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedItems[item] || false}
                                                            onChange={() => handleCheckChange(item)}
                                                            className="sr-only"
                                                        />
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                                                            checkedItems[item]
                                                                ? 'bg-green-600 border-green-600 shadow-md'
                                                                : 'border-gray-300 hover:border-blue-400'
                                                        }`}>
                                                            {checkedItems[item] && <Check size={14} className="text-white" />}
                                                        </div>
                                                        <span className={`flex-1 font-medium transition-all duration-200 ${
                                                            checkedItems[item] 
                                                                ? 'line-through text-green-700 opacity-75' 
                                                                : 'text-gray-700'
                                                        }`}>
                                                            {item}
                                                        </span>
                                                        {checkedItems[item] && (
                                                            <span className="text-green-600 text-sm font-semibold ml-2">
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
                        <div className="p-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
                            <button
                                onClick={resetChecklist}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md"
                            >
                                <RotateCcw size={16} />
                                Reiniciar Todo
                            </button>
                            
                            <div className="text-center">
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                    progress.completed === progress.total 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {progress.completed === progress.total 
                                        ? '¡Todo completado! 🎉🎊' 
                                        : `Faltan ${progress.total - progress.completed} elementos`
                                    }
                                </span>
                            </div>
                            
                            <div className="text-xs text-gray-500">
                                💾 Guardado automático
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChecklistRadicacion;