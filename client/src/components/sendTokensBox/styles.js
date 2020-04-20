import styled from 'styled-components';
import { Mentions, Button } from 'antd';

const Box = styled.div`
  position: relative;
  margin-bottom: 20px;
  text-align: right;
`;

const StyledMentions = styled(Mentions)`
  width: 100%;
  height: 97px;
  border: none;
  text-align: left;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

export default {
  StyledMentions,
  StyledButton,
  Box
};