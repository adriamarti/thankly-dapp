import styled from 'styled-components';
import { Button, Form } from 'antd';

const PathwayWrapper = styled.div`
  display: flex;
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
  PathwayWrapper,
  StyledButton,
  StyledForm,
  StyledFormItem,
};