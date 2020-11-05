import React from 'react'
import { Box, Switch, Stack, Center } from '@chakra-ui/core'
import { useQuery, gql, useMutation } from '@apollo/client'

const THINGS = gql`
  query Things {
    things {
      id
      name
      on
      brightness
    }
  }
`

const TOGGLE_LIGHT = gql`
  mutation ToggleLight($id: Int!) {
    toggleLight(id: $id) {
      id
      name
      on
      brightness
    }
  }
`

export const App: React.FC = () => {
  const { loading, error, data } = useQuery(THINGS)
  const [toggleLight] = useMutation(TOGGLE_LIGHT)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // TODO need thing interface
  return (
    <Center>
      <Stack spacing={4} shouldWrapChildren>
        {data.things.map((thing: any) => (
          <Box key={thing.id} w="300px" bg="gray.600" p={4}>
            {thing.brightness && (
              <Switch
                isChecked={thing.on}
                onChange={() => toggleLight({ variables: { id: thing.id } })}
              />
            )}
            {thing.name}
          </Box>
        ))}
      </Stack>
    </Center>
  )
}
