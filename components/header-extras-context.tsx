"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

const HeaderExtrasContext = createContext<{
  extras: ReactNode
  setExtras: (node: ReactNode) => void
  rightExtras: ReactNode
  setRightExtras: (node: ReactNode) => void
}>({ extras: null, setExtras: () => {}, rightExtras: null, setRightExtras: () => {} })

export function HeaderExtrasProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<ReactNode>(null)
  const [rightExtras, setRightExtras] = useState<ReactNode>(null)
  return (
    <HeaderExtrasContext.Provider value={{ extras, setExtras, rightExtras, setRightExtras }}>
      {children}
    </HeaderExtrasContext.Provider>
  )
}

export function useHeaderExtras() {
  return useContext(HeaderExtrasContext)
}

/** Render this inside a page to inject content into the header bottom-left area. */
export function HeaderSlot({ children }: { children: ReactNode }) {
  const { setExtras } = useHeaderExtras()
  useEffect(() => {
    setExtras(children)
    return () => setExtras(null)
  })
  return null
}

/** Render this inside a page to inject content into the header bottom-right area. */
export function HeaderRightSlot({ children }: { children: ReactNode }) {
  const { setRightExtras } = useHeaderExtras()
  useEffect(() => {
    setRightExtras(children)
    return () => setRightExtras(null)
  })
  return null
}
