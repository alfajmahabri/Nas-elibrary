import React, { createContext, useState, useContext, useEffect } from 'react';
import { decodeToken, getUserRole, isAdmin } from '../utils/jwt'; // Import JWT utilities

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('jwtToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const [userRole, setUserRole] = useState(null); // New state for user role
  const [isAdminUser, setIsAdminUser] = useState(false); // New state for admin status

  // Effect to re-evaluate auth status and role if authToken changes
  useEffect(() => {
    console.log("AuthContext useEffect triggered. authToken:", authToken);
    if (authToken) {
      setIsAuthenticated(true);
      const role = getUserRole(authToken);
      setUserRole(role);
      setIsAdminUser(isAdmin(authToken));
      console.log("AuthContext: isAuthenticated =", true, ", userRole =", role, ", isAdminUser =", isAdmin(authToken));
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
      setIsAdminUser(false);
      console.log("AuthContext: User is not authenticated.");
    }
  }, [authToken]);


  const login = (token) => {
    console.log("AuthContext login function called with token:", token);
    localStorage.setItem('jwtToken', token);
    setAuthToken(token); // This will trigger the useEffect
    // Role and admin status will be set by the useEffect now
  };

  const logout = () => {
    console.log("AuthContext logout function called.");
    localStorage.removeItem('jwtToken');
    setAuthToken(null);
    // Role and admin status will be cleared by the useEffect now
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, userRole, isAdminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
