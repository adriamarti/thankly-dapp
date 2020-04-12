import styled from 'styled-components';
import { Card } from 'antd';

const TokenSuppliedCard = styled(Card)`
  margin-bottom: 20px;
  & .ant-card-body {
    padding: 24px 0;
  };
  & .token-supplied-card-statistic {
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    
    & .ant-statistic {
      width: 50%;
    };
  };
`;

export default {
  TokenSuppliedCard,
};

