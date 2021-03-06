import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title } from './Header'
import { RARITY, RARITY_FULL } from '../constants'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #ffffffee;
    position: absolute;
    box-sizing: border-box;
    z-index: 100;
`

const Content = styled.div`
    margin: auto;
    text-align: center;
`

const StyledImg = styled.img`
    width: 550px;
    height: 500px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`

const StyledButton = styled(Button)`
    float: right;
`

const StyledCard = styled.div`
    background: #fff;
    width: 550px;
    height: 640px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
    margin: 2em auto;
`

const ViewCard = ({ setViewCard, item }) => {
    const {species, name, uri, rarity} = item
    const adopt = () => {
        window.reptileContract.methods
            .mint(species, name, uri, rarity)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
                setViewCard(false)
            })
    }

    return (
        <Container>
            <StyledButton onClick={() => setViewCard()} >Close</StyledButton>
            <Content>
                <StyledCard>
                    <StyledImg src={item.uri} alt={item.name} />
                    <br/>
                    <Title>{item.name}</Title>
                    {RARITY_FULL[item.rarity]}
                    <br/>
                    <br/>
                    <Button onClick={adopt}>Adopt</Button>
                </StyledCard>
            </Content>
        </Container>
    )
}

export default ViewCard