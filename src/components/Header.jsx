import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ChecklistRadicacion from './Check';

const Header = () => {
  const location = useLocation();
  
  const links = [
    { name: 'Conductores', path: '/conductores' },
    { name: 'Precios Dotación', path: '/dotacion' },
    { name: 'Precios Exámenes', path: '/examenes' },
    { name: 'Comida Perros', path: '/comida-perros' },
    { name: 'Pedidos', path: '/pedidos' },
    { name: 'Relacion', path: '/relacion' },
    { name: 'Ordenes', path: '/ordenes' }
  ];

  const handleMouseEnter = (e, isActive) => {
    if (!isActive) {
      e.target.style.backgroundColor = '#020202';
      e.target.style.borderColor = '#c9b977';
    }
  };

  const handleMouseLeave = (e, isActive) => {
    if (!isActive) {
      e.target.style.backgroundColor = '#191913';
      e.target.style.borderColor = '#020202';
    }
  };

  return (
    <header 
      className="text-white p-4 shadow-lg"
      style={{ 
        backgroundColor: '#373739',
        borderBottom: '3px solid #c9b977'
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Navegación principal */}
          <nav className="flex gap-2 flex-wrap flex-1">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm whitespace-nowrap ${
                    isActive
                      ? 'text-black font-bold shadow-md transform scale-105'
                      : 'hover:bg-opacity-80 hover:shadow-md'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: '#c9b977' }
                      : { 
                          backgroundColor: '#191913', 
                          color: '#ecdda2',
                          border: '1px solid #020202'
                        }
                  }
                  onMouseEnter={(e) => handleMouseEnter(e, isActive)}
                  onMouseLeave={(e) => handleMouseLeave(e, isActive)}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Checklist de radicación */}
          <div className="lg:ml-4">
            <ChecklistRadicacion />
          </div>
        </div>
        
        {/* Línea decorativa inferior */}
        <div 
          className="mt-4 h-1 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #c9b977 0%, #ecdda2 50%, #c9b977 100%)'
          }}
        />
      </div>
    </header>
  );
};

export default Header;