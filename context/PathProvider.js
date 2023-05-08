import { createContext, useEffect, useState } from 'react'

export const PathContext = createContext({})

const PathProvider = ({ children }) => {
  const [pathname, setPathname] = useState(null)

  useEffect(() => {
    if (sessionStorage.getItem('pathname')) {
      const path = sessionStorage.getItem('pathname')
      setPathname(path)
    } else {
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
