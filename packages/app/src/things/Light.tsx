import React, { useCallback } from 'react'
import { Box, Switch, Text } from '@chakra-ui/core'
import { Slider } from '../ui/Slider'

export enum Property {
  Brightness = 'Brightness',
  OnOff = 'OnOff',
}
interface Props {
  // onOffProperty
  // Brightness
  // ColorMode
  // ColorProperty
  // ColorTemperature
  onOff: any
  brightness: any
  onPropertyChange: (property: Property, value: any) => void
}

export const Light: React.FC<Props> = (props) => {
  const { brightness, onOff, onPropertyChange } = props
  console.log('Render light')

  const handleBrightnessChange = useCallback(
    (value) => onPropertyChange(Property.Brightness, value),
    [onPropertyChange],
  )

  const handleOnOffChange = useCallback(() => onPropertyChange(Property.OnOff, !onOff.value), [
    onPropertyChange,
    onOff.value,
  ])

  return (
    <Box w="300px">
      <Text>Brightness</Text>
      <Slider
        value={brightness.value}
        min={brightness.min}
        max={brightness.max}
        onChangeEnd={handleBrightnessChange}
      />

      <Text>OnOff</Text>
      <Switch isChecked={onOff.value} onChange={handleOnOffChange} />
    </Box>
  )
}
