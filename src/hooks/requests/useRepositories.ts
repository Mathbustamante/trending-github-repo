import { format, sub } from "date-fns"
import useSWR from "swr"
import { fetcher } from "../../lib/utils"
import { GETRepositories } from "../../types"

type UseRepositoriesProps = {
  language: string | null
}

export function useRepositories({ language }: UseRepositoriesProps) {
  const date = format(
    sub(new Date(), {
      days: 7,
    }),
    "yyyy-MM-dd"
  )

  const url = `https://api.github.com/search/repositories?q=created:>${date}+language:${
    language || "all"
  }&sort=stars&order=desc`

  const { data, isLoading, error } = useSWR<GETRepositories>(url, fetcher)
  const items = data?.items ?? []

  return {
    repositories: items,
    isLoading,
    error,
  }
}
