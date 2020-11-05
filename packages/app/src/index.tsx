import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/core'
import { App } from './App'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
})

const theme = extendTheme({
  styles: {
    global: () => ({
      'html, body, #root': {
        height: '100%',
        width: '100%',
      },
    }),
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
