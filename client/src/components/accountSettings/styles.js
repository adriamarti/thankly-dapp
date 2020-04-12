import styled from 'styled-components';
import { Button, Form } from 'antd';

const RegisterWrapper = styled.div`
  width: 50%;
  margin-right: 20px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const StyledForm = styled(Form)`
  display: flex;
`;

const StyledFormItem = styled(Form.Item)`
  flex-grow: 1;
  margin-right: 12px;
`;

export default {
  RegisterWrapper,
  StyledButton,
  StyledForm,
  StyledFormItem,
};