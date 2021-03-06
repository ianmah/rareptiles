import React from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
    background: #fff;
    width: 300px;
    height: 400px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
`

const StyledImg = styled.img`
    max-width: 100%;
    border-radius: 10px 10px 0 0;
`

const Card = ({ species, name, id, uri }) => {
    return (
        <StyledCard>
            <StyledImg src={uri} alt={name} />
            {id} {name}
        </StyledCard>
    )
}


export default Card