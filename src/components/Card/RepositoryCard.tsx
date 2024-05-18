import { cn, getInitials } from "@/src/lib/utils"
import { useFavorites } from "@/src/providers"
import { Item } from "@/src/types"
import { BookMarked, Heart, Star } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar"
import { Badge } from "../Badge"
import { Button } from "../Button"

type RepositoryCardProps = {
  repo: Item
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  function handleFavorite(item: Item) {
    const duplicateItem = favorites.find((favorite) => favorite.id === item.id)
    if (duplicateItem) {
      removeFavorite(item.id)
    } else {
      addFavorite(item)
    }
  }

  return (
    <div className="flex flex-col gap-y-1 py-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-x-2">
          <BookMarked className="mt-[0.15rem] h-4 w-4" />
          <Link href={repo.html_url} target="_blank">
            <h3 className="text-lg font-medium text-purple-600">
              {repo.full_name}
            </h3>
          </Link>
        </div>
        <Button
          className="flex items-center gap-x-2 px-2 w-max"
          onClick={() => handleFavorite(repo)}
          variant="outline"
          size="icon"
        >
          <Heart
            className={cn("h-4 w-4", {
              "fill-black": favorites.find(
                (favorite) => favorite.id === repo.id
              ),
            })}
          />
          <span className="hidden md:inline">Favorite</span>
        </Button>
      </div>
      <p className="max-w-[90%] text-wrap">{repo.description}</p>
      <div className="flex items-center gap-x-5 pt-4">
        {repo.language && (
          <Badge variant="outline" className="max-w-max">
            {repo.language}
          </Badge>
        )}
        <div className="flex items-center gap-x-1">
          <Star className="h-4 w-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-x-1">
          <span>Owned by</span>
          <Avatar className="h-5 w-5">
            <AvatarImage src={repo.owner.avatar_url} alt={repo.owner.login} />
            <AvatarFallback>{getInitials(repo.owner.login)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
