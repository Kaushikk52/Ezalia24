import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string
  onSearch?: (value: string) => void
}

export function SearchBar({ className, placeholder = "Search...", onSearch, ...props }: SearchBarProps) {
  const [value, setValue] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <div className={cn("relative w-full max-w-md", className)} {...props}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          className="w-full h-12 pl-4 pr-12 rounded-full bg-gray-50 border-gray-100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black text-white hover:bg-black/90"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </div>
  )
}
