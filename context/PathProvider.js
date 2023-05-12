import { createContext, useEffect, useState } from 'react'

export const PathContext = createContext({})

const PathProvider = ({ children }) => {
  const path =
    typeof document !== 'undefined' &&
    sessionStorage.getItem('pathname') &&
    sessionStorage.getItem('pathname')
  const [pathname, setPathname] = useState(path ? path : null)

  useEffect(() => {
    if (!sessionStorage.getItem('pathname')) {
      sessionStorage.setItem('pathname', pathname)
    }
  }, [pathname])
  return (
    <PathContext.Provider value={{ pathname, setPathname }}>
      {children}
    </PathContext.Provider>
  )
}

export default PathProvider
