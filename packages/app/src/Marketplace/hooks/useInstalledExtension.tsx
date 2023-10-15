import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { atom, useAtom } from 'jotai'
import { db } from '@penx/local-db'
import { store } from '@penx/store'
import { IExtension } from '@penx/types'

export const installedExtensionsAtom = atom<IExtension[]>([])

export function useInstalledExtensions() {
  const [extensions, setExtensions] = useAtom(installedExtensionsAtom)
  return { extensions, setExtensions }
}

export function useQueryExtensions() {
  const { isLoading, data: extensions } = useQuery(
    ['installedExtensions'],
    () => db.listExtensions(),
  )

  useEffect(() => {
    if (!extensions) return
    store.set(installedExtensionsAtom, extensions!)
  }, [extensions])

  return { isLoading, extensions }
}
