// client/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('token');
  setToken(null); // Clear token in App.js
  navigate('/');
};


  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded mt-4"
    >
      Logout
    </button>
  );
};

export default Logout;
