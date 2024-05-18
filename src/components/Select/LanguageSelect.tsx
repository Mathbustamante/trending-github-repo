"use client"

import {
  useAddSearchParam,
  useProgrammingLanguages,
  useRemoveSearchParam,
} from "@/src/hooks"
import { cn } from "@/src/lib/utils"
import { Check, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "../Button"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"

export function LanguageSelect() {
  const { languages } = useProgrammingLanguages()

  const searchParams = useSearchParams()
  const addSearchParam = useAddSearchParam()
  const removeSearchParam = useRemoveSearchParam()
  const language = searchParams.get("language")

  const [isOpen, setIsOpen] = useState(false)

  function handleLanguage(l: string | null) {
    if (l && l !== language) {
      addSearchParam("language", l)
    } else {
      removeSearchParam("language")
    }
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="w-max px-2" variant="link" size="icon">
          <p>
            Language: <span>{language || "All"}</span>
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <ul className="divide-y divide-gray-200 flex flex-col max-h-80 overflow-y-auto">
          {language && (
            <li className="w-full">
              <Button
                className="flex w-full items-center gap-x-2 rounded-none font-normal"
                variant="ghost"
                onClick={() => handleLanguage(null)}
              >
                <X className="h-5 w-5" />
                <span className="text-start w-full">Clear Filters</span>
              </Button>
            </li>
          )}
          {languages.map((l) => (
            <li className="w-full" key={l}>
              <Button
                className={cn("flex w-full items-center gap-x-2 rounded-none", {
                  "font-normal": language !== l,
                })}
                variant="ghost"
                onClick={() => handleLanguage(l)}
              >
                {language === l && <Check className="h-5 w-5" />}
                <span className="text-start w-full">{l}</span>
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
