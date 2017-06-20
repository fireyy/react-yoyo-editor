import React from "react";
import styled from 'styled-components';
import theme from "themes/index";

const AcceptsUl = styled.ul`
  border: 1px solid ${theme.colors.primary};
  border-top: 0;
  background-color: ${theme.colors.background};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  pointer-events: initial;
  position: absolute;
  top: 21px;
  right: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  user-select: none;
  border-radius: 0 0 2px 2px;
  opacity: ${props => props.visible ? 1 : 0};
  ${props => props.visible && 'z-index: 9999;'};
`;

const AcceptsUlli = styled.li`
  padding: 3px 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0,0.2);
  }
`

const AcceptsLi = ({ data, onAddClick }) => {
  const onAdd = (event) => {
    onAddClick(event, data);
  }
  return (
    <AcceptsUlli
      onClick={onAdd}
    >
      {data.label}
    </AcceptsUlli>
  )
}

export default ({ visible, data, onAddClick }) => {

  return (
    <AcceptsUl visible={visible}>
      {data.map(component => (
        <AcceptsLi
          key={component._yoyo.label}
          data={component._yoyo}
          onAddClick={onAddClick}
        ></AcceptsLi>
      ))}
    </AcceptsUl>
  );
}
