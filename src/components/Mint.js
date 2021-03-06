import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Title } from './Header'

const MintContainer = styled.div`
    box-sizing: border-box;
    padding: 8px;
`

const Mint = ({ contract }) => {
    const mintReptile = (species, name, uri, rarity) => {
        window.reptileContract.methods
            .mint(species, name, uri, rarity)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
            })
    }

    const manualMint = () => {
        mintReptile('ligma logma', 'Liger', 'http://crownridgetigers.com/wp-content/uploads/2013/12/liger.jpg', 3)
    }

    return (
        <MintContainer>
            <Title>Mint</Title>
            <Button onClick={manualMint}>Mint</Button>
        </MintContainer>
    )
}

export default Mint