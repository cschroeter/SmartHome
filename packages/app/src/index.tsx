import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

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
    <ChakraProvider theme={theme}>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
