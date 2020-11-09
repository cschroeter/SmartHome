import React, { useCallback } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Thing } from './things/Thing'

const THINGS = gql`
  query Things {
    things {
      id
      title
      properties {
        brightness {
          min
          max
          value
        }
        on {
          value
        }
      }
    }
  }
`

const SET_PROPERTY = gql`
  mutation SetProperty($id: Int!, $value: String!, $property: String!) {
    setProperty(value: $value, id: $id, property: $property) {
      id
      properties {
        brightness {
          value
        }
        on {
          value
        }
      }
    }
  }
`

export const App: React.FC = () => {
  const { loading, error, data } = useQuery(THINGS)
  const [setProperty] = useMutation(SET_PROPERTY)

  console.log('Render app')

  const handlePropertyChange = useCallback(
    (property, value, id) => {
      console.log('set property', property, value, id)
      setProperty({
        variables: {
          property,
          value: String(value),
          id,
        },
      })
    },
    [setProperty],
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.toString()}</p>

  // TODO need thing interface
  return data.things.map((thing: any) => (
    <Thing key={thing.id} thing={thing} onPropertyChange={handlePropertyChange} />
  ))
}
