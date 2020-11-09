import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/core'
import React, { useState } from 'react'

interface Props {
  brightness: number
  onChangeEnd?(value: number): void
}

export const LightSlider: React.FC<Props> = (props) => {
  const { brightness, ...rest } = props
  const [value, setValue] = useState(Number(brightness))
  return (
    <Slider value={value} onChange={setValue} {...rest}>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  )
}
