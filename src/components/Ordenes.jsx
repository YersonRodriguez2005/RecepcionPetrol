import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, RefreshCw, AlertCircle } from 'lucide-react';

export default function OrdenCompraApp() {
  // ⚙️ CONFIGURACIÓN JSONBIN - REEMPLAZA ESTOS VALORES
  const API_KEY = '$2a$10$wxOMnJE1K1Q0cMXXM7WFDusZJzNFjwMsXDF.dVSrWbIpjRnN396YC'; // Reemplazar con tu API Key
  const BIN_ID = '68effbc543b1c97be96a20f2'; // Reemplazar con tu Bin ID
  const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const [ordenes, setOrdenes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [ordenEditando, setOrdenEditando] = useState(null);
  const [formData, setFormData] = useState({
    numeroOrden: '',
    descripcion: '',
    estado: 'Pendiente'
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [sincronizando, setSincronizando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState('');

  // Cargar órdenes al iniciar
  useEffect(() => {
    cargarOrdenes();
  }, []);

  // Función para cargar órdenes desde JSONBin
  const cargarOrdenes = async () => {
    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrdenes(data.record.ordenes || []);
        mostrarMensaje('Datos cargados correctamente', 'success');
      } else {
        throw new Error('Error al cargar datos');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('No se pudieron cargar las órdenes. Verifica tu configuración de JSONBin.');
      setOrdenes([]);
    } finally {
      setCargando(false);
    }
  };

  // Función para guardar órdenes en JSONBin
  const guardarOrdenesEnNube = async (nuevasOrdenes) => {
    try {
      setSincronizando(true);
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ ordenes: nuevasOrdenes })
      });

      if (response.ok) {
        mostrarMensaje('Guardado en la nube ✓', 'success');
        return true;
      } else {
        throw new Error('Error al guardar');
      }
    } catch (err) {
      console.error('Error:', err);
      mostrarMensaje('Error al guardar en la nube', 'error');
      return false;
    } finally {
      setSincronizando(false);
    }
  };

  const mostrarMensaje = (mensaje, tipo) => {
    setMensajeEstado({ texto: mensaje, tipo });
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const validarNumeroOrden = (numero, idActual = null) => {
    return ordenes.some(orden =>
      orden.numeroOrden === numero && orden.id !== idActual
    );
  };

  const agregarOrden = async () => {
    if (!formData.numeroOrden.trim()) {
      setError('El número de orden es obligatorio');
      return;
    }

    if (validarNumeroOrden(formData.numeroOrden)) {
      setError('El número de orden ya existe');
      return;
    }

    const nuevaOrden = {
      id: Date.now(),
      numeroOrden: formData.numeroOrden.trim(),
      descripcion: formData.descripcion.trim(),
      estado: formData.estado,
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString()
    };

    const nuevasOrdenes = [nuevaOrden, ...ordenes];
    setOrdenes(nuevasOrdenes);
    await guardarOrdenesEnNube(nuevasOrdenes);
    resetFormulario();
  };

  const actualizarOrden = async () => {
    if (!formData.numeroOrden.trim()) {
      setError('El número de orden es obligatorio');
      return;
    }

    if (validarNumeroOrden(formData.numeroOrden, ordenEditando.id)) {
      setError('El número de orden ya existe');
      return;
    }

    const nuevasOrdenes = ordenes.map(orden =>
      orden.id === ordenEditando.id
        ? {
          ...orden,
          numeroOrden: formData.numeroOrden.trim(),
          descripcion: formData.descripcion.trim(),
          estado: formData.estado,
          fechaModificacion: new Date().toISOString()
        }
        : orden
    );

    setOrdenes(nuevasOrdenes);
    await guardarOrdenesEnNube(nuevasOrdenes);
    resetFormulario();
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    const nuevasOrdenes = ordenes.map(orden =>
      orden.id === id
        ? { ...orden, estado: nuevoEstado, fechaModificacion: new Date().toISOString() }
        : orden
    );
    setOrdenes(nuevasOrdenes);
    await guardarOrdenesEnNube(nuevasOrdenes);
  };

  const eliminarOrden = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta orden?')) {
      const nuevasOrdenes = ordenes.filter(orden => orden.id !== id);
      setOrdenes(nuevasOrdenes);
      await guardarOrdenesEnNube(nuevasOrdenes);
    }
  };

  const iniciarEdicion = (orden) => {
    setOrdenEditando(orden);
    setFormData({
      numeroOrden: orden.numeroOrden,
      descripcion: orden.descripcion,
      estado: orden.estado
    });
    setMostrarFormulario(true);
    setError('');
  };

  const resetFormulario = () => {
    setFormData({ numeroOrden: '', descripcion: '', estado: 'Pendiente' });
    setMostrarFormulario(false);
    setOrdenEditando(null);
    setError('');
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getColorEstado = (estado) => {
    const colores = {
      Pendiente: 'bg-yellow-100 text-yellow-800',
      Aprobada: 'bg-green-100 text-green-800',
      Anulada: 'bg-red-100 text-red-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Mensaje de estado */}
        {mensajeEstado && (
          <div className={`mb-4 p-3 rounded-lg ${mensajeEstado.tipo === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
            {mensajeEstado.texto}
          </div>
        )}

        {/* Advertencia de configuración */}
        {(BIN_ID === 'TU_BIN_ID_AQUI' || API_KEY.includes('TU_API_KEY')) && (
          <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex items-start">
              <AlertCircle className="text-yellow-600 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800">Configuración Pendiente</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Debes configurar tu API_KEY y BIN_ID de JSONBin.io en el código.
                  <br />
                  <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer"
                    className="underline font-medium">
                    Crear cuenta en JSONBin.io
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Gestión de Órdenes de Compra</h1>
              <p className="text-sm text-gray-500 mt-1">
                {sincronizando ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="animate-spin" size={14} />
                    Sincronizando...
                  </span>
                ) : (
                  '☁️ Datos sincronizados en la nube'
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={cargarOrdenes}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300"
                disabled={sincronizando}
              >
                <RefreshCw size={18} />
                Recargar
              </button>
              {!mostrarFormulario && (
                <button
                  onClick={() => setMostrarFormulario(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Nueva Orden
                </button>
              )}
            </div>
          </div>

          {mostrarFormulario && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {ordenEditando ? 'Editar Orden' : 'Nueva Orden de Compra'}
              </h2>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Orden *
                  </label>
                  <input
                    type="text"
                    value={formData.numeroOrden}
                    onChange={(e) => setFormData({ ...formData, numeroOrden: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: OC-2025-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobada">Aprobada</option>
                    <option value="Anulada">Anulada</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción / Concepto
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe los detalles de la orden..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={ordenEditando ? actualizarOrden : agregarOrden}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                  disabled={sincronizando}
                >
                  <Check size={18} />
                  {ordenEditando ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                  onClick={resetFormulario}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-400"
                >
                  <X size={18} />
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600 mb-4">
            Total de órdenes: <span className="font-semibold">{ordenes.length}</span>
          </div>
        </div>

        {ordenes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No hay órdenes registradas</p>
            <p className="text-gray-400 text-sm mt-2">Comienza creando una nueva orden de compra</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">N° Orden</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Descripción</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Creación</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ordenes.map((orden) => (
                    <tr key={orden.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {orden.numeroOrden}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {orden.descripcion || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={orden.estado}
                          onChange={(e) => cambiarEstado(orden.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getColorEstado(orden.estado)} border-0 cursor-pointer`}
                          disabled={sincronizando}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Aprobada">Aprobada</option>
                          <option value="Anulada">Anulada</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatearFecha(orden.fechaCreacion)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => iniciarEdicion(orden)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            title="Editar"
                            disabled={sincronizando}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => eliminarOrden(orden.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Eliminar"
                            disabled={sincronizando}
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
          </div>
        )}
      </div>
    </div>
  );
}