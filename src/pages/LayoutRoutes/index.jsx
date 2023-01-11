import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as LayoutPages from '../../apps/Layout/Pages'
import Header from '../../components/Header/Header'
import { useAuth } from './../../provider/useAuth';
import './general.css'


const LayoutRoutes = () => {

  const { admin } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    admin ? navigate('/') : navigate('/auth/login')
  }, [admin])

  return (
    <>
      <div className='general-container'>
        <Header />
        <Routes>
          <Route path='/' element={<LayoutPages.Main />} />
          <Route path='/addcourier' element={<LayoutPages.AddCourier />} />
          <Route path='/couriers' element={<LayoutPages.Couriers />} />
          <Route path='/admin' element={<LayoutPages.Admin />} />
          <Route path='/addorder' element={<LayoutPages.AddOrder />} />
        </Routes>
      </div>
    </>
  )
}

export default LayoutRoutes