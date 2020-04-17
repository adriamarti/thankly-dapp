// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Popover, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import SignInForm from '../../signIn';
import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { HeaderWrapper, Header, Navigation, ThanklyIcon, ThanklyLogo } = StyledComponents;

const Component = () => {
  return (
    <HeaderWrapper>
      <Header>
        <Navigation>
          <ThanklyIcon />
          <ThanklyLogo />
          <Menu mode="horizontal">
            <Menu.Item key="1">What is this about?</Menu.Item>
            <Menu.Item key="2">How does it work?</Menu.Item>
            <Menu.Item key="3">Credits</Menu.Item>
          </Menu>
        </Navigation>
        <Popover placement="bottomRight" content={<SignInForm />} trigger="click">
          <Button type="primary" shape="circle" icon={<UserOutlined />} />
        </Popover>
      </Header>
    </HeaderWrapper>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;