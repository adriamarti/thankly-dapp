// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty, Typography, Avatar } from 'antd';
import EditWorker from '../editWorker'
import TransferTokensToWorker from '../transferTokensToWorker'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { ListItem, Actions } = StyledComponents;


const Component = ({ workers }) => {

  const avatar = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    return (
      <Avatar style={{ verticalAlign: 'middle' }} size="large">
        {initials}
      </Avatar>
    )
  }

  const noResults = () => (
    <Empty
      description={
        <Typography.Text>
          No data available as you have not registered any employee
        </Typography.Text>
      }
    />
  )

  const employeesList = () => (
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
  )

  return (
    <div>
      {workers.length === 0 ? noResults() : employeesList()}
    </div>
  );
}

Component.propTypes = {
  workers: PropTypes.array,
};

Component.defaultProps = {
  workers: [],
};

export default Component;