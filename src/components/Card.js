import React, { useState } from 'react'
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

const listReptile = (tokenId, salePrice) => {
    window.reptileContract.methods
        .setForSale(tokenId, salePrice)
        .send({ from: window.account })
        .once('receipt', receipt => {
            console.log('Listing complete', receipt)
        })
}


const Card = ({ species, name, id, uri }) => {
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

    return (
        <StyledCard>
            <StyledImg src={uri} alt={name} />
            {id} {name}
            <button onClick={sellSomething}>Sell</button>
            {sellWindow && <div>
                Enter the amount you want to sell for:
                <input value={sellAmount} onChange={e => setSellAmount(e.target.value)} />
                <button onClick={confirmSell}>Confirm</button>
                </div>
            }
        </StyledCard>
    )
}


export default Card