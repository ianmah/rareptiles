import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card'

const StyledCollection = styled.div`
    display: flex;
`

const Collection = ({ contract }) => {

    const [collection, setCollection] = useState({})

    useEffect(() => {
        if (!contract) return;

        const getWallet = async () => {
            const totalSupply = await contract.methods.totalSupply().call();
            const wallet = {}

            for (let i = 1; i <= totalSupply; i++) {
                const item = await contract.methods.reptiles(i - 1).call()
                const owner = await contract.methods.ownerOf(i - 1).call()
                if (owner === window.account) {
                    const id = item[0].toNumber()
                    wallet[id] = {
                    id,
                    species: item[1],
                    name: item[2],
                    uri: item[3],
                  }
                }
            }
              
            setCollection({
                ...collection,
                ...wallet,
            });

        }
        getWallet()
    }, [contract])

    return (
        <div>
            Collection
            <StyledCollection>
            {
                Object.values(collection).map(item => <Card key={item.id} {...item} />)
            }
            </StyledCollection>
        </div>
    )
}


export default Collection