import React, { useState, useEffect, useCallback } from 'react';

// Estilos constantes para evitar re-renderizados
const styles = {
  background: { backgroundColor: '#373739' },
  card: { backgroundColor: '#191913', borderColor: '#020202' },
  input: { backgroundColor: '#020202', color: '#ecdda2', borderColor: '#ecdda2' },
  button: { backgroundColor: '#c9b977' },
  buttonSecondary: { backgroundColor: '#020202', color: '#ecdda2', borderColor: '#373739' },
  textPrimary: { color: '#c9b977' },
  textSecondary: { color: '#ecdda2' }
};

// Funciones utilitarias para localStorage
const STORAGE_KEY = 'papeleria_pedidos';

const cargarPedidos = () => {
  try {
    const pedidosGuardados = localStorage.getItem(STORAGE_KEY);
    return pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
  } catch (error) {
    console.error('Error al cargar pedidos:', error);
    return [];
  }
};

const guardarPedidos = (pedidos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
    console.log('Pedidos guardados exitosamente:', pedidos.length);
  } catch (error) {
    console.error('Error al guardar pedidos:', error);
  }
};

// Componente de lista de pedidos
const VistaLista = ({ pedidos, filtroFecha, setFiltroFecha, setVistaActual, setPedidoSeleccionado, eliminarPedido }) => {
  const pedidosFiltrados = pedidos.filter(pedido => {
    if (!filtroFecha) return true;
    // Buscar tanto en la fecha formateada como en la fecha original
    return pedido.fecha.includes(filtroFecha) || (pedido.fechaOriginal && pedido.fechaOriginal.includes(filtroFecha));
  });

  return (
    <div className="min-h-screen p-5" style={styles.background}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4" style={styles.textPrimary}>
          Sistema de Gestión de Pedidos de Papelería
        </h1>
        
        {/* Aviso sobre localStorage */}
        <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: '#191913', borderColor: '#c9b977' }}>
          <p className="text-sm text-center" style={{ color: '#c9b977' }}>
            💾 <strong>Datos Persistentes:</strong> Los pedidos se guardan automáticamente en tu navegador. 
            Tienes {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''} guardado{pedidos.length !== 1 ? 's' : ''}.
          </p>
        </div>
        
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => setVistaActual('nuevo')}
            className="px-6 py-3 rounded-lg font-bold text-black cursor-pointer hover:opacity-90 transition-opacity"
            style={styles.button}
          >
            Nuevo Pedido
          </button>
          
          <input
            type="text"
            placeholder="Filtrar por fecha (dd/mm/aaaa)"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="flex-1 min-w-64 px-3 py-2 rounded-lg border"
            style={{ 
              backgroundColor: '#191913', 
              color: '#ecdda2',
              borderColor: '#ecdda2'
            }}
          />
        </div>

        {pedidosFiltrados.length === 0 ? (
          <div 
            className="p-10 rounded-xl text-center"
            style={{ ...styles.card, ...styles.textSecondary }}
          >
            <p className="text-lg">
              {filtroFecha ? 'No hay pedidos que coincidan con el filtro' : 'No hay pedidos registrados'}
            </p>
            {filtroFecha && (
              <button
                onClick={() => setFiltroFecha('')}
                className="mt-3 px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                style={styles.buttonSecondary}
              >
                Limpiar filtro
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {pedidosFiltrados.map(pedido => (
              <div
                key={pedido.id}
                className="p-5 rounded-xl border flex justify-between items-center flex-wrap gap-3"
                style={styles.card}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={styles.textPrimary}>
                    Pedido #{pedido.id}
                  </h3>
                  <p className="mb-1" style={styles.textSecondary}>
                    Fecha: {pedido.fecha}
                  </p>
                  <p className="mb-1" style={styles.textSecondary}>
                    Productos: {pedido.productos.length}
                  </p>
                  <p className="font-bold" style={styles.textSecondary}>
                    Total: ${pedido.total.toLocaleString()}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setPedidoSeleccionado(pedido);
                      setVistaActual('detalle');
                    }}
                    className="px-4 py-2 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                    style={styles.buttonSecondary}
                  >
                    Ver Detalle
                  </button>
                  
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
                        eliminarPedido(pedido.id);
                      }
                    }}
                    className="px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity text-black font-medium"
                    style={styles.button}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de nuevo pedido
const VistaNuevoPedido = ({ 
  productos, 
  conceptoActual, 
  cantidadActual, 
  totalPedido,
  setConceptoActual,
  setCantidadActual,
  setTotalPedido,
  agregarProducto,
  eliminarProducto,
  guardarPedido,
  setVistaActual
}) => {
  // Manejar Enter en los campos de entrada
  const manejarEnter = (e, accion) => {
    if (e.key === 'Enter') {
      accion();
    }
  };

  return (
    <div className="min-h-screen p-5" style={styles.background}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8" style={styles.textPrimary}>
          Nuevo Pedido
        </h2>
        
        <div 
          className="p-8 rounded-xl border"
          style={styles.card}
        >
          <h3 className="text-lg font-semibold mb-5" style={styles.textSecondary}>
            Agregar Productos
          </h3>
          
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Concepto (ej: esferos, resmas de papel)"
              value={conceptoActual}
              onChange={(e) => setConceptoActual(e.target.value)}
              onKeyPress={(e) => manejarEnter(e, () => document.getElementById('cantidad-input').focus())}
              className="w-full px-3 py-3 rounded-lg border"
              style={styles.input}
            />
            
            <input
              id="cantidad-input"
              type="number"
              placeholder="Cantidad"
              value={cantidadActual}
              onChange={(e) => setCantidadActual(e.target.value)}
              onKeyPress={(e) => manejarEnter(e, agregarProducto)}
              className="w-full px-3 py-3 rounded-lg border"
              style={styles.input}
            />
            
            <button
              onClick={agregarProducto}
              disabled={!conceptoActual.trim() || !cantidadActual.trim()}
              className={`w-full py-3 rounded-lg font-bold text-black transition-opacity ${
                !conceptoActual.trim() || !cantidadActual.trim() 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer hover:opacity-90'
              }`}
              style={{ 
                backgroundColor: !conceptoActual.trim() || !cantidadActual.trim() ? '#555' : '#c9b977' 
              }}
            >
              Agregar Producto
            </button>
          </div>

          {productos.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3" style={styles.textSecondary}>
                Productos agregados: ({productos.length})
              </h4>
              <div className="space-y-2">
                {productos.map(producto => (
                  <div
                    key={producto.id}
                    className="p-3 rounded-lg flex justify-between items-center"
                    style={{ backgroundColor: '#020202' }}
                  >
                    <span style={styles.textSecondary}>
                      {producto.concepto} - Cantidad: {producto.cantidad}
                    </span>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="px-3 py-1 rounded text-xs font-medium text-black cursor-pointer hover:opacity-90 transition-opacity"
                      style={styles.button}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <input
              type="number"
              placeholder="Total del pedido ($)"
              value={totalPedido}
              onChange={(e) => setTotalPedido(e.target.value)}
              onKeyPress={(e) => manejarEnter(e, guardarPedido)}
              className="w-full px-3 py-3 rounded-lg border"
              style={styles.input}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setVistaActual('lista')}
              className="flex-1 py-3 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
              style={styles.buttonSecondary}
            >
              Cancelar
            </button>
            
            <button
              onClick={guardarPedido}
              disabled={productos.length === 0 || !totalPedido.trim()}
              className={`flex-1 py-3 rounded-lg font-bold text-black transition-opacity ${
                productos.length === 0 || !totalPedido.trim() 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer hover:opacity-90'
              }`}
              style={{ 
                backgroundColor: productos.length === 0 || !totalPedido.trim() ? '#555' : '#c9b977' 
              }}
            >
              Guardar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de detalle del pedido
const VistaDetalle = ({ pedidoSeleccionado, setVistaActual }) => {
  if (!pedidoSeleccionado) {
    return (
      <div className="min-h-screen p-5" style={styles.background}>
        <div className="max-w-2xl mx-auto">
          <p style={styles.textSecondary}>Error: No se encontró el pedido seleccionado.</p>
          <button
            onClick={() => setVistaActual('lista')}
            className="mt-4 px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            style={styles.button}
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5" style={styles.background}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8" style={styles.textPrimary}>
          Detalle del Pedido #{pedidoSeleccionado.id}
        </h2>
        
        <div 
          className="p-8 rounded-xl border"
          style={styles.card}
        >
          <div className="mb-6">
            <p className="mb-3" style={styles.textSecondary}>
              <span className="font-semibold">Fecha:</span> {pedidoSeleccionado.fecha}
            </p>
            <p className="mb-6" style={styles.textSecondary}>
              <span className="font-semibold">Total:</span> ${pedidoSeleccionado.total.toLocaleString()}
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-4" style={styles.textPrimary}>
            Productos ({pedidoSeleccionado.productos.length}):
          </h3>
          
          <div className="space-y-3 mb-6">
            {pedidoSeleccionado.productos.map((producto, index) => (
              <div
                key={producto.id}
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#020202' }}
              >
                <p className="font-medium" style={styles.textSecondary}>
                  <span className="font-bold">{index + 1}.</span> {producto.concepto}
                </p>
                <p className="text-sm mt-1" style={styles.textSecondary}>
                  Cantidad: {producto.cantidad}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setVistaActual('lista')}
            className="w-full py-3 rounded-lg font-bold text-black cursor-pointer hover:opacity-90 transition-opacity"
            style={styles.button}
          >
            Volver al Historial
          </button>
        </div>
      </div>
    </div>
  );
};

const PapeleriaSystem = () => {
  // Estados principales - Inicializar pedidos desde localStorage inmediatamente
  const [pedidos, setPedidos] = useState(() => cargarPedidos());
  const [vistaActual, setVistaActual] = useState('lista');
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState('');

  // Estados para el formulario de nuevo pedido
  const [productos, setProductos] = useState([]);
  const [conceptoActual, setConceptoActual] = useState('');
  const [cantidadActual, setCantidadActual] = useState('');
  const [totalPedido, setTotalPedido] = useState('');

  // ✅ Guardar automáticamente cada vez que se actualicen los pedidos
  useEffect(() => {
    console.log('Actualizando localStorage con', pedidos.length, 'pedidos');
    guardarPedidos(pedidos);
  }, [pedidos]);

  // Función para generar ID único
  const generarId = useCallback(() => {
    return pedidos.length > 0 ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
  }, [pedidos]);

  // Agregar producto al pedido actual
  const agregarProducto = useCallback(() => {
    if (conceptoActual.trim() && cantidadActual.trim() && parseInt(cantidadActual) > 0) {
      const nuevoProducto = {
        id: Date.now(),
        concepto: conceptoActual.trim(),
        cantidad: parseInt(cantidadActual)
      };
      setProductos(prev => [...prev, nuevoProducto]);
      setConceptoActual('');
      setCantidadActual('');
      
      // Enfocar el siguiente campo
      setTimeout(() => {
        const conceptoInput = document.querySelector('input[placeholder*="Concepto"]');
        if (conceptoInput) conceptoInput.focus();
      }, 100);
    }
  }, [conceptoActual, cantidadActual]);

  // Eliminar producto del pedido actual
  const eliminarProducto = useCallback((id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  }, []);

  // Guardar pedido
  const guardarPedido = useCallback(() => {
    if (productos.length > 0 && totalPedido.trim() && parseFloat(totalPedido) > 0) {
      const ahora = new Date();
      const fechaFormateada = ahora.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const nuevoPedido = {
        id: generarId(),
        fecha: fechaFormateada,
        fechaOriginal: ahora.toISOString(), // Para búsquedas más precisas
        productos: [...productos],
        total: parseFloat(totalPedido)
      };
      
      console.log('Guardando nuevo pedido:', nuevoPedido);
      setPedidos(prev => {
        const nuevosPedidos = [...prev, nuevoPedido];
        console.log('Total pedidos después de guardar:', nuevosPedidos.length);
        return nuevosPedidos;
      });
      
      // Limpiar formulario
      setProductos([]);
      setConceptoActual('');
      setCantidadActual('');
      setTotalPedido('');
      setVistaActual('lista');
      
      // Mostrar confirmación
      setTimeout(() => {
        alert('¡Pedido guardado exitosamente!');
      }, 100);
    }
  }, [productos, totalPedido, generarId]);

  // Eliminar pedido
  const eliminarPedido = useCallback((id) => {
    console.log('Eliminando pedido con ID:', id);
    setPedidos(prev => {
      const pedidosActualizados = prev.filter(p => p.id !== id);
      console.log('Pedidos restantes:', pedidosActualizados.length);
      return pedidosActualizados;
    });
  }, []);

  // Debug: Mostrar estado actual en consola
  useEffect(() => {
    console.log('Estado actual del sistema:');
    console.log('- Vista actual:', vistaActual);
    console.log('- Total pedidos:', pedidos.length);
    console.log('- Productos en formulario:', productos.length);
  }, [vistaActual, pedidos.length, productos.length]);

  // Renderizar vista según estado
  switch (vistaActual) {
    case 'nuevo':
      return (
        <VistaNuevoPedido
          productos={productos}
          conceptoActual={conceptoActual}
          cantidadActual={cantidadActual}
          totalPedido={totalPedido}
          setConceptoActual={setConceptoActual}
          setCantidadActual={setCantidadActual}
          setTotalPedido={setTotalPedido}
          agregarProducto={agregarProducto}
          eliminarProducto={eliminarProducto}
          guardarPedido={guardarPedido}
          setVistaActual={setVistaActual}
        />
      );
    case 'detalle':
      return (
        <VistaDetalle
          pedidoSeleccionado={pedidoSeleccionado}
          setVistaActual={setVistaActual}
        />
      );
    default:
      return (
        <VistaLista
          pedidos={pedidos}
          filtroFecha={filtroFecha}
          setFiltroFecha={setFiltroFecha}
          setVistaActual={setVistaActual}
          setPedidoSeleccionado={setPedidoSeleccionado}
          eliminarPedido={eliminarPedido}
        />
      );
  }
};

export default PapeleriaSystem;