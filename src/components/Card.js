import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title } from './Header'
import { RARITY, ASSESSMENT_RARITY } from '../constants'

const StyledCard = styled.div`
    background: #fff;
    width: 300px;
    height: 400px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
    position: relative;
    transition: all 200ms ease;
    &:hover {
        box-shadow: 0 0 0 3px #f5971d;
        animation: spin2 4s ease infinite;
    }
`

const StyledImg = styled.img`
    width: 100%;
    border-radius: 10px 10px 0 0;
    height: 60%;
    object-fit: cover;
`
const ContentWrapper = styled.div`
    padding: 16px;
    p {
      color: #555;
    }
`

const Description = styled.p`
    margin: 0.3em 0;
`

const CTA = styled(Button)`
    position: absolute;
    bottom: 1.4em;
`

const Label = styled.div`
    font-family: 'Shapiro';
    position: absolute;
    color: white;
    text-shadow: 0 0 6px red;
    top: 0.75em;
    left: 1em;
    font-size: 16px;
`

const listReptile = (tokenId, salePrice) => {
    window.reptileContract.methods
        .setForSale(tokenId, salePrice)
        .send({ from: window.account })
        .once('receipt', receipt => {
            console.log('Listing complete', receipt)
        })
}

const buyReptile = (tokenId) => {
    window.reptileContract.methods
        .buy(tokenId)
        .send({ from: window.account })
        .once('receipt', receipt => {
            console.log('Buy complete', receipt)
        })
}

const Card = ({ item, isMarket, salePrice, isShelter, setViewCard = () => {}, ...props }) => {
    const {species, name, id, uri, rarity} = item
    const [sellAmount, setSellAmount] = useState('')
    const [sellWindow, setSellWindow] = useState(false)

    const sellSomething = () => {
        setSellWindow(true)
    }

    const confirmSell = () => {
        const numSell = parseInt(sellAmount)
        if (numSell) {
            console.log('yee')
            listReptile(id, numSell) // Change later
        }

    }

    const adopt = (item) => {
        window.reptileContract.methods
            .mint(species, name, uri, rarity)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
                setViewCard(false)
            })
    }

    const buy = () => {
        buyReptile(id)
    }

    return (
        <StyledCard {...props}>
            <Label>{RARITY[rarity]}</Label>
            <StyledImg src={uri} alt={name} />
            <ContentWrapper>
              <Title>{name}</Title>
                <Description>
                    {species} {id && `#${id}`} 
                </Description>
                {!isShelter && !isMarket && <CTA onClick={sellSomething}>Sell</CTA>}
                {isShelter && <CTA onClick={() => adopt(item)}>Adopt</CTA>}
                {sellWindow && <div>
                    Enter the amount you want to sell for:
                    <input value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
                    <CTA onClick={confirmSell}>Confirm</CTA>
                    </div>
                }
                {
                    isMarket && <>
                    Price: {item.salePrice}
                    <br/>
                    <CTA onClick={buy}>Buy</CTA>
                    </>
                }
            </ContentWrapper>
        </StyledCard>
    )
}


export default Card