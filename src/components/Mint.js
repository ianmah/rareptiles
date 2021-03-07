import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Header } from './Header'

const MintContainer = styled.div`
    box-sizing: border-box;
    padding: 8px;
`

const Mint = ({ contract }) => {
    const mintReptile = (species, name, uri) => {
        window.reptileContract.methods
            .mint(species, name, uri)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
            })
    }

    const manualMint = () => {
        mintReptile('ligma logma', 'Liger', 'http://crownridgetigers.com/wp-content/uploads/2013/12/liger.jpg')
    }

    return (
        <MintContainer>
            <Header>Mint</Header>
            <Button onClick={manualMint}>Mint</Button>
        </MintContainer>
    )
}

export default Mint