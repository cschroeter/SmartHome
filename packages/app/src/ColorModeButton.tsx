import React from 'react'
import { Button, useColorMode } from '@chakra-ui/core'

export const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
  )
}
