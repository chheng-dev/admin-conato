// src/components/LogoutButton.js
import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
