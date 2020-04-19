import styled from 'styled-components';
import { Button, Form } from 'antd';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 20px;
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
  Wrapper,
  StyledButton,
  StyledForm
};