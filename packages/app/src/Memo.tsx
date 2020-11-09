import { Button } from '@chakra-ui/core'
import React, { useCallback, useState } from 'react'

export const Memo = () => {
  console.log('render')
  const [count, setCount] = useState(0)
  const onLogout = useCallback(() => console.log('logout'), [])
  return (
    <div>
      <h1>Hello</h1>
      <LogoutButton name="Chris" onClick={() => console.log('logout')} />
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  )
}

interface Props {
  name: string
  onClick?: () => void
}
export const LogoutButton: React.FC<Props> = React.memo((props) => {
  console.log('render logout button')
  return <button onClick={props.onClick}>{props.name}</button>
})
