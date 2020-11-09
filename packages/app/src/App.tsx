import React, { ChangeEvent, useCallback } from 'react'
import { Box, Switch, Stack, Center } from '@chakra-ui/core'
import { useQuery, gql, useMutation } from '@apollo/client'
import { LightSlider } from './LightSlider'

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

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setProperty({
        variables: {
          id: 65537,
          property: 'on',
          value: 'true',
        },
      })
    },
    [setProperty],
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( {error.toString()}</p>
  data.things.map((x: any) => console.log(x.properties.on.value.toString()))

  // TODO need thing interface
  return (
    <Center p={4}>
      <Stack spacing={4} shouldWrapChildren>
        {data.things.map((thing: any) => (
          <Box key={thing.id} w="300px" bg="gray.100" p={4}>
            <Switch isChecked={thing.properties.on.value} onChange={handleChange} />
            {/* <LightSlider
              brightness={thing.properties.brightness.value}
              onChangeEnd={(x) => {
                if (x !== thing.properties.brightness.value) {
                  console.log('set brightness to', Number(x))
                  setProperty({
                    variables: {
                      id: thing.id,
                      property: 'brightness',
                      value: String(x),
                    },
                  })
                }
              }}
            /> */}
            {thing.title}
          </Box>
        ))}
      </Stack>
    </Center>
  )
}
