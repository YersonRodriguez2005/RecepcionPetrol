import React, { useState, useEffect } from 'react';
import { Check, X, RotateCcw, Users, FileText, Fuel, Building, DollarSign, History, Trash2, Download, Filter, Edit2 } from 'lucide-react';

const ChecklistRadicacionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [showHistory, setShowHistory] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);
    const [paymentData, setPaymentData] = useState({
        valorPagado: ''
    });
    const [monthlyHistory, setMonthlyHistory] = useState([]);
    const [filterMonth, setFilterMonth] = useState('todos');

    const getCurrentMonth = () => {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[new Date().getMonth()];
    };

    const getCurrentMonthKey = () => {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    const getMonthName = (monthKey) => {
        const [year, month] = monthKey.split('-');
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return `${meses[parseInt(month) - 1]} ${year}`;
    };

    // Valores fijos por defecto para cada item
    const valoresFijos = {
        "Juan Nicolas Muñoz Diaz - Asesor Fiscal": 2135250,
        "Nicolas Andres Calderon Rodriguez - Asesoría": 2135250,
        "Garay Serrato Bryan - Revisor Fiscal": 4000000,
        "Gutierrez Cardozo Luis Miguel - Contabilidad": 1800000,
        "Francy Camacho - Papelería": 1000000,
        "Escovial": 1000000,
        "Marshall - Servicio de Escolta": 1600000,
        "Marshall - Servicio de Vigilancia": 10110911,
        "Jhonatan Mora - S.S.": 12000000,
        "Jhonatan Mora - S.M.": 15212980,
        "Jennifer Mora - S.S.": 13098000,
        "Jhohn Edinson Mora - S.S.": 20000000,
        "Leonidas Mora Tito - S.S.": 10141990,
        "Leonidas Mora Tito - S.F.": 12000000,
        "Gas J1": 90000,
        "Línea J1": 195000,
        "Línea Jennifer": 100000,
        "Arriendo Chaparral": 550000,
        "Arriendo Villavó": 700000,
        "Arriendo Girón": 935000
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

    // Cargar datos al iniciar
    useEffect(() => {
        const initialExpanded = {};
        Object.keys(categorias).forEach(key => {
            initialExpanded[key] = true;
        });
        setExpandedCategories(initialExpanded);

        // Cargar checklist guardado
        const savedChecklist = localStorage.getItem('radicacion-checklist');
        if (savedChecklist) {
            setCheckedItems(JSON.parse(savedChecklist));
        }

        // Cargar historial
        const savedHistory = localStorage.getItem('radicacion-history');
        if (savedHistory) {
            setMonthlyHistory(JSON.parse(savedHistory));
        }
    }, []);

    const handleCheckChange = (item) => {
        if (!checkedItems[item]) {
            // Abrir modal para registrar pago
            setSelectedItem(item);
            setPaymentData({
                valorPagado: valoresFijos[item]?.toString() || ''
            });
            setShowPaymentModal(true);
        } else {
            // Desmarcar
            const newCheckedItems = {
                ...checkedItems,
                [item]: false
            };
            setCheckedItems(newCheckedItems);
            localStorage.setItem('radicacion-checklist', JSON.stringify(newCheckedItems));
        }
    };

    const handlePaymentSubmit = () => {
        if (!paymentData.valorPagado || paymentData.valorPagado === '') {
            alert('Por favor ingresa el valor pagado');
            return;
        }

        // Marcar como completado y guardar
        const newCheckedItems = {
            ...checkedItems,
            [selectedItem]: true
        };
        setCheckedItems(newCheckedItems);
        localStorage.setItem('radicacion-checklist', JSON.stringify(newCheckedItems));

        // Crear registro en historial
        const newEntry = {
            id: Date.now(),
            mes: getCurrentMonthKey(),
            mesNombre: getCurrentMonth(),
            concepto: selectedItem,
            valorFijo: valoresFijos[selectedItem] || 0,
            valorPagado: parseFloat(paymentData.valorPagado)
        };

        const updatedHistory = [...monthlyHistory, newEntry];
        setMonthlyHistory(updatedHistory);
        localStorage.setItem('radicacion-history', JSON.stringify(updatedHistory));

        // Cerrar modal
        setShowPaymentModal(false);
        setSelectedItem(null);
        setPaymentData({ valorPagado: '' });
    };

    const handleEditEntry = (entry) => {
        setEditingEntry(entry);
        setPaymentData({
            valorPagado: entry.valorPagado.toString()
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = () => {
        if (!paymentData.valorPagado || paymentData.valorPagado === '') {
            alert('Por favor ingresa el valor pagado');
            return;
        }

        const updatedHistory = monthlyHistory.map(entry => {
            if (entry.id === editingEntry.id) {
                return {
                    ...entry,
                    valorPagado: parseFloat(paymentData.valorPagado)
                };
            }
            return entry;
        });

        setMonthlyHistory(updatedHistory);
        localStorage.setItem('radicacion-history', JSON.stringify(updatedHistory));

        setShowEditModal(false);
        setEditingEntry(null);
        setPaymentData({ valorPagado: '' });
    };

    const deleteHistoryEntry = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este registro?')) {
            const updatedHistory = monthlyHistory.filter(entry => entry.id !== id);
            setMonthlyHistory(updatedHistory);
            localStorage.setItem('radicacion-history', JSON.stringify(updatedHistory));
        }
    };

    const exportToCSV = () => {
        const headers = ['Mes', 'Concepto', 'Valor Fijo', 'Valor Pagado'];
        const rows = filteredHistory.map(entry => [
            entry.mesNombre,
            entry.concepto,
            entry.valorFijo,
            entry.valorPagado
        ]);

        let csvContent = headers.join(',') + '\n';
        rows.forEach(row => {
            csvContent += row.join(',') + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `historial_radicacion_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
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
            localStorage.removeItem('radicacion-checklist');
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

    // Obtener meses únicos del historial
    const uniqueMonths = [...new Set(monthlyHistory.map(entry => entry.mes))].sort().reverse();

    // Filtrar historial
    const filteredHistory = filterMonth === 'todos'
        ? monthlyHistory
        : monthlyHistory.filter(entry => entry.mes === filterMonth);

    // Calcular estadísticas del filtro
    const stats = {
        total: filteredHistory.length,
        totalFijo: filteredHistory.reduce((sum, entry) => sum + entry.valorFijo, 0),
        totalPagado: filteredHistory.reduce((sum, entry) => sum + entry.valorPagado, 0)
    };

    return (
        <div className="relative">
            {/* Botones principales */}
            <div className="flex gap-2 flex-wrap">
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

                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <History size={18} />
                    <span className="hidden sm:inline">Historial</span>
                    {monthlyHistory.length > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-800">
                            {monthlyHistory.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Modal del checklist */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div
                        className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                        style={{ backgroundColor: '#191913' }}
                    >
                        {/* Header */}
                        <div className="p-6" style={{ backgroundColor: '#020202' }}>
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

                            {/* Barra de progreso */}
                            <div className="mt-4">
                                <div className="w-full rounded-full h-3 shadow-inner" style={{ backgroundColor: '#373739' }}>
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(progress.percentage)}`}
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="max-h-[60vh] overflow-y-auto p-4">
                            {Object.entries(categorias).map(([categoriaKey, categoria]) => {
                                const categoryProgress = getCategoryProgress(categoriaKey);
                                const isExpanded = expandedCategories[categoriaKey];

                                return (
                                    <div key={categoriaKey} className="mb-4">
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

                                            <div className="mt-2">
                                                <div className="w-full rounded-full h-1.5" style={{ backgroundColor: '#373739' }}>
                                                    <div
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(categoryProgress.percentage)}`}
                                                        style={{ width: `${categoryProgress.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

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

                        {/* Footer */}
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
                                💾 Guardado automático
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Pago */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <DollarSign size={24} className="text-green-600" />
                            <h3 className="text-xl font-bold text-gray-800">
                                Registrar Pago
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Concepto
                                </label>
                                <input
                                    type="text"
                                    value={selectedItem}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Valor Fijo Mensual
                                </label>
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold">
                                    ${(valoresFijos[selectedItem] || 0).toLocaleString('es-CO')}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Valor Pagado <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={paymentData.valorPagado}
                                    onChange={(e) => setPaymentData({ ...paymentData, valorPagado: e.target.value })}
                                    placeholder="Ingresa el monto pagado"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 font-semibold text-lg"
                                    style={{ backgroundColor: '#ffffff' }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowPaymentModal(false);
                                    setSelectedItem(null);
                                }}
                                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handlePaymentSubmit}
                                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium shadow-md"
                            >
                                💾 Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Edición */}
            {showEditModal && editingEntry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Edit2 size={24} className="text-blue-600" />
                            <h3 className="text-xl font-bold text-gray-800">
                                Editar Registro
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Concepto
                                </label>
                                <input
                                    type="text"
                                    value={editingEntry.concepto}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Valor Fijo Mensual
                                </label>
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-semibold">
                                    ${editingEntry.valorFijo.toLocaleString('es-CO')}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Valor Pagado <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={paymentData.valorPagado}
                                    onChange={(e) => setPaymentData({ ...paymentData, valorPagado: e.target.value })}
                                    placeholder="Ingresa el monto pagado"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowEditModal(false);
                                    setEditingEntry(null);
                                }}
                                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md"
                            >
                                💾 Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Historial */}
            {showHistory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div
                        className="rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                        style={{ backgroundColor: '#191913' }}
                    >
                        <div className="p-6" style={{ backgroundColor: '#020202' }}>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <History size={24} style={{ color: '#c9b977' }} />
                                    <h3 className="text-xl font-bold" style={{ color: '#c9b977' }}>
                                        Historial de Radicaciones
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowHistory(false)}
                                    className="p-2 rounded-lg transition-colors hover:opacity-80"
                                    style={{ backgroundColor: '#373739', color: '#ecdda2' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Filtros y Acciones */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <div className="flex items-center gap-2">
                                    <Filter size={18} style={{ color: '#c9b977' }} />
                                    <select
                                        value={filterMonth}
                                        onChange={(e) => setFilterMonth(e.target.value)}
                                        className="px-3 py-2 rounded-lg border-2 font-medium focus:ring-2 focus:ring-blue-500"
                                        style={{ backgroundColor: '#373739', color: '#ecdda2', borderColor: '#c9b977' }}
                                    >
                                        <option value="todos">Todos los meses</option>
                                        {uniqueMonths.map(month => (
                                            <option key={month} value={month}>
                                                {getMonthName(month)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={exportToCSV}
                                    disabled={filteredHistory.length === 0}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium shadow-md"
                                >
                                    <Download size={18} />
                                    Exportar CSV
                                </button>

                                <div className="ml-auto text-sm font-medium" style={{ color: '#ecdda2' }}>
                                    Mostrando: {filteredHistory.length} registro(s)
                                </div>
                            </div>
                        </div>

                        <div className="max-h-[55vh] overflow-y-auto p-6">
                            {filteredHistory.length === 0 ? (
                                <div className="text-center py-16" style={{ color: '#ecdda2' }}>
                                    <History size={64} className="mx-auto mb-4 opacity-30" />
                                    <p className="text-lg font-medium">
                                        {filterMonth === 'todos'
                                            ? 'No hay registros en el historial'
                                            : `No hay registros para ${getMonthName(filterMonth)}`
                                        }
                                    </p>
                                    <p className="text-sm opacity-70 mt-2">Los pagos registrados aparecerán aquí</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: '#020202' }}>
                                                <th className="px-4 py-3 text-left text-sm font-bold rounded-l-lg" style={{ color: '#c9b977' }}>
                                                    Mes
                                                </th>
                                                <th className="px-4 py-3 text-left text-sm font-bold" style={{ color: '#c9b977' }}>
                                                    Concepto
                                                </th>
                                                <th className="px-4 py-3 text-right text-sm font-bold" style={{ color: '#c9b977' }}>
                                                    Valor Fijo
                                                </th>
                                                <th className="px-4 py-3 text-right text-sm font-bold" style={{ color: '#c9b977' }}>
                                                    Valor Pagado
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-bold rounded-r-lg" style={{ color: '#c9b977' }}>
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredHistory.map((entry) => (
                                                <tr
                                                    key={entry.id}
                                                    className="transition-all hover:shadow-lg"
                                                    style={{ backgroundColor: '#020202' }}
                                                >
                                                    <td className="px-4 py-3 rounded-l-lg">
                                                        <span className="px-2 py-1 rounded text-xs font-bold inline-block" style={{ backgroundColor: '#c9b977', color: '#020202' }}>
                                                            {entry.mesNombre}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium" style={{ color: '#ecdda2' }}>
                                                        {entry.concepto}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-bold" style={{ color: '#ecdda2' }}>
                                                        ${entry.valorFijo.toLocaleString('es-CO')}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-bold text-green-400">
                                                        ${entry.valorPagado.toLocaleString('es-CO')}
                                                    </td>
                                                    <td className="px-4 py-3 text-center rounded-r-lg">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                onClick={() => handleEditEntry(entry)}
                                                                className="p-2 rounded-lg transition-all hover:bg-blue-600"
                                                                style={{ color: '#ecdda2' }}
                                                                title="Editar"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteHistoryEntry(entry.id)}
                                                                className="p-2 rounded-lg transition-all hover:bg-red-600"
                                                                style={{ color: '#ecdda2' }}
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t" style={{ backgroundColor: '#020202', borderColor: '#373739' }}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#191913' }}>
                                    <div className="text-xs mb-1" style={{ color: '#ecdda2', opacity: 0.7 }}>Total Registros</div>
                                    <div className="text-2xl font-bold" style={{ color: '#c9b977' }}>
                                        {stats.total}
                                    </div>
                                </div>

                                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#191913' }}>
                                    <div className="text-xs mb-1" style={{ color: '#ecdda2', opacity: 0.7 }}>Total Fijo</div>
                                    <div className="text-xl font-bold" style={{ color: '#c9b977' }}>
                                        ${stats.totalFijo.toLocaleString('es-CO')}
                                    </div>
                                </div>

                                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#191913' }}>
                                    <div className="text-xs mb-1" style={{ color: '#ecdda2', opacity: 0.7 }}>Total Pagado</div>
                                    <div className="text-xl font-bold text-green-400">
                                        ${stats.totalPagado.toLocaleString('es-CO')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChecklistRadicacionComponent;