// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Layout } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { ThanklyIcon, ThanklyLogo, LogoMenuItem, StyledMenuItem } = StyledComponents;

const Component = ({ selectedSiderItem }) => {
  console.log(selectedSiderItem)
  const [menuIsCollapsed, setMenuIsCollapsed] = useState(true)

  const onCollapse = collapsed => {
    console.log(collapsed);
    setMenuIsCollapsed(collapsed);
  };

  return (
    <Layout.Sider collapsible collapsed={menuIsCollapsed} onCollapse={onCollapse}>
      <Menu theme="dark" defaultSelectedKeys={[selectedSiderItem]} mode="inline">
        <LogoMenuItem key="logo" disabled>
          <ThanklyIcon />
          <ThanklyLogo />
        </LogoMenuItem>
        <StyledMenuItem key="home">
          <Link to="/company">
            <HomeOutlined />
            <span>Home</span>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem key="settings">
          <Link to="/company/settings">
            <SettingOutlined />
            <span>Settings</span>
          </Link>
        </StyledMenuItem>
      </Menu>
    </Layout.Sider>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;