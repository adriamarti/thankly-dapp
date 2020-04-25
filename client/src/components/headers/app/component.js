// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { Header, User, UserName, Navigation } = StyledComponents;

const Component = ({ token, user }) => {
  
  const getTokenData = () => {
    if (token.name) {
      return (
        <div>
          <Typography.Text strong>
            {token.name}
          </Typography.Text>
          <Typography.Text code>
            {token.symbol}
          </Typography.Text>
        </div>
      )
    }

    return (
      <Typography.Text strong>
        There isn't any token created yet!
      </Typography.Text>
    )
  }

  return (
    <Header>
      <Navigation>
        {getTokenData()}
        <User>
          <UserName>{user.name}</UserName>
          <Button type="primary" shape="circle" icon={<LogoutOutlined />} onClick={() => document.location.href="/"} />
        </User>
      </Navigation>
    </Header>
  );
}

Component.propTypes = {
  token: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Component;