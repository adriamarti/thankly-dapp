// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { List, Empty, Typography, Avatar } from 'antd';
import EditWorker from '../editWorker'
import TransferTokensToWorker from '../transferTokensToWorker'

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { ListItem, Actions } = StyledComponents;

const Component = ({ id, workers, pathways, pathwaysFromCompany, location }) => {
  const avatar = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

    return (
      <Avatar style={{ verticalAlign: 'middle' }} size="large">
        {initials}
      </Avatar>
    )
  }

  const userLoggedIsWorker = () => location.pathname.includes('worker');

  const noResults = () => (
    <Empty
      description={
        <Typography.Text>
          No data available as you have not registered any employee
        </Typography.Text>
      }
    />
  )

  const getPathway = (pathwayId) => {
    const payhwaysToFilter = userLoggedIsWorker() ? pathwaysFromCompany : pathways;

    const [patwhay] = payhwaysToFilter.filter(({ _id }) => _id === pathwayId );

    return patwhay;
  }

  const canBeRendered = () => {
    if (workers.length > 0) {
      if (userLoggedIsWorker() && pathwaysFromCompany.length > 0) {
        return true;
      }

      if (pathways.length > 0) {
        return true;
      }
    }

    return false;
  }

  const getWorkersToRender = () => {
    if (userLoggedIsWorker()) {
      return workers.filter(({ _id }) => _id !== id)
    }

    return workers;
  }

  const employeesList = () => (
    <List
      itemLayout="horizontal"
      dataSource={getWorkersToRender()}
      renderItem={item => (
        <ListItem>
          <List.Item.Meta
            avatar={avatar(item.name)}
            title={`${item.name} | ${item.email}`}
            description={getPathway(item.pathwayId).name}
          />
          {
            !userLoggedIsWorker() &&
            <Actions>
              <EditWorker />
              <TransferTokensToWorker amount={getPathway(item.pathwayId).amount} workerId={item._id}/>
            </Actions>
          }
        </ListItem>
      )}
    />
  )

  return (
    <div>
      {canBeRendered() ? employeesList() : noResults()}
    </div>
  );
}

Component.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  workers: PropTypes.array,
  pathways: PropTypes.array,
  pathwaysFromCompany: PropTypes.array,
};

Component.defaultProps = {
  workers: [],
  pathways: [],
  pathwaysFromCompany: []
};

export default Component;