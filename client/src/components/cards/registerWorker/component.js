// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Action from './action'

import registerEmployee from '../../../assets/images/flame-sign-up.png';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { RegisterWorkerCard } = StyledComponents;

const Component = () => {
  return (
    <RegisterWorkerCard cover={<img alt="Register" src={registerEmployee} />}>
      <Action />
    </RegisterWorkerCard>
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;