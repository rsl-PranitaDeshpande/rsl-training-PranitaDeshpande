import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export function RegisteredUser() {
  const user = useContext(UserContext)

  if (!user) {
    return <p className="registered-user">No registered user yet.</p>
  }

  return (
    <div className="registered-user" aria-live="polite">
      <h3>Registered user</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}
