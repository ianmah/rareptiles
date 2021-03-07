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
    overflow: hidden;
`

const StyledImg = styled.img`
    animation: spin 4s ease infinite;
    width: 400px;
    height: 450px;
    margin: 2em;
    object-fit: cover;
    box-shadow: 2px 2px 15px #e3e2e1;
    border-radius: 10px;
`

const StyledButton = styled(Button)`
    float: right;
    margin: 0.5em;
`

const StyledCard = styled.div`
    background: #fff;
    width: 550px;
    height: 700px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
    margin: 5em auto;
    overflow: hidden;
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
            <Content>
                <StyledCard>
                    <StyledButton onClick={() => setViewCard()} >Close</StyledButton>
                    <StyledImg src={item.uri} alt={item.name} />
                    <br/>
                    <Title>{item.name}</Title>
                    {RARITY[item.rarity]}: {RARITY_FULL[item.rarity]}
                    <br/>
                    <br/>
                    <Button onClick={adopt}>Adopt</Button>
                </StyledCard>
            </Content>
        </Container>
    )
}

export default ViewCard