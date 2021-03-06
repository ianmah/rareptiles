import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { loadReptileContract, loadWeb3 } from './utility/web3'
import Sidebar from './components/Sidebar'
import Mint from './components/Mint'
import './App.css'
import Collection from './components/Collection'

const Container = styled.div`
  display: flex;
`

const Content = styled.div`
  padding: 20px;
`

function App() {
  const [contracts, setContracts] = useState({})

  useEffect(() => {
    const getContract = async () => {
      const reptile = await loadReptileContract()
      setContracts({...contracts, reptile})
    }
    loadWeb3()
    getContract()
  }, [])

  return (
    <Container>
      <Sidebar/>
      <Content>
        <Mint contract={contracts.reptile} />
        <Collection contract={contracts.reptile} />
      </Content>
    </Container>
  )
}

export default App
