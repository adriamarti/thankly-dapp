// External Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import PathwayForm from './pathwayForm';

import 'antd/dist/antd.css'

import StyledComponents from './styles';

const { StyledButton } = StyledComponents;

const Component = ({ pathways, companyId }) => {
  const [companyPathways, setCompanyPathways] = useState(pathways);

  const addNewPathway = () => {
    setCompanyPathways([
      ...companyPathways,
      {
        name: '',
        amount: ''
      }
    ])
  };

  return (
    <div>
      {companyPathways.map(({ name, amount }, index) =>
        <PathwayForm name={name} amount={amount} companyId={companyId} key={`${name}-${index}`} />
      )}
      <StyledButton type="dashed" onClick={() => addNewPathway()}>
        <PlusOutlined /> Add new pathway
      </StyledButton>
    </div>
  );
}

Component.propTypes = {
  pathways: PropTypes.array,
  companyId: PropTypes.string
};

Component.defaultProps = {
  pathways: [],
  companyId: ''
};

export default Component;