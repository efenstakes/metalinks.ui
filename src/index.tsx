import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '@mui/material'


import reportWebVitals from './reportWebVitals'


import App from './App'


// material ui setup
import theme from './styles/theme'

import './index.scss'



// setup usedaoo
import { ChainId, DAppProvider, Config } from '@usedapp/core'

const config: Config = {
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
      [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/657b97c9050a433ebd7e1d203dc0d8f4',
    },
} 


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()