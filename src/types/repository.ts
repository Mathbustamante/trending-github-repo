export type Item = {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
  }
  html_url: string
  description: string
  stargazers_count: number
  language: string | null
}

export type GETRepositories = {
  items: Item[]
}

export type GlobalFavoritesContext = {
  favorites: Item[]
  addFavorite: (item: Item) => void
  removeFavorite: (id: number) => void
}
