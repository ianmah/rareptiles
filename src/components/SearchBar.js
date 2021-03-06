import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 1em;
  input {
    padding: 0.5em 0.5em 0.5em 2.5em;
    box-sizing: border-box;
    font-size: 1em;
    font-weight: 400;
    border: solid 2px #555555;
    border-radius: 30px;
    width: 100%;
  }
  input:focus {
    outline: none;
    box-shadow: 0 0 3pt 1pt #999999;
  }
`

const Search = () => {
  return (
    <>
      <InputWrapper>
        <input
          type="text"
          placeholder="Browse"
        />
      </InputWrapper>
    </>
  );
}

export default Search;
