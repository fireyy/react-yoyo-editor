import React from "react";
import styled from 'styled-components';

const mappings = {
  center: "center",
  left: "flex-start",
  right: "flex-end"
};

const ControlBarColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => mappings[props.aligner]};
  ${props => ((props.aligner !== "center") && ((props.aligner === "left") ? 'margin-left: -5px' : 'margin-right: -5px'))};
  flex: 1;
`;

export default ({ children, align = "center" }) => (
  <ControlBarColumn aligner={align}>
    {children}
  </ControlBarColumn>
);
