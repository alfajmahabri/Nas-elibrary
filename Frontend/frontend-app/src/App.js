import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './pages/LandingPage';
import BookViewer from './components/BookViewer';
import AdminLogin from './components/AdminLogin';
import AdminManage from './pages/AdminManage'; // Import AdminManage
import { useAuth } from './context/AuthContext';
import './App.css'; // Keep App.css for global styles

function App() {
  const { isAuthenticated, isAdminUser } = useAuth(); // Get isAdminUser

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register />} />
          <Route path="/admin/login" element={isAuthenticated ? <Navigate to="/home" /> : <AdminLogin />} /> {/* Admin Login Route */}
          
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/book/:id"
            element={isAuthenticated ? <BookViewer /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/manage"
            element={isAuthenticated && isAdminUser ? <AdminManage /> : <Navigate to="/home" />} // Protected Admin Manage Route
          />
          {/* Add other protected routes here if needed */}
          <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all for undefined routes */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;