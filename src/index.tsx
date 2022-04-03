import React from 'react'
import ReactDOM from 'react-dom'


// theme
import { ThemeProvider } from '@mui/material'

// redux
import { Provider as ReduxProvider } from 'react-redux'


// apollo
import {
  ApolloClient, InMemoryCache, ApolloProvider
} from "@apollo/client"



import reportWebVitals from './reportWebVitals'

// app
import App from './App'

// redux setup
import store from './store/index'

// material ui setup
import theme from './styles/theme'


// styles
import './index.scss'



// setup usedapp
import { ChainId, DAppProvider, Config } from '@usedapp/core'


// blockchain config
const config: Config = {
    readOnlyChainId: ChainId.Rinkeby,
    readOnlyUrls: {
      [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/657b97c9050a433ebd7e1d203dc0d8f4',
    },
} 

// graphql config
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/efenstakes/metalinks',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <DAppProvider config={config}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </DAppProvider>
      </ApolloProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()