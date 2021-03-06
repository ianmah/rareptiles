import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: white;
  background-color: #333333;
  border: none;
  border-radius: 50px;
  height: 2.5em;
  min-width: calc(20% - 20px);
  font-weight: bold;
  margin-right: 1em;
  flex-basis: calc(50% - 20px);
  transition: all 0.09s ease;

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

const Button = ({children}) => (
  <StyledButton>{children}</StyledButton>
)

export default Button