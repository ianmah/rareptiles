import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: white;
  background-color: #333333;
  border: none;
  border-radius: 50px;
  height: 2.5em;
  min-width: 8em;
  font-weight: bold;
  flex-basis: calc(50% - 20px);
  transition: all 200ms cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 3px 3px 8px #e3e2e1;
  font-family: 'Fira Mono', monospace;
  text-transform: uppercase;
  font-size: 12px;

  &:active {
    transform: translate(-2px, 2px);
  }

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    background-color: #777777;
  }
`

const Button = ({children, ...props}) => (
  <StyledButton {...props} >{children}</StyledButton>
)

export default Button