import { GlobalFavoriteProvider } from "../providers"

export function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalFavoriteProvider>{children}</GlobalFavoriteProvider>
}
