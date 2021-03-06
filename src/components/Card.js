import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title } from './Header'

const StyledCard = styled.div`
    background: #fff;
    width: 300px;
    height: 375px;
    margin: 0 20px 20px 0;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 2px 2px 15px #e3e2e1;
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
    const {species, name, id, uri} = item
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

    const adopt = (id) => {
        alert(id)
    }

    const buy = () => {
        buyReptile(id)
    }

    return (
        <StyledCard>
            <StyledImg src={uri} alt={name} />
            <ContentWrapper>
              <Title>{name}</Title>
                <p>
                  {`${species} #${id}`}
                </p>
                {!isShelter && !isMarket && <Button onClick={sellSomething}>Sell</Button>}
                {isShelter && <Button onClick={() => adopt(id)}>Adopt</Button>}
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