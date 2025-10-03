import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Trash2, Filter, X, FileText, Receipt, Truck, BarChart3, Eye, EyeOff } from 'lucide-react';

const ExpenseManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('gastos');
  const [showForm, setShowForm] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  // Tipos de gastos predeterminados
  const tiposGasto = [
    'Mantenimiento', 'Lavado', 'Tanqueada', 'Tecnomecánica',
    'Peajes', 'Combustible', 'Repuestos', 'Multas', 'Parqueadero', 'Otro'
  ];

  // Tipos de documentos
  const tiposDocumento = [
    { value: 'guia', label: 'Guía', icon: FileText },
    { value: 'tiquete', label: 'Tiquete', icon: Receipt },
    { value: 'remesa', label: 'Remesa', icon: Truck },
    { value: 'reporte', label: 'Reporte', icon: BarChart3 },
    { value: 'otro', label: 'Otro', icon: FileText }
  ];

  // Estados del formulario
  const [formData, setFormData] = useState({
    tipo: 'gasto',
    nombre: '',
    fecha: new Date().toISOString().split('T')[0],
    tipoGasto: '',
    valor: '',
    tipoDocumento: '',
    numeroDocumento: '',
    conductor: ''
  });

  // Cargar datos del localStorage al inicializar
  useEffect(() => {
    const gastosGuardados = localStorage.getItem('gastos');
    const documentosGuardados = localStorage.getItem('documentos');

    if (gastosGuardados) {
      setGastos(JSON.parse(gastosGuardados));
    }
    if (documentosGuardados) {
      setDocumentos(JSON.parse(documentosGuardados));
    }
  }, []);

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    localStorage.setItem('documentos', JSON.stringify(documentos));
  }, [documentos]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre || !formData.fecha) return;

    if (formData.tipo === 'gasto' && (!formData.tipoGasto || !formData.valor)) return;
    if (formData.tipo === 'documento' && (!formData.tipoDocumento || !formData.numeroDocumento || !formData.conductor)) return;

    const nuevoRegistro = {
      id: Date.now(),
      fecha: formData.fecha,
      ...formData
    };

    if (formData.tipo === 'gasto') {
      setGastos(prev => [...prev, nuevoRegistro]);
    } else {
      setDocumentos(prev => [...prev, nuevoRegistro]);
    }

    // Resetear formulario
    setFormData({
      tipo: formData.tipo,
      nombre: '',
      fecha: new Date().toISOString().split('T')[0],
      tipoGasto: '',
      valor: '',
      tipoDocumento: '',
      numeroDocumento: '',
      conductor: ''
    });
  };

  // Eliminar registro
  const eliminarRegistro = (id, tipo) => {
    if (tipo === 'gasto') {
      setGastos(prev => prev.filter(item => item.id !== id));
    } else {
      setDocumentos(prev => prev.filter(item => item.id !== id));
    }
  };

  // Filtrar datos
  const datosFiltrados = useMemo(() => {
    let datos = activeTab === 'gastos' ? gastos : documentos;

    if (searchTerm) {
      datos = datos.filter(item =>
        item.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.conductor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.numeroDocumento?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      datos = datos.filter(item =>
        item.tipoGasto === filterType || item.tipoDocumento === filterType
      );
    }

    return datos;
  }, [activeTab, gastos, documentos, searchTerm, filterType]);

  // Formatear moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020202' }}>
      <div className="container mx-auto p-3 max-w-7xl">
        {/* Header */}
        <div className="rounded-lg shadow-lg p-4 mb-4" style={{ backgroundColor: '#373739' }}>
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#c9b977' }}>
            Sistema de Gestión Financiera
          </h1>
          <p className="text-sm" style={{ color: '#edcda2' }}>
            Gestiona tus gastos y documentos de facturación
          </p>
        </div>

        {/* Tabs y Formulario */}
        <div className="rounded-lg shadow-lg mb-4" style={{ backgroundColor: '#191913' }}>
          <div className="flex border-b" style={{ borderColor: '#020202' }}>
            <button
              onClick={() => { setActiveTab('gastos'); setFilterType(''); setSearchTerm(''); setFormData({ ...formData, tipo: 'gasto' }) }}
              className="px-4 py-2 font-medium text-sm border-b-2 transition-all hover:opacity-80"
              style={{
                color: activeTab === 'gastos' ? '#c9b977' : '#edcda2',
                backgroundColor: activeTab === 'gastos' ? '#020202' : 'transparent',
                borderBottomColor: activeTab === 'gastos' ? '#c9b977' : 'transparent'
              }}
            >
              <Receipt className="inline-block w-4 h-4 mr-1" />
              Gastos
            </button>
            <button
              onClick={() => { setActiveTab('documentos'); setFilterType(''); setSearchTerm(''); setFormData({ ...formData, tipo: 'documento' }) }}
              className="px-4 py-2 font-medium text-sm border-b-2 transition-all hover:opacity-80"
              style={{
                color: activeTab === 'documentos' ? '#c9b977' : '#edcda2',
                backgroundColor: activeTab === 'documentos' ? '#020202' : 'transparent',
                borderBottomColor: activeTab === 'documentos' ? '#c9b977' : 'transparent'
              }}
            >
              <FileText className="inline-block w-4 h-4 mr-1" />
              Documentos
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="ml-auto px-3 py-2 rounded-t-lg flex items-center gap-2 font-medium transition-all"
              style={{
                backgroundColor: showForm ? '#c9b977' : '#373739',
                color: showForm ? '#020202' : '#c9b977'
              }}
            >
              {showForm ? <EyeOff className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Ocultar' : 'Agregar'}
            </button>
          </div>

          {/* Formulario Inline */}
          {showForm && (
            <form onSubmit={handleSubmit} className="p-3 border-b" style={{ borderColor: '#373739', backgroundColor: '#373739' }}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 items-end">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                    style={{
                      backgroundColor: '#191913',
                      borderColor: '#020202',
                      color: '#edcda2'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                    style={{
                      backgroundColor: '#191913',
                      borderColor: '#020202',
                      color: '#edcda2'
                    }}
                  />
                </div>

                {formData.tipo === 'gasto' || activeTab === 'gastos' ? (
                  <>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                        Tipo
                      </label>
                      <select
                        name="tipoGasto"
                        value={formData.tipoGasto}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                        style={{
                          backgroundColor: '#191913',
                          borderColor: '#020202',
                          color: '#edcda2'
                        }}
                      >
                        <option value="">Seleccionar</option>
                        {tiposGasto.map(tipo => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                        Valor
                      </label>
                      <input
                        type="number"
                        name="valor"
                        value={formData.valor}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                        style={{
                          backgroundColor: '#191913',
                          borderColor: '#020202',
                          color: '#edcda2'
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                        Tipo Doc.
                      </label>
                      <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                        style={{
                          backgroundColor: '#191913',
                          borderColor: '#020202',
                          color: '#edcda2'
                        }}
                      >
                        <option value="">Seleccionar</option>
                        {tiposDocumento.map(tipo => (
                          <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                        Número
                      </label>
                      <input
                        type="text"
                        name="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                        style={{
                          backgroundColor: '#191913',
                          borderColor: '#020202',
                          color: '#edcda2'
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#c9b977' }}>
                        Conductor
                      </label>
                      <input
                        type="text"
                        name="conductor"
                        value={formData.conductor}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-1 text-sm border rounded focus:outline-none"
                        style={{
                          backgroundColor: '#191913',
                          borderColor: '#020202',
                          color: '#edcda2'
                        }}
                      />
                    </div>
                  </>
                )}

                <div>
                  <button
                    type="submit"
                    className="w-full px-3 py-1 text-sm rounded transition-colors"
                    style={{
                      backgroundColor: '#c9b977',
                      color: '#020202'
                    }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Controls */}
          <div className="p-3 flex flex-col sm:flex-row gap-2 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#c9b977' }} />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1 text-sm border rounded focus:outline-none"
                  style={{
                    backgroundColor: '#373739',
                    borderColor: '#020202',
                    color: '#edcda2'
                  }}
                />
              </div>

              {/* Filtro */}
              <div className="relative">
                <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#c9b977' }} />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-8 pr-6 py-1 text-sm border rounded appearance-none focus:outline-none"
                  style={{
                    backgroundColor: '#373739',
                    borderColor: '#020202',
                    color: '#edcda2'
                  }}
                >
                  <option value="">Todos</option>
                  {activeTab === 'gastos'
                    ? tiposGasto.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))
                    : tiposDocumento.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="text-xs" style={{ color: '#edcda2' }}>
              {datosFiltrados.length} registros
            </div>
          </div>
        </div>

        {/* Tabla Compacta */}
        <div className="rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: '#191913' }}>
          {datosFiltrados.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2" style={{ color: '#c9b977' }}>
                {activeTab === 'gastos' ? <Receipt /> : <FileText />}
              </div>
              <h3 className="text-sm font-medium mb-1" style={{ color: '#c9b977' }}>
                No hay registros
              </h3>
              <p className="text-xs" style={{ color: '#edcda2' }}>
                Agrega tu primer {activeTab === 'gastos' ? 'gasto' : 'documento'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 border-b" style={{ backgroundColor: '#020202', borderColor: '#373739' }}>
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                      Fecha
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                      Nombre
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                      Tipo
                    </th>
                    {activeTab === 'gastos' ? (
                      <th className="px-3 py-2 text-left text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                        Valor
                      </th>
                    ) : (
                      <>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                          Número
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                          Conductor
                        </th>
                      </>
                    )}
                    <th className="px-3 py-2 text-center text-xs font-medium uppercase" style={{ color: '#c9b977' }}>
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ backgroundColor: '#191913', divideColor: '#373739' }}>
                  {datosFiltrados.map((item) => (
                    <tr key={item.id} className="hover:bg-opacity-50 transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#373739'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td className="px-3 py-2 text-xs" style={{ color: '#edcda2' }}>
                        {new Date(item.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit' })}
                      </td>
                      <td className="px-3 py-2 text-xs font-medium" style={{ color: '#edcda2' }}>
                        {item.nombre.length > 20 ? item.nombre.substring(0, 20) + '...' : item.nombre}
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: '#c9b977', color: '#020202' }}>
                          {(item.tipoGasto || tiposDocumento.find(t => t.value === item.tipoDocumento)?.label)?.substring(0, 8)}
                        </span>
                      </td>
                      {activeTab === 'gastos' ? (
                        <td className="px-3 py-2 text-xs font-bold" style={{ color: '#c9b977' }}>
                          ${new Intl.NumberFormat('es-CO').format(item.valor)}
                        </td>
                      ) : (
                        <>
                          <td className="px-3 py-2 text-xs" style={{ color: '#edcda2' }}>
                            {item.numeroDocumento}
                          </td>
                          <td className="px-3 py-2 text-xs" style={{ color: '#edcda2' }}>
                            {item.conductor.length > 15 ? item.conductor.substring(0, 15) + '...' : item.conductor}
                          </td>
                        </>
                      )}
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => eliminarRegistro(item.id, item.tipo)}
                          className="transition-colors hover:opacity-70"
                          style={{ color: '#c9b977' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Resumen Compacto */}
        {activeTab === 'gastos' && gastos.length > 0 && (
          <div className="mt-4 rounded-lg shadow-lg p-3" style={{ backgroundColor: '#373739' }}>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold" style={{ color: '#c9b977' }}>
                  {gastos.length}
                </div>
                <div className="text-xs" style={{ color: '#edcda2' }}>Registros</div>
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: '#c9b977' }}>
                  ${new Intl.NumberFormat('es-CO').format(gastos.reduce((sum, gasto) => sum + Number(gasto.valor), 0))}
                </div>
                <div className="text-xs" style={{ color: '#edcda2' }}>Total</div>
              </div>
              <div>
                <div className="text-lg font-bold" style={{ color: '#c9b977' }}>
                  ${new Intl.NumberFormat('es-CO').format(Math.round(gastos.reduce((sum, gasto) => sum + Number(gasto.valor), 0) / gastos.length))}
                </div>
                <div className="text-xs" style={{ color: '#edcda2' }}>Promedio</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseManagementSystem;