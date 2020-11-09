import React, { useCallback } from 'react'
import { Light } from './Light'

interface Props {
  thing: any
  onPropertyChange: (property: any, value: any, id: any) => void
}

export const Thing: React.FC<Props> = (props) => {
  const { thing, onPropertyChange } = props

  console.log('Render thing')

  const handlePropertyChange = useCallback(
    (property, value) => onPropertyChange(property, value, thing.id),
    [onPropertyChange, thing.id],
  )
  // TODO check what component to render
  return (
    <Light
      onOff={thing.properties.on}
      brightness={thing.properties.brightness}
      onPropertyChange={handlePropertyChange}
    />
  )
}
