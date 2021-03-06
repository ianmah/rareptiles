import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title } from './Header'
import { RARITY } from '../constants'

const StyledCard = styled.div`
    background: #fff;
    width: 300px;
    height: 375px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
    position: relative;
`

const StyledImg = styled.img`
    width: 100%;
    border-radius: 10px 10px 0 0;
    height: 60%;
    object-fit: cover
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
    bottom: 1em;
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

const Card = ({ item, isMarket, salePrice, isShelter }) => {
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
        alert(JSON.stringify(item, null, 4))

        window.reptileContract.methods
            .mint(species, name, uri, rarity)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
            })
    }

    const buy = () => {
        buyReptile(id)
    }

    return (
        <StyledCard>
            <StyledImg src={uri} alt={name} />
            <ContentWrapper>
              <Title>{name}</Title>
                <Description>
                  {`${species} #${id} ${RARITY[rarity]}`}
                </Description>
                {!isShelter && !isMarket && <Button onClick={sellSomething}>Sell</Button>}
                {isShelter && <CTA onClick={() => adopt(item)}>Adopt</CTA>}
                {sellWindow && <div>
                    Enter the amount you want to sell for:
                    <input value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
                    <Button onClick={confirmSell}>Confirm</Button>
                    </div>
                }
                {
                    isMarket && <>
                    Price: {salePrice}
                    <Button onClick={buy}>Buy</Button>
                    </>
                }
            </ContentWrapper>
        </StyledCard>
    )
}


export default Card