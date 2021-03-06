import React, { useEffect } from 'react'
import { loadWeb3 } from './utility/web3'

function App() {
  useEffect(() => {
    loadWeb3()
  }, [])

  return (
    <div>
      Welcome to Rareptiles
    </div>
  )
}

export default App
