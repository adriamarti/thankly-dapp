import styled from 'styled-components';
import { Mentions } from 'antd';

const Box = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const StyledMentions = styled(Mentions)`
  width: 100%;
  height: 97px;
  border: none;
`;

export default {
  StyledMentions,
  Box,
  Footer
};