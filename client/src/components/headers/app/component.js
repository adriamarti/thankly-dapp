// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Popover, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import logo from '../../../assets/images/logo.png'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Header, Image, User, UserName } = StyledComponents;


const Component = () => {
  return (
    <Header>
      <Image src={logo} width="100px" height="auto" alt="Thankly" />
      <User>
        <UserName>Company Name</UserName>
        <Button type="primary" shape="circle" icon={<LogoutOutlined />} />
      </User>
    </Header>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;