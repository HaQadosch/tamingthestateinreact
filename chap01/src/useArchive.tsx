import React from "react";
import { useLocalStorage } from "./useLocalStorage";

declare global {
  interface Array<T extends { id: React.ReactText }> {
    isIn: (elt: T) => boolean
  }
}

// eslint-disable-next-line
Array.prototype.isIn = function isIn<T extends { id: React.ReactText }> ({ id }: T): boolean {
  return (this as T[]).map(({ id }: T) => id).includes(id)
}

function byArchived<T extends { id: React.ReactText }> (archivedItems: T[]) {
  return (item: T) => {
    return archivedItems.length === 0 || !archivedItems.isIn(item)
  }
}

export function useArchive<T extends { id: React.ReactText }> (list: T[]): [T[], (archID: React.ReactText) => void] {
  const [archivedItems, setArchivedItems] = useLocalStorage('localItems')

  function handleArchive (archID: React.ReactText) {
    const found = list.find(item => item.id === archID)
    if (found) {
      setArchivedItems(found)
    }
  }
  return [list.filter(byArchived(archivedItems)), handleArchive]
}