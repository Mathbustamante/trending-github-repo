"use client"

import { useFavorites } from "@/src/providers"
import { useSearchParams } from "next/navigation"
import { RepositoryCard } from "../Card"
import { NoRepositoriesMessage } from "./Message"

export function FavoriteRepositoriesList() {
  const { favorites } = useFavorites()
  const searchParams = useSearchParams()
  const language = searchParams.get("language") || "all"

  const favoriteRepositories = favorites.filter((r) => {
    if (language !== "all") {
      return r.language === language
    }
    return true
  })

  if (favoriteRepositories.length === 0) {
    return <NoRepositoriesMessage />
  }

  return (
    <ul className="divide-y divide-gray-200 space-y-3">
      {favoriteRepositories.map((repo) => (
        <li key={repo.id}>
          <RepositoryCard repo={repo} />
        </li>
      ))}
    </ul>
  )
}
