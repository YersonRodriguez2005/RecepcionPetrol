import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Users } from 'lucide-react';

const ChecklistRadicacion = () => {
    // Lista de personas importantes para radicar (puedes modificar esta lista según tus necesidades)
    const personasImportantes = [
        "Juan Nicolas Muñoz Diaz - Asesor Fiscal",
        "Nicolas Andres Calderon Rodriguez - Asesoria",
        "Garay Serrato Bryan - Revisor Fiscal",
        "Francy Camacho - Papeleria",
        "Jhonatan Mora - S.S.",
        "Jhonatan Mora - S.M.",
        "Jennifer Mora - S.S.",
        "Jhon Edinson Mora - S.S.",
        "Leonidas Mora Tito - S.S.",
        "Leonidas Mora Tito - S.F.",
        "Escovial",
        "Marshall - Servicio de Escolta",
        "Marshall - Servicio de Vigilancia",
        "Gutierrez Cardozo Luis Miguel - Contabilidad1",
        "Gutierrez Cardozo Luis Miguel - Contabilidad2"
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    // Cargar estado del checklist desde localStorage al montar el componente
    useEffect(() => {
        const savedChecklist = localStorage.getItem('radicacion-checklist');
        if (savedChecklist) {
            setCheckedItems(JSON.parse(savedChecklist));
        }
    }, []);

    // Guardar estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('radicacion-checklist', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const handleCheckChange = (persona) => {
        setCheckedItems(prev => ({
            ...prev,
            [persona]: !prev[persona]
        }));
    };

    const resetChecklist = () => {
        setCheckedItems({});
    };

    const getProgress = () => {
        const total = personasImportantes.length;
        const completed = Object.values(checkedItems).filter(Boolean).length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    };

    const progress = getProgress();

    return (
        <div className="relative">
            {/* Botón para abrir el checklist */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
                <Users size={18} />
                <span className="hidden sm:inline">Radicación</span>
                <span className="bg-blue-800 px-2 py-1 rounded-full text-xs">
                    {progress.completed}/{progress.total}
                </span>
            </button>

            {/* Modal del checklist */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
                        {/* Header del modal */}
                        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Lista de Radicación Mensual</h3>
                                <p className="text-sm text-gray-300">
                                    Progreso: {progress.completed}/{progress.total} ({progress.percentage}%)
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Barra de progreso */}
                        <div className="p-4 bg-gray-50">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress.percentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Lista de personas */}
                        <div className="p-4 max-h-96 overflow-y-auto">
                            <div className="space-y-2">
                                {personasImportantes.map((persona, index) => (
                                    <label
                                        key={index}
                                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${checkedItems[persona]
                                                ? 'bg-green-50 border-green-200 text-green-800'
                                                : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-800'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checkedItems[persona] || false}
                                            onChange={() => handleCheckChange(persona)}
                                            className="sr-only"
                                        />
                                        <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mr-3 ${checkedItems[persona]
                                                ? 'bg-green-600 border-green-600'
                                                : 'border-gray-300'
                                            }`}>
                                            {checkedItems[persona] && <Check size={14} className="text-white" />}
                                        </div>
                                        <span className={`flex-1 ${checkedItems[persona] ? 'line-through text-green-800' : 'text-gray-800'}`}>
                                            {persona}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {/* Footer con botones de acción */}
                        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
                            <button
                                onClick={resetChecklist}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                            >
                                <RotateCcw size={16} />
                                Reiniciar
                            </button>
                            <span className="text-sm text-gray-600">
                                {progress.completed === progress.total ? '¡Completado! 🎉' : `Faltan ${progress.total - progress.completed}`}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChecklistRadicacion;