import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        {auth ? (
          <>
            <Route
              path="*"
              element={
                <div className="app-layout">
                  <Navbar />
                  <hr />
                  <div className="app-content">
                    <Sidebar />
                    <Routes>
                      <Route path="/add" element={<Add url="http://localhost:3000" />} />
                      <Route path="/list" element={<List url="http://localhost:3000" />} />
                      <Route path="/orders" element={<Orders url="http://localhost:3000" />} />
                      <Route path="*" element={<Navigate to="/add" />} />
                    </Routes>
                  </div>
                </div>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
