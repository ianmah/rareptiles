import React, { useEffect } from 'react'
import { loadWeb3 } from './utility/web3'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  useEffect(() => {
    loadWeb3()
  }, [])

  return (
    <div>
      <Sidebar/>
      Welcome to Rareptiles
    </div>
  )
}

export default App
