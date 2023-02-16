import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import * as AuthPages from '../../apps/Auth'

const AuthRoutes = () => {

  return (
    <React.Fragment>
      <Routes>
        <Route path="/auth/login" element={<AuthPages.Auth />} />
        <Route path="*" element={<Navigate to={'/auth/login'} />} />
      </Routes>
    </React.Fragment>
  )
}

export default AuthRoutes