import React from 'react'


const Mint = ({ contract }) => {

    const listReptile = (tokenId) => {
        contract.methods
            .setForSale(tokenId, )
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('Listing coplete', receipt)
            })
    }

    const mintReptile = (species, name, uri) => {
        contract.methods
            .mint(species, name, uri)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
            })
    }

    const manualMint = () => {
        mintReptile('ligma logma', 'Liger', 'http://crownridgetigers.com/wp-content/uploads/2013/12/liger.jpg')
    }

    const sellSomething = () => {

    }

    return (
        <div>
            Mint
            <button onClick={manualMint}>mint something</button>
            <button onClick={sellSomething}>sell something</button>
        </div>
    )
}

export default Mint