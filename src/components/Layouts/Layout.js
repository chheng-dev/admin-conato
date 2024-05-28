import React from 'react';
import { CAvatar, CContainer, CHeader, CHeaderBrand } from '@coreui/react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="c-app c-default-layout">  
      <div className='d-flex justify-content-between'>
        <div className='' style={{ 'width': "20%"}}>
          <Sidebar />
        </div>
        <div className='' style={{ 'width': "80%"}}>
          <div className="content">
            <CHeader>
              <CHeaderBrand>

              </CHeaderBrand>
              <CAvatar color="primary" status="success" className='cusor-pointer'>CHH</CAvatar>
            </CHeader>
            <div className="c-body">
              <CContainer fluid>{children}</CContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
