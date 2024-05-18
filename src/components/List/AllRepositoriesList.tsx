"use client"

import { useRepositories } from "@/src/hooks"
import { useSearchParams } from "next/navigation"
import { RepositoryCard } from "../Card"
import { Loader } from "../Loader"
import { ErrorMessage, NoRepositoriesMessage } from "./Message"

export function AllRepositoriesList() {
  const searchParams = useSearchParams()
  const language = searchParams.get("language") || "all"

  const { repositories, isLoading, error } = useRepositories({
    language,
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (repositories.length === 0) {
    return <NoRepositoriesMessage />
  }

  return (
    <ul className="divide-y divide-gray-200 space-y-3">
      {repositories.map((repo) => (
        <li key={repo.id}>
          <RepositoryCard repo={repo} />
        </li>
      ))}
    </ul>
  )
}
