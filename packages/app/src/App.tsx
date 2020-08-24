import React from 'react'
import { ChakraProvider, CSSReset, Button } from '@chakra-ui/core'
import theme from '@chakra-ui/theme'

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Button colorScheme="blue">Hello</Button>
    </ChakraProvider>
  )
}
