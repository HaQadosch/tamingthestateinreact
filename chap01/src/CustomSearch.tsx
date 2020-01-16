import React, { useState, ChangeEvent, ChangeEventHandler } from "react"
import { useArchive } from "./useArchive"

interface IItem {
  id: string
  name: string
}

interface IList {
  list: IItem[]
  query?: string
}

export const SearchableList: React.FC<IList> = ({ list }) => {
  const [query, setQuery] = useState<string>('')

  return (
    <div>
      <Search onChange={ onChange } query={ query }>Search List:</Search>
      <List list={ list?.filter(byQuery(query)) ?? [] } query={ query } />
    </div>
  )

  function byQuery (query: string) {
    return (item: IItem) => query === '' || item.name.toLowerCase().includes(query.toLowerCase())
  }

  function onChange ({ target: { value } }: ChangeEvent<HTMLInputElement>): void {
    setQuery(value)
  }
}

interface ISearch {
  query: string
  onChange: ChangeEventHandler
}

export const Search: React.FC<ISearch> = ({ children, onChange: handleChange, query }) => {

  return (
    <div>
      { children } <input type="text" name="seach" id="search" onChange={ handleChange } value={ query } />
    </div>
  )

}

export const List: React.FC<IList> = ({ list }) => {
  const [filteredList, setArchivedItem] = useArchive(list)

  return (
    <ul>
      {
        filteredList.map(({ id, name }) =>
          <li key={ id }>
            <span>{ name }</span><span><button onClick={ _ => setArchivedItem(id) }>Archive</button></span>
          </li>)
      }
    </ul>
  )
}
