import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title } from './Header'
import Search from './SearchBar'
import Card from './Card'
import data from '../assets/data.json'

const CollectionContainer = styled.div`
    box-sizing: border-box;
    padding: 8px;
`

const StyledCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const buyReptile = (tokenId) => {
    window.reptileContract.methods
        .buy(tokenId)
        .send({ from: window.account })
        .once('receipt', receipt => {
            console.log('Buy complete', receipt)
        })
}

const PER_PAGE = 10

const Shelter = ({}) => {
    const [shelter, setShelter] = useState(data)
    const [page, setPage] = useState(0)

    return (
        <CollectionContainer>
            <Search/>
            <Title>Shelter</Title>
            <StyledCollection>
            {
                shelter.slice(page*PER_PAGE, page*PER_PAGE+PER_PAGE).map(item => <Card key={item.id} {...item} />)
            }
            </StyledCollection>
            <Button onClick={() => setPage(page-1 >= 0 ? page-1 : 0)}>Back</Button>
            <Button style={{float: 'right'}} onClick={() => setPage(page+1)}>Next</Button>
        </CollectionContainer>
    )
}


export default Shelter