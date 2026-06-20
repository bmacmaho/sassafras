"use client"

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react"

const HeaderExtrasContext = createContext<{
  extras: ReactNode
  setExtras: (node: ReactNode) => void
  rightExtras: ReactNode
  setRightExtras: (node: ReactNode) => void
  bottomLeft: ReactNode
  setBottomLeft: (node: ReactNode) => void
}>({ extras: null, setExtras: () => {}, rightExtras: null, setRightExtras: () => {}, bottomLeft: null, setBottomLeft: () => {} })

const HeaderScrolledContext = createContext<{
  headerScrolled: boolean
  setHeaderScrolled: (v: boolean) => void
  headerHeight: number
  setHeaderHeight: (v: number) => void
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}>({ headerScrolled: false, setHeaderScrolled: () => {}, headerHeight: 0, setHeaderHeight: () => {}, darkMode: false, setDarkMode: () => {} })

export function HeaderExtrasProvider({ children }: { children: ReactNode }) {
  const [extras, setExtras] = useState<ReactNode>(null)
  const [rightExtras, setRightExtras] = useState<ReactNode>(null)
  const [bottomLeft, setBottomLeft] = useState<ReactNode>(null)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const extrasValue = useMemo(() => ({ extras, setExtras, rightExtras, setRightExtras, bottomLeft, setBottomLeft }), [extras, rightExtras, bottomLeft])
  const scrolledValue = useMemo(() => ({ headerScrolled, setHeaderScrolled, headerHeight, setHeaderHeight, darkMode, setDarkMode }), [headerScrolled, headerHeight, darkMode])
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
  }, [setExtras, children])
  return null
}

/** Render this inside a page to inject content into the header bottom-right area. */
export function HeaderRightSlot({ children }: { children: ReactNode }) {
  const { setRightExtras } = useHeaderExtras()
  useEffect(() => {
    setRightExtras(children)
    return () => setRightExtras(null)
  }, [setRightExtras, children])
  return null
}

/** Render this inside a page to inject content into the bottom-left corner, aligned with the back-to-top button. */
export function BottomLeftSlot({ children }: { children: ReactNode }) {
  const { setBottomLeft } = useHeaderExtras()
  useEffect(() => {
    setBottomLeft(children)
    return () => setBottomLeft(null)
  }, [setBottomLeft, children])
  return null
}
