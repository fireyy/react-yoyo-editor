import React from "react";
import styled from 'styled-components';
import theme from "themes/index";

const ControlPlaceholder = styled.div`
  display: flex;
  position: relative;
  border-radius: ${theme.border.width * 2}px;
`;

export default ({ children, ...rest }) => (
  <ControlPlaceholder {...rest}>
    {children}
  </ControlPlaceholder>
);
