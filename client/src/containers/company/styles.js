import styled from 'styled-components';
import { Layout, Button, Col, Card } from 'antd';

const StyledContent = styled(Layout.Content)`
  padding: 90px 25px 25px 25px;
  min-width: calc(100% - 80px);
`;

const RegisterWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`;

const ButtonsWrapper = styled.div`
  margin-top: 40px;
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 50%;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
`;

const StyledColLeft = styled(Col)`
  margin-top: 50px;
`;

const StyledColRight = styled(Col)`
  text-align: center;
`;

const StyledSider = styled(Layout.Sider)`
  height: 100vh;
  padding-top: 60px;
`;

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
  StyledContent,
  RegisterWrapper,
  ButtonsWrapper,
  StyledButton,
  Image,
  StyledColLeft,
  StyledColRight,
  StyledSider,
  TokenSuppliedCard,
  WorkersCard,
  RegisterWorkerCard,
};

