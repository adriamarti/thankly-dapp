// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledSider } = StyledComponents;

const Component = () => {
  const [menuIsCollapsed, setMenuIsCollapsed] = useState(true)

  const onCollapse = collapsed => {
    console.log(collapsed);
    setMenuIsCollapsed(collapsed);
  };

  return (
    <StyledSider collapsible collapsed={menuIsCollapsed} onCollapse={onCollapse}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <HomeOutlined />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key="2">
          <SettingOutlined />
          <span>Settings</span>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;