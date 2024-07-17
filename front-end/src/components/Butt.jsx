import React from 'react';
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  width:${(props) => props.width || "230px"};
  height:${(props) => props.height || "50px"};
  padding: 6px 12px;
  border-radius: 8px;
  font-size: ${(props) => props.fontSize || "20px"};
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 1.5;
  border: 1px solid lightgray;
  font-weight: bold;

  color: ${(props) => props.color || "#FFFFFF"};
  background: ${(props) => props.background || "#5AC463"};
  cursor: ${(props) => props.cursor || ""};
    
        
  &:hover {
      /* background: ${(props) => props.hoverBackground || "#4CAF50"};
      color: ${(props) => props.hoverColor || "#FFFFFF"}; */
      
  }
  
  ${(props) =>
    props.media &&
    css`
      @media (max-width: 400px) {
        font-size: 18px;
      }
    `}
  ${props => props.disabled && css`
    background-color: #D0CFCF;
    color: #404040;
    border: 1px solid #D0CFCF;
    cursor: not-allowed;
  `}
`;

const Butt = ({children, ...props}) => {
    return (
        <div>
            <StyledButton {...props}>{children}</StyledButton>
        </div>
    );
};

export default Butt;