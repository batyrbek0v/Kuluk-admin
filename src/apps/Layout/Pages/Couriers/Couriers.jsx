import React from 'react'
import Card from '../../../../components/Card/Card';
import { Title } from './../../../../components/Title/Title';
import './Couriers.css'


const Couriers = () => {




  return (
    <>
      <div className='courier-container'>
        <Title title={'Курьеры'} />
        <div className='courier-inner'>
          <div className='courier-card-wrapper'>
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}

export default Couriers