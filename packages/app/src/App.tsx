import React, { useCallback } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Thing, SetPropertyInput } from '@graphome/core'
import { ThingCard } from './things/ThingCard'

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
  mutation SetProperty($input: SetPropertyInput!) {
    setProperty(setPropertyInput: $input) {
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
  const { loading, error, data } = useQuery<{ things: Thing[] }>(THINGS)
  const [setProperty] = useMutation<Thing, { input: SetPropertyInput }>(SET_PROPERTY)

  console.log('Render app')

  const handlePropertyChange = useCallback(
    (input: SetPropertyInput) => {
      setProperty({
        variables: { input },
      })
    },
    [setProperty],
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.toString()}</p>

  // TODO need thing interface
  return (
    <>
      {data?.things.map((thing: Thing) => (
        <ThingCard key={thing.id} thing={thing} onPropertyChange={handlePropertyChange} />
      ))}
    </>
  )
}
