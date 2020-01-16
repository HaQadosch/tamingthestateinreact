import React, { useState } from "react";

function byArchived<T extends { id: React.ReactText }> (archivedItems: T[]) {
  return (item: T) => archivedItems.length === 0 || !archivedItems.includes(item)
}

export function useArchive<T extends { id: React.ReactText }> (list: T[]): [T[], (archID: React.ReactText) => void] {
  const [archivedItems, setArchivedItems] = useState<T[]>([])

  function handleArchive (archID: React.ReactText) {
    const found = list.find(item => item.id === archID)
    if (found) {
      setArchivedItems(archived => archived.concat([found]))
    }
  }

  return [list.filter(byArchived(archivedItems)), handleArchive]
}