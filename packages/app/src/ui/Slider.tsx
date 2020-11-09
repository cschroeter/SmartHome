import React, { useState } from 'react'
import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/core'

type Props = SliderProps & {}

export const Slider: React.FC<Props> = React.memo((props) => {
  console.log('render slider')
  const { value, ...rest } = props
  const [_value, setValue] = useState(value)
  return (
    <ChakraSlider value={_value} onChange={setValue} {...rest}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  )
})
