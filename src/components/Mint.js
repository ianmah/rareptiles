import React from 'react'


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
        <div>
            Mint
            <button onClick={manualMint}>mint something</button>
        </div>
    )
}

export default Mint