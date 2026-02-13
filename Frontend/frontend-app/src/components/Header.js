import React from 'react';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link

const Header = () => {
  const { isAuthenticated, isAdminUser, logout } = useAuth(); // Destructure isAdminUser

  return (
    <header className="header">
      <nav className="navbar">
        <Link to={isAuthenticated ? "/home" : "/"} className="logo">eLibrary</Link>
        <ul className="nav-links">
          {isAuthenticated && (
            <>
              <li><Link to="/home">Home</Link></li>
              {isAdminUser && ( // Conditionally render Manage button for admins
                <li>
                  <Link to="/admin/manage" className="manage-button">Manage</Link>
                </li>
              )}
              <li>
                <button onClick={logout} className="logout-button">Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;