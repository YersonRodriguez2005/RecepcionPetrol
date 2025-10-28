import React, { useState, useEffect } from 'react';
import { Package, User, Building2, Calendar, FileText, Save, RefreshCw, AlertCircle } from 'lucide-react';

const DeliveryManager = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    itemDescription: ''
  });

  const JSONBIN_CONFIG = {
    binId: '6900dabe43b1c97be98778fa',
    apiKey: '$2a$10$wxOMnJE1K1Q0cMXXM7WFDusZJzNFjwMsXDF.dVSrWbIpjRnN396YC',
    baseUrl: 'https://api.jsonbin.io/v3'
  };

  useEffect(() => {
    loadDeliveries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDeliveries = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${JSONBIN_CONFIG.baseUrl}/b/${JSONBIN_CONFIG.binId}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': JSONBIN_CONFIG.apiKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDeliveries(data.record.deliveries || []);
      } else if (response.status === 404) {
        setDeliveries([]);
      } else {
        throw new Error('Error al cargar los datos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor. Verifica tu configuración de JSONBin.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveDeliveries = async (updatedDeliveries) => {
    try {
      const response = await fetch(`${JSONBIN_CONFIG.baseUrl}/b/${JSONBIN_CONFIG.binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_CONFIG.apiKey
        },
        body: JSON.stringify({ deliveries: updatedDeliveries })
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos');
      }

      return true;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.employeeName.trim()) {
      setError('El nombre del empleado es obligatorio');
      return false;
    }
    if (!formData.department.trim()) {
      setError('El área o departamento es obligatorio');
      return false;
    }
    if (!formData.deliveryDate) {
      setError('La fecha de entrega es obligatoria');
      return false;
    }
    if (!formData.itemDescription.trim()) {
      setError('La descripción del elemento es obligatoria');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const newDelivery = {
        id: Date.now().toString(),
        ...formData,
        registrationDate: new Date().toISOString()
      };

      const updatedDeliveries = [...deliveries, newDelivery];
      await saveDeliveries(updatedDeliveries);
      
      setDeliveries(updatedDeliveries);
      setSuccess('¡Entrega registrada exitosamente!');
      
      setFormData({
        employeeName: '',
        department: '',
        deliveryDate: new Date().toISOString().split('T')[0],
        itemDescription: ''
      });

      setTimeout(() => setSuccess(''), 3000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al registrar la entrega. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Sistema de Registro de Entregas
            </h1>
          </div>
          <p className="text-gray-600">
            Control y seguimiento de elementos asignados a empleados
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg flex items-center gap-2">
            <Save className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              Registrar Nueva Entrega
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre del Empleado
                  </div>
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Área o Departamento
                  </div>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Ej: Recursos Humanos"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha de Entrega
                  </div>
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Concepto o Descripción del Elemento
                  </div>
                </label>
                <textarea
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                  placeholder="Ej: Laptop Dell Inspiron 15, mouse inalámbrico, cargador..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Registrar Entrega
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Package className="w-6 h-6 text-indigo-600" />
                Historial de Entregas
              </h2>
              <button
                onClick={loadDeliveries}
                disabled={loading}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                title="Recargar datos"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {loading && deliveries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                Cargando entregas...
              </div>
            ) : deliveries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No hay entregas registradas</p>
                <p className="text-sm">Comienza registrando tu primera entrega</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Empleado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Área
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Elemento
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {deliveries.map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {delivery.employeeName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {delivery.department}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {formatDate(delivery.deliveryDate)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            <div className="max-w-xs truncate" title={delivery.itemDescription}>
                              {delivery.itemDescription}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  Total de entregas: <span className="font-semibold">{deliveries.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Configuración de JSONBin.io</h3>
              <p className="text-sm text-yellow-700 mb-2">
                Para que el sistema funcione, debes configurar tu API Key y Bin ID de JSONBin.io:
              </p>
              <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Crea una cuenta gratuita en <a href="https://jsonbin.io" target="_blank" rel="noopener noreferrer" className="underline">jsonbin.io</a></li>
                <li>Crea un nuevo Bin y copia el Bin ID</li>
                <li>Obtén tu API Key desde tu perfil</li>
                <li>Reemplaza los valores en la constante JSONBIN_CONFIG en el código</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManager;