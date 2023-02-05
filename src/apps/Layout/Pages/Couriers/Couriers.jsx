import React from 'react'
import TTable from '../../../../components/Table/TTable';
import { Title } from './../../../../components/Title/Title';
import './Couriers.css'
import { BsTable } from 'react-icons/bs';


const Couriers = () => {

  return (
    <>
      <div className='container'>
        <Title title={'Таблица курьеров'} icon={<BsTable />} />
        <div className='container-inner'>
          <TTable />
        </div>
      </div>
    </>
  )
}

export default Couriers