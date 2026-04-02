import { createContext } from 'react'

export type FavoritesContextType = {
  favoritesEnabled: boolean
  favoriteIds: readonly string[]
  isFavorite: (cca3: string) => boolean
  toggleFavorite: (cca3: string) => void
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoritesEnabled: false,
  favoriteIds: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
})
