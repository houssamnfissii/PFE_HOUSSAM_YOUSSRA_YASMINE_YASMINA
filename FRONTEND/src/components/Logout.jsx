import React from 'react';
import axios from 'axios';

function Logout({ onLogout }) {
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout');
      localStorage.removeItem('token');
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
