import React from 'react';
import { useUser } from './UserContext';
import { rolePermissions } from './roles';

const withAuthorization = (WrappedComponent, requiredPermission) => {
  return (props) => {
    const { userRole } = useUser();
    console.log(rolePermissions);
    if (!rolePermissions[userRole].includes(requiredPermission)) {
      return (
        <div class="container text-center body-authorization">
          <div class="row vcenter">
            <div class="col-md-12">
              <div class="error-template">
                <h1 class="oops">Oops!</h1>
                <h2 class="message">403 Permission Denied</h2>
                <div class="error-details">
                  Sorry, you do not have access to this page, please contact your administrator
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
