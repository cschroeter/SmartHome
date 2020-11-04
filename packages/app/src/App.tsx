import React from 'react'
import { Center, Stack, Text } from '@chakra-ui/core'
import { MotionBox } from './MotionBox'
import { useCycle } from 'framer-motion'

export const App: React.FC = () => {
  return (
    <Center w="full" h="full">
      <Text>Hello</Text>
      <Stack w="full" h="full">
        <Card bg="blue.500" />
        <Card bg="red.500" />
        <Card bg="yellow.500" />
      </Stack>
    </Center>
  )
}

export const Card: React.FC<any> = (props) => {
  const [animate, cycleCard] = useCycle(
    {
      card: { width: '200px', height: '200px' },
    },
    { card: { width: '100vw', height: '100vh' } },
  )
  return (
    <MotionBox
      margin="0 auto"
      initial={{ width: '200px', height: '200px' }}
      animate={animate.card}
      onTap={() => {
        cycleCard()
      }}
      {...props}
    />
  )
}
