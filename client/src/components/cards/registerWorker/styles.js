import styled from 'styled-components';
import { Card } from 'antd';

const RegisterWorkerCard = styled(Card)`
  margin-bottom: 20px;
  & .ant-card-cover {
    width: 60%;
    margin: 20px auto 0 auto;
  };
  & .ant-card-body {
    text-align: center;
  }
`

export default {
  RegisterWorkerCard
};

