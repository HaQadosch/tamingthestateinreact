import React, { useState, ChangeEvent } from "react"

interface IList {
  list: {
    id: string
    name: string
  }[]
}

export const SearchableList: React.FC<IList> = ({ list }) => {
  return (
    <div>
      <Search>Search List:</Search>
      <List list={ list } />
    </div>
  )
}

export const Search: React.FC = ({ children }) => {
  const [query, setQuery] = useState<string>('')

  return (
    <div>
      { children } <input type="text" name="seach" id="search" onChange={ handleChange } value={ query } />
    </div>
  )

  function handleChange ({ target: { value } }: ChangeEvent<HTMLInputElement>): void {
    setQuery(value)
  }
}

export const List: React.FC<IList> = ({ list }) => {
  return (
    <ul>
      { list.map(({ id, name }) => <li key={ id }>{ name }</li>) }
    </ul>
  )
}
