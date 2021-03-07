import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title, Header } from './Header'
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
    transition: all 200ms ease;
    ${p => p.visible ? 'opacity: 100;' : 'opacity: 0;'}
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

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(data)

const Shelter = ({ setViewCard }) => {
    const [shelter, setShelter] = useState(data)
    const [page, setPageState] = useState(0)
    const [visible, setVisible] = useState(true)

    const setPage = (p) => {
        setVisible(false)
        setTimeout(() => setPageState(p), 200)
        setTimeout(() => setVisible(true), 600)
    }

    return (
        <CollectionContainer>
            <Header>Shelter</Header>
            <StyledCollection visible={visible} >
            {
                shelter.slice(page*PER_PAGE, page*PER_PAGE+PER_PAGE).map(item => <Card  key={item.name} onClick={() => setViewCard(item)}item={item} isShelter />)
            }
            </StyledCollection>
            <Button onClick={() => setPage(page-1 >= 0 ? page-1 : 0)}>Back</Button>
            <Button style={{float: 'right'}} onClick={() => setPage(page+1)}>Next</Button>
        </CollectionContainer>
    )
}


export default Shelter