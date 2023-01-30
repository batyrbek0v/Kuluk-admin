import React from 'react'
import * as LayoutPages from '../../apps/Layout/Pages'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from './../../provider/useAuth';
import Navbar from './../../components/Navbar/Navbar';
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
        <Navbar />
        <Routes>
          <Route path='/' element={<LayoutPages.Main />} />
          <Route path='/addorder' element={<LayoutPages.AddOrder />} />
          <Route path='/orders' element={<LayoutPages.Orders />} />
          <Route path='/orders/:id' element={<LayoutPages.OrdersMore />} />
          <Route path='/orders/edit/:id' element={<LayoutPages.EditOrder />} />
          <Route path='/addcourier' element={<LayoutPages.AddCourier />} />
          <Route path='/couriers' element={<LayoutPages.Couriers />} />
          <Route path='/admin' element={<LayoutPages.Admin />} />
        </Routes>
      </div>
    </>
  )
}

export default LayoutRoutes