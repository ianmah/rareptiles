import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Price } from './Header'
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
    width: 500px;
    height: 450px;
    margin: 2em;
    object-fit: cover;
    box-shadow: 2px 2px 15px #e3e2e1;
    border-radius: 10px;
    overflow: hidden;
    z-index: 300;
`

const Shine = styled.div`
    width: 600px;
    height: 500px;
    margin-top: -500px;
    z-index: 600;
    animation: shiny 4s linear infinite;
    transform: translateY(0);
    background: linear-gradient(to right, transparent 25%, #fff 50%, transparent 75%);
    background-repeat: no-repeat;
`

const StyledButton = styled(Button)`
    float: right;
    margin: 0.5em;
`

const StyledCard = styled.div`
    background: #fff;
    width: 570px;
    min-height: 730px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
    margin: 5em auto;
    overflow: hidden;
    position: relative;
    padding-bottom: 2em;
`
const Name = styled.h2`
    font-family: 'Shapiro';
    font-size: 26px;
    text-transform: uppercase;
    margin: 0;
    margin-top: -20px;
    padding: 0 15px;
`

const Serial = styled.div`
    font-size: 10px;
    position: absolute;
    bottom: 1.2em;
    right: 1.2em;
    color: #ccc;
`
const listReptile = (tokenId, salePrice) => {
    window.reptileContract.methods
        .setForSale(tokenId, salePrice)
        .send({ from: window.account })
        .once('receipt', receipt => {
            console.log('Listing complete', receipt)
        })
}

const ViewCard = ({ setViewCard, item }) => {
    const {species, name, uri, rarity} = item
    const [sellAmount, setSellAmount] = useState('')

    const confirmSell = () => {
        const numSell = parseFloat(sellAmount)
        if (numSell) {
            const amountSell = window.web3.utils.toWei(numSell.toString(), "ether")
            listReptile(item.id, amountSell)
        }

    }

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
                    <Serial>
                        {item.id && `#${item.id}`} 
                    </Serial>
                    <StyledButton onClick={() => setViewCard()} >Close</StyledButton>
                    <StyledImg src={item.uri} alt={item.name} />
                    <Shine/>
                    <br/>
                    <Name>{item.name}</Name>
                    {RARITY[item.rarity]}: {RARITY_FULL[item.rarity]}
                    <br/>
                    <br/>
                    {
                        !item.id && item.id !== 0 && <Button onClick={adopt}>Adopt</Button>
                    }
                    {
                        
                        item.forSale && <>
                            <Price>{item.salePrice}</Price>
                            <br/>
                            <Button onClick={adopt}>Buy</Button>
                        </>
                    }
                    {
                        item.wanttosell && <div>
                        Sell price:
                        <input value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
                        <br/>
                        <Button onClick={confirmSell}>Confirm</Button>
                        </div>
                        
                    }
                </StyledCard>
            </Content>
        </Container>
    )
}

export default ViewCard