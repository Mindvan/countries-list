import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { AuthContext } from '../model/authContext'
import { FavoritesContext } from '../model/favoritesContext'
import { ThemeContext } from '../model/themeContext'

const THEME_STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === 'dark' ? 'dark' : 'light'
}

const AUTH_USERNAME_KEY = 'countries_auth_username'

function favoritesStorageKey(username: string) {
  return `countries_favorites_${encodeURIComponent(username)}`
}

function readStoredUsername(): string | null {
  if (typeof window === 'undefined') return null
  const v = localStorage.getItem(AUTH_USERNAME_KEY)
  return v && v.length > 0 ? v : null
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const themeValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  )

  const [username, setUsername] = useState<string | null>(null)

  useLayoutEffect(() => {
    setUsername(readStoredUsername())
  }, [])

  const login = useCallback((name: string) => {
    const trimmed = name.trim()
    setUsername(trimmed)
    localStorage.setItem(AUTH_USERNAME_KEY, trimmed)
  }, [])

  const logout = useCallback(() => {
    setUsername(null)
    localStorage.removeItem(AUTH_USERNAME_KEY)
  }, [])

  const authValue = useMemo(
    () => ({ username, login, logout }),
    [username, login, logout],
  )

  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    if (!username) {
      setFavoriteIds([])
      return
    }
    try {
      const raw = localStorage.getItem(favoritesStorageKey(username))
      const parsed = raw ? JSON.parse(raw) : []
      setFavoriteIds(
        Array.isArray(parsed)
          ? parsed.filter((x): x is string => typeof x === 'string')
          : [],
      )
    } catch {
      setFavoriteIds([])
    }
  }, [username])

  const favoritesValue = useMemo(() => {
    const favoritesEnabled = Boolean(username)
    const isFavorite = (cca3: string) => favoriteIds.includes(cca3)
    return {
      favoritesEnabled,
      favoriteIds,
      isFavorite,
      toggleFavorite: (cca3: string) => {
        if (!username) return
        setFavoriteIds((prev) => {
          const next = prev.includes(cca3)
            ? prev.filter((id) => id !== cca3)
            : [...prev, cca3]
          localStorage.setItem(
            favoritesStorageKey(username),
            JSON.stringify(next),
          )
          return next
        })
      },
    }
  }, [username, favoriteIds])

  return (
    <ThemeContext.Provider value={themeValue}>
      <AuthContext.Provider value={authValue}>
        <FavoritesContext.Provider value={favoritesValue}>
          {children}
        </FavoritesContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}
