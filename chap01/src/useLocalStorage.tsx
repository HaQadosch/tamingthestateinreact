import React, { useState, useEffect } from "react"

export function useLocalStorage<T extends { id: React.ReactText }> (localStorageKey: string): [T[], (val: T) => void] {
  const [value, setValue] = useState<T[]>(JSON.parse(window.localStorage.getItem(localStorageKey) || '[]'))

  const setDedupValue = (val: T) => {
    setValue(state => state.filter(item => item.id === val.id).concat([val]))
  }

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(value))
    // localStorageKey never change
    // eslint-disable-next-line
  }, [value])

  return [value, setDedupValue]
}