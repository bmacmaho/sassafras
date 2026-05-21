"use client"

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react"

const HeaderExtrasContext = createContext<{
  extras: ReactNode
  setExtras: (node: ReactNode) => void
  rightExtras: ReactNode
  setRightExtras: (node: ReactNode) => void
}>({ extras: null, setExtras: () => {}, rightExtras: null, setRightExtras: () => {} })

const HeaderScrolledContext = createContext<{
  headerScrolled: boolean
  setHeaderScrolled: (v: boolean) => void
  headerHeight: number
  setHeaderHeight: (v: number) => void
}>({ headerScrolled: false, setHeaderScrolled: () => {}, headerHeight: 0, setHeaderHeight: () => {} })

export function HeaderExtrasProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<ReactNode>(null)
  const [rightExtras, setRightExtras] = useState<ReactNode>(null)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const extrasValue = useMemo(() => ({ extras, setExtras, rightExtras, setRightExtras }), [extras, rightExtras])
  const scrolledValue = useMemo(() => ({ headerScrolled, setHeaderScrolled, headerHeight, setHeaderHeight }), [headerScrolled, headerHeight])
  return (
    <HeaderScrolledContext.Provider value={scrolledValue}>
      <HeaderExtrasContext.Provider value={extrasValue}>
        {children}
      </HeaderExtrasContext.Provider>
    </HeaderScrolledContext.Provider>
  )
}

export function useHeaderExtras() {
  return useContext(HeaderExtrasContext)
}

export function useHeaderScrolled() {
  return useContext(HeaderScrolledContext)
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
