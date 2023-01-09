// import { onAuthStateChanged } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { auth } from '../configs'

// const useLogin = () => {

//   const [admin, setAdmin] = React.useState(null)



//   return {
//     admin,
//     isLoading,
//   }
// }

// export default useLogin


export const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {

  const [admin, setAdmin] = React.useState(true)
  const [isLoading, setLoading] = React.useState(true)



  React.useEffect(() => {
    const Listen = onAuthStateChanged(auth, admin => {
      if (admin) {
        setLoading(false)
        setAdmin(true)
      } else {
        setAdmin(false)
        setLoading(false)
      }
    })
    return () => Listen()
  }, [])

  const value = React.useMemo(() => ({
    admin,
    isLoading,
    setLoading
  }), [admin, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

