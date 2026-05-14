"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

const HeaderExtrasContext = createContext<{
  extras: ReactNode
  setExtras: (node: ReactNode) => void
}>({ extras: null, setExtras: () => {} })

export function HeaderExtrasProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<ReactNode>(null)
  return (
    <HeaderExtrasContext.Provider value={{ extras, setExtras }}>
      {children}
    </HeaderExtrasContext.Provider>
  )
}

export function useHeaderExtras() {
  return useContext(HeaderExtrasContext)
}

/** Render this inside a page to inject content into the header title area. */
export function HeaderSlot({ children }: { children: ReactNode }) {
  const { setExtras } = useHeaderExtras()
  useEffect(() => {
    setExtras(children)
    return () => setExtras(null)
  })
  return null
}
