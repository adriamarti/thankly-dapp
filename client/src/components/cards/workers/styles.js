import styled from 'styled-components';
import { Card } from 'antd';

const WorkersCard = styled(Card)`
  & .ant-card-body {
    display: flex;
    justify-content: space-between;
  };
  & .ant-statistic {
    width: 50%;
  }
`;

export default {
  WorkersCard,
};

