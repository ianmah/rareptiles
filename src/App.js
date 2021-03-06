import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadReptileContract, loadWeb3 } from './utility/web3'
import Sidebar from './components/Sidebar'
import Mint from './components/Mint'
import './App.css'
import Collection from './components/Collection'
import Shelter from './components/Shelter'

const Container = styled.div`
  display: flex;
`

const Content = styled.div`
  padding: 20px;
`

function App() {
  const [contracts, setContracts] = useState({})
  const [activePage, setActivePage] = useState('home')
  const [viewCard, setViewCard] = useState({})

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
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <Content>
        {activePage === 'home' &&
          <>
            <Mint contract={contracts.reptile} />
          </>
        }
        {activePage === 'marketplace' &&
          <>
            <Collection contract={contracts.reptile} isMarket={true} />
          </>
        }
        {activePage === 'collection' &&
          <>
            <Collection contract={contracts.reptile} />
          </>
        }
        {activePage === 'shelter' &&
          <>
            <Shelter contract={contracts.reptile} />
          </>
        }
        
      </Content>
    </Container>
  )
}

export default App
