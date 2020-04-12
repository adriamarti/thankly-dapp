import styled from 'styled-components';
import { Button, Form } from 'antd';

const Amount = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 20px;
  & span {
    font-size: 20px;
    &:first-child {
      font-size: 60px;
    };
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledForm = styled(Form)`
  & .ant-select {
    width: 100%;
  }
`;

export default {
  Amount,
  StyledButton,
  StyledForm
};