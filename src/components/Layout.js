// src/components/Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation(); // Get the current route location

  // List of links in the sidebar
  const links = [
    { path: '/', label: 'Home' },
    { path: '/category', label: 'Category' },
    { path: '/expense', label: 'Expense' },

  ];

  return (
    <div style={{ display: 'flex' , height: '100vh'}}>
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          backgroundColor: '#f4f4f4',
          padding: '20px',
          borderRight: '1px solid #ccc',
          boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3>Expense Management System</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {links.map((link) => (
            <li
              key={link.path}
              style={{
                padding: '10px',
                backgroundColor: location.pathname === link.path ? '#ddd' : 'transparent',
              }}
            >
              <Link
                to={link.path}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  display: 'block',
                  padding: '5px 0',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        {children} {/* This will render the page content */}
      </div>
    </div>
  );
};

export default Layout;
