import styled from 'styled-components';
import theme from 'themes/index';

export const ToolbarDiv = styled.div`
  font-size: 12px;
`;

export const ToolbarLayout = styled.label`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  padding-bottom: 6px;
`;

export const ToolbarLabel = styled.span`
  padding-bottom: 4px;
  font-weight: bold;
`;

export const ToolbarSelect = styled.select`
  border: ${theme.border.width}px solid #ccc;
  background-color: transparent;
  outline: none;
  border-radius: 2px;
  font: inherit;
  padding: 6px;
`;

export const ToolbarInput = styled.input`
  border: ${theme.border.width}px solid #ccc;
  padding: 6px;
  border-radius: 2px;
  font: inherit;
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;
