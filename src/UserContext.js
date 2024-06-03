import React, { createContext, useContext, useState, useEffect } from 'react';
import { roles } from './roles';
import UserService from './services/UserService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(roles.ADMIN); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setUserRole(roles.ADMIN);
        setLoading(false);
        return;
      }

      try {
        const result = await UserService.getUserProfile(token);
        if (result) {
          setUserRole(result.role);
        } else {
          setUserRole(roles.ADMIN); 
        }
      } catch (err) {
        console.error('Error fetching user role:', err);
        setUserRole(roles.ADMIN); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
