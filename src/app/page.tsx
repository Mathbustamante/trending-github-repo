import {
  AllRepositoriesList,
  FavoriteRepositoriesList,
} from "../components/List"
import { LanguageSelect } from "../components/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1 md:px-8 md:py-2 gap-y-2 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl py-6 font-bold text-center">
        Trending Github Repos
      </h1>
      <div className="flex flex-col grow w-full">
        <Tabs
          className="flex flex-col relative grow min-h-full overflow-hidden h-0 rounded-lg w-full mx-auto border"
          defaultValue="all"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full bg-neutral-100 p-2 gap-1">
            <TabsList className="grid w-full h-max grid-cols-2 max-w-[300px] border">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="favorite">Favorites</TabsTrigger>
            </TabsList>
            <LanguageSelect />
          </div>
          <TabsContent value="all" className="grow overflow-scroll px-6">
            <AllRepositoriesList />
          </TabsContent>
          <TabsContent
            value="favorite"
            className="grow overflow-scroll px-6 h-0"
          >
            <FavoriteRepositoriesList />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
