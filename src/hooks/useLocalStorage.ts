import { useEffect, useState } from "react"

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const isServer = typeof window === "undefined"

  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    if (!isServer) {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    }
  }, [isServer, key])

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
