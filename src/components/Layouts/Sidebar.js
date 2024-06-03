import React from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CSidebarHeader,
  CBadge,
  CNavGroup,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilCloudDownload, cilLayers } from '@coreui/icons';
import { MdCategory } from "react-icons/md";
import { Space } from 'antd';
import { TbBrandAppgallery } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { TiShoppingCart } from "react-icons/ti";
import { useHistory } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";



const Sidebar = () => {
  const history = useHistory();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <CSidebar className="border-end">
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>CoreUI</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href="/"><CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard</CNavItem>
        <CNavItem href="/categories">
          <Space>
            <MdCategory /> Category 
          </Space>
        </CNavItem>
        <CNavItem href="/brands">
          <Space>
            <TbBrandAppgallery /> Brand 
          </Space>
        </CNavItem>
        <CNavItem href="/products">
          <Space>
            <TiShoppingCart /> Product 
          </Space>
        </CNavItem>
        <CNavItem href="/profile">
          <Space>
            <TbBrandAppgallery /> Profile <CBadge color="primary ms-auto">NEW</CBadge>
          </Space>
        </CNavItem>
        <CNavGroup
          toggler={
            <Space>
              <IoSettings /> Setting
            </Space>
          }
        >
          <CNavItem href="/user/profile"> 
            <Space>
              <FaRegUser/> Profile
            </Space>
          </CNavItem>
          <CNavItem href='#' onClick={handleLogout}>
            <span className="nav-icon"><span className="nav-icon-bullet"></span></span> Log out
          </CNavItem>
        </CNavGroup>
        <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI</CNavItem>
        <CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO</CNavItem>
      </CSidebarNav>
      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  );
};

export default Sidebar;
