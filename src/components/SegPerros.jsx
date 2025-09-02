import React, { useState, useEffect } from 'react';
import { Calendar, PlusCircle, Trash2, Dog, DollarSign } from 'lucide-react';

const TablaComidaPerros = () => {
  const [registros, setRegistros] = useState([]);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    fecha: new Date().toISOString().split('T')[0],
    valorFactura: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar registros del almacenamiento al iniciar
  useEffect(() => {
    const registrosGuardados = JSON.parse(localStorage.getItem('registrosComidaPerros') || '[]');
    setRegistros(registrosGuardados);
  }, []);

  // Guardar registros en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('registrosComidaPerros', JSON.stringify(registros));
  }, [registros]);

  const agregarRegistro = () => {
    if (!nuevoRegistro.fecha || !nuevoRegistro.valorFactura) {
      alert('Por favor completa la fecha y el valor de la factura');
      return;
    }

    if (isNaN(nuevoRegistro.valorFactura) || parseFloat(nuevoRegistro.valorFactura) <= 0) {
      alert('Por favor ingresa un valor válido para la factura');
      return;
    }

    const registro = {
      id: Date.now(),
      fecha: nuevoRegistro.fecha,
      valorFactura: parseFloat(nuevoRegistro.valorFactura),
      fechaCreacion: new Date().toISOString()
    };

    setRegistros(prev => [registro, ...prev].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    setNuevoRegistro({
      fecha: new Date().toISOString().split('T')[0],
      valorFactura: ''
    });
    setMostrarFormulario(false);
  };

  const eliminarRegistro = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este registro?')) {
      setRegistros(prev => prev.filter(registro => registro.id !== id));
    }
  };

  const formatearFecha = (fecha) => {
    // Crear fecha local para evitar problemas de zona horaria
    const [year, month, day] = fecha.split('-');
    const fechaLocal = new Date(year, month - 1, day);
    return fechaLocal.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  };

  const calcularDiasDesdeUltima = (fecha) => {
    const hoy = new Date();
    // Crear fecha local para evitar problemas de zona horaria
    const [year, month, day] = fecha.split('-');
    const fechaRegistro = new Date(year, month - 1, day);
    const diferencia = Math.floor((hoy - fechaRegistro) / (1000 * 60 * 60 * 24));
    return diferencia;
  };

  const obtenerColorEstado = (dias) => {
    if (dias <= 7) return 'text-green-600 bg-green-50';
    if (dias <= 14) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const ultimaCompra = registros.length > 0 ? registros[0] : null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header con estadísticas */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Dog className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Control de Comida para Perros</h1>
        </div>
        
        {ultimaCompra && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Estado Actual</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-600">Última compra</p>
                <p className="font-bold text-lg">{formatearFecha(ultimaCompra.fecha)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Hace</p>
                <p className={`font-bold text-lg px-3 py-1 rounded-full ${obtenerColorEstado(calcularDiasDesdeUltima(ultimaCompra.fecha))}`}>
                  {calcularDiasDesdeUltima(ultimaCompra.fecha)} días
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Último valor</p>
                <p className="font-bold text-lg text-green-600">{formatearMoneda(ultimaCompra.valorFactura)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botón para agregar nuevo registro */}
      <div className="mb-6">
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Nueva Compra
        </button>
      </div>

      {/* Formulario para nuevo registro */}
      {mostrarFormulario && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Registrar Nueva Compra</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de compra *
              </label>
              <input
                type="date"
                value={nuevoRegistro.fecha}
                onChange={(e) => setNuevoRegistro({...nuevoRegistro, fecha: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor de la factura *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={nuevoRegistro.valorFactura}
                  onChange={(e) => setNuevoRegistro({...nuevoRegistro, valorFactura: e.target.value})}
                  placeholder="50000"
                  min="0"
                  step="1000"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ingresa el valor en pesos colombianos</p>
            </div>
            
            <div className="md:col-span-2 flex gap-3">
              <button
                onClick={agregarRegistro}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Guardar Registro
              </button>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de registros */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Compra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Días Transcurridos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registros.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No hay registros de compras. Agrega el primer registro.
                  </td>
                </tr>
              ) : (
                registros.map((registro) => (
                  <tr key={registro.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium">{formatearFecha(registro.fecha)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                        <span className="font-bold text-green-600">
                          {formatearMoneda(registro.valorFactura)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${obtenerColorEstado(calcularDiasDesdeUltima(registro.fecha))}`}>
                        {calcularDiasDesdeUltima(registro.fecha)} días
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => eliminarRegistro(registro.id)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas adicionales */}
      {registros.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3">Estadísticas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-600">Total compras</p>
              <p className="text-2xl font-bold text-blue-600">{registros.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Gasto total</p>
              <p className="text-2xl font-bold text-green-600">
                {formatearMoneda(registros.reduce((total, registro) => total + registro.valorFactura, 0))}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Promedio por compra</p>
              <p className="text-2xl font-bold text-orange-600">
                {formatearMoneda(registros.reduce((total, registro) => total + registro.valorFactura, 0) / registros.length)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Días desde última</p>
              <p className={`text-2xl font-bold ${calcularDiasDesdeUltima(ultimaCompra.fecha) > 14 ? 'text-red-600' : 'text-blue-600'}`}>
                {calcularDiasDesdeUltima(ultimaCompra.fecha)} días
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaComidaPerros;