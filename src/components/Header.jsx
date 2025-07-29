import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const links = [
    { name: 'Conductores', path: '/conductores' },
    { name: 'Precios Dotación', path: '/dotacion' },
    { name: 'Precios Exámenes', path: '/examenes' }
  ];

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="flex gap-4 justify-center">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`px-4 py-2 rounded transition ${
              location.pathname === link.path
                ? 'bg-yellow-500 text-black font-semibold'
                : 'hover:bg-gray-700'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
