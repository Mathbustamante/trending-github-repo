import { fetcher } from "@/src/lib/utils"
import { GETLanguages } from "@/src/types/languages"
import useSWR from "swr"

export function useProgrammingLanguages() {
  const { data, isLoading, error } = useSWR<GETLanguages>(
    "https://mathbustamante.github.io/api/programming-languages.json",
    fetcher
  )
  const languages = data?.data ?? []

  return {
    languages,
    isLoading,
    error,
  }
}
