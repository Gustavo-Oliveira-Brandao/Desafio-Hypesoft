import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type SearchBarProps = {
  onSearch: (searchTerm: string) => void
}

export const SearchBar = ({ onSearch } : SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTerm = event.target.value
    setSearchTerm(newTerm)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Buscar produtos"
        value={searchTerm}
        onChange={handleInputChange}
        className="max-wsm"
      />
      <Button type="submit">Buscar</Button>
    </form>
  )
}