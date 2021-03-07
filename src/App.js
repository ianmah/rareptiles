import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadReptileContract, loadWeb3 } from './utility/web3'
import Sidebar from './components/Sidebar'
import Mint from './components/Mint'
import './App.css'
import Collection from './components/Collection'
import Shelter from './components/Shelter'
import ViewCard from './components/ViewCard'

const Container = styled.div`
  display: flex;
`

const Content = styled.div`
  padding: 20px;
`

function App() {
  const [contracts, setContracts] = useState({})
  const [activePage, setActivePage] = useState('collection')
  const [viewCard, setViewCard] = useState()

  useEffect(() => {
    const getContract = async () => {
      const reptile = await loadReptileContract()
      setContracts({...contracts, reptile})
      window.reptileContract = reptile
    }
    loadWeb3()
    getContract()
  }, [])

  return (
    <Container>
      {
        viewCard && <ViewCard setViewCard={setViewCard} item={viewCard} />
      }
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <Content>
        {activePage === 'home' &&
          <>
            <Mint contract={contracts.reptile} />
          </>
        }
        {activePage === 'marketplace' &&
          <>
            <Collection setViewCard={setViewCard} contract={contracts.reptile} isMarket={true} />
          </>
        }
        {activePage === 'collection' &&
          <>
            <Collection setViewCard={setViewCard} contract={contracts.reptile} />
          </>
        }
        {activePage === 'shelter' &&
          <>
            <Shelter setViewCard={setViewCard} contract={contracts.reptile} />
          </>
        }
        
      </Content>
    </Container>
  )
}

export default App
