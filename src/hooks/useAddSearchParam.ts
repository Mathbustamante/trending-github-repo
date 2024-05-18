import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function useAddSearchParam() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const addSearchParam = (param: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (current.has(param)) {
      current.set(param, value)
    } else {
      current.append(param, value)
    }

    router.replace(`${pathname}?${current}`)
  }

  return addSearchParam
}
