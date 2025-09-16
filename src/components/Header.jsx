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
    { name: 'Pedidos', path: '/pedidos' }
  ];

  return (
    <header 
      className="text-white p-4 shadow-lg"
      style={{ 
        backgroundColor: '#373739',
        borderBottom: '3px solid #c9b977'
      }}
    >
      <div className="flex justify-between items-center">
        {/* Navegación principal */}
        <nav className="flex gap-3 flex-wrap">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                location.pathname === link.path
                  ? 'text-black font-bold shadow-md transform scale-105'
                  : 'hover:bg-opacity-80 hover:shadow-md'
              }`}
              style={
                location.pathname === link.path
                  ? { backgroundColor: '#c9b977' }
                  : { 
                      backgroundColor: '#191913', 
                      color: '#ecdda2',
                      border: '1px solid #020202'
                    }
              }
              onMouseEnter={(e) => {
                if (location.pathname !== link.path) {
                  e.target.style.backgroundColor = '#020202';
                  e.target.style.borderColor = '#c9b977';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== link.path) {
                  e.target.style.backgroundColor = '#191913';
                  e.target.style.borderColor = '#020202';
                }
              }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Checklist de radicación */}
        <div className="ml-4">
          <ChecklistRadicacion />
        </div>
      </div>
      
      {/* Línea decorativa inferior */}
      <div 
        className="mt-3 h-1 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #c9b977 0%, #ecdda2 50%, #c9b977 100%)'
        }}
      ></div>
    </header>
  );
};

export default Header;