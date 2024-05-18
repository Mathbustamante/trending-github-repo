"use client"

import { ReactNode, createContext, useContext } from "react"
import { useLocalStorage } from "../hooks"
import type { GlobalFavoritesContext, Item } from "../types"

type GlobalFavoriteProviderProps = {
  children: ReactNode
}

const GlobalFavoriteContext = createContext<GlobalFavoritesContext | undefined>(
  undefined
)

export function GlobalFavoriteProvider({
  children,
}: GlobalFavoriteProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<Item[]>("favorites", [])

  const addFavorite = (item: Item) => {
    const newFavorites = [...favorites, item]
    setFavorites(newFavorites)
  }

  const removeFavorite = (id: number) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id)
    setFavorites(newFavorites)
  }

  return (
    <GlobalFavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </GlobalFavoriteContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(GlobalFavoriteContext)
  if (!context) {
    throw new Error("useFavorites must be used within a GlobalFavoriteProvider")
  }
  return context
}
