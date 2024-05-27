// src/components/RequireAuth.js
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../auth';

const RequireAuth = (WrappedComponent) => {
  const ComponentWithAuthCheck = (props) => {
    const history = useHistory();

    useEffect(() => {
      if (!isAuthenticated()) {
        history.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthCheck;
};

export default RequireAuth;
