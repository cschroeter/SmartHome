import React, { useCallback } from 'react'
import { SetPropertyInput, Thing } from '@graphome/core'
import { Light } from './Light'

interface Props {
  thing: Thing
  onPropertyChange: (payload: SetPropertyInput) => void
}

export const ThingCard: React.FC<Props> = (props) => {
  const { thing, onPropertyChange } = props

  console.log('Render thing')

  const handlePropertyChange = useCallback(
    (property, value) => onPropertyChange({ property, value, id: thing.id }),
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
