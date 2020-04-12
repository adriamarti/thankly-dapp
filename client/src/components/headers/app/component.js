// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Popover, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Header, User, UserName, Navigation } = StyledComponents;

const Component = () => {
  return (
    <Header>
      <Navigation>
        <div>
          <Typography.Text strong>
            Adidas Dollar
          </Typography.Text>
          <Typography.Text code>
            ADD
          </Typography.Text>
        </div>
        <User>
          <UserName>Company Name</UserName>
          <Button type="primary" shape="circle" icon={<LogoutOutlined />} />
        </User>
      </Navigation>
    </Header>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;