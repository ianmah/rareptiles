import React from 'react'


const Mint = ({ contract }) => {

    const mintReptile = (species, name) => {
        contract.methods
            .mint(species, name)
            .send({ from: window.account })
            .once('receipt', receipt => {
                console.log('mint complete', receipt)
            })
    }

    const manualMint = () => {
        mintReptile('ligma logma', 'Liger')
    }

    return (
        <div>
            Mint
            <button onClick={manualMint}>mint something</button>
        </div>
    )
}

export default Mint