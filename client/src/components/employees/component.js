// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Divider, Avatar } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import EditWorker from '../editWorker'
import TransferTokensToWorker from '../transferTokensToWorker'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { ThanklyIcon, ThanklyLogo, LogoMenuItem, StyledMenuItem, ListItem, Actions } = StyledComponents;

const workers = [
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
  {
    name: 'Dunya Salazar',
    email: 'dunya.salazar@gmail.com',
    job: 'Junior Developer',
  },
];

const Component = () => {

  const avatar = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    return (
      <Avatar style={{ verticalAlign: 'middle' }} size="large">
        {initials}
      </Avatar>
    )
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={workers}
      renderItem={item => (
        <ListItem>
          <List.Item.Meta
            avatar={avatar(item.name)}
            title={`${item.name} | ${item.email}`}
            description={item.job}
          />
          <Actions>
            <EditWorker />
            <TransferTokensToWorker />
          </Actions>
        </ListItem>
        
      )}
    />
  );
}

// Component.propTypes = {
//   subpage: PropTypes.string.isRequired,
// };

export default Component;