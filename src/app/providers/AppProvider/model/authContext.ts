import { createContext } from 'react'

export type AuthContextType = {
  username: string | null
  login: (username: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  login: () => {},
  logout: () => {},
})
