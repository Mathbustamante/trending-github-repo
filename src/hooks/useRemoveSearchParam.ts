import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useRemoveSearchParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const removeSearchParam = (param: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.delete(param)
    router.replace(`${pathname}?${current}`)
  }

  return removeSearchParam
}
