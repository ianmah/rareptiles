import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card'
import { Title, Header } from './Header'
import Search from './SearchBar'

const CollectionContainer = styled.div`
    box-sizing: border-box;
    padding: 8px;
`

const StyledCollection = styled.div`
    display: flex;
`

const Collection = ({ contract, isMarket, setViewCard }) => {
    const [collection, setCollection] = useState({})

    useEffect(() => {
        // Populate the collection object with users collection
        if (!contract) return;
    
        const getWallet = async () => {
            const totalSupply = await contract.methods.totalSupply().call();
            const wallet = {}
    
            for (let i = 1; i <= totalSupply; i++) {
                const item = await contract.methods.reptiles(i - 1).call()
                const owner = await contract.methods.ownerOf(i - 1).call()
                if ((owner === window.account  && !isMarket) || (isMarket && item.forSale)) {
                    const id = item[0].toNumber()
                    const salePrice = window.web3.utils.fromWei(item.salePrice.toString(), 'ether')
                    wallet[id] = {
                        id,
                        species: item.species,
                        name: item.name,
                        uri: item.uri,
                        forSale: item.forSale,
                        salePrice,
                        rarity: item.rarity,
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
        <CollectionContainer>
            <Header>{isMarket ? "Marketplace" : "Collection"}</Header>
            <StyledCollection>
            {
                Object.values(collection).map(item =>
                    <Card
                        key={item.id}
                        onClick={() => {
                            if (!isMarket && !item.forSale) {
                                setViewCard({...item, wanttosell: true})
                            } else {
                                setViewCard(item)
                            }
                        }}
                        isMarket={isMarket}
                        item={item}
                    />
                )
            }
            </StyledCollection>
        </CollectionContainer>
    )
}


export default Collection