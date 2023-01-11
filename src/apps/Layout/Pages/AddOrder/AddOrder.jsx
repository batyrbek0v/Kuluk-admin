import React from 'react'
import { Title } from '../../../../components/Title/Title'
import './AddOrder.css'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { blue } from '@mui/material/colors';
import { Button, TextField } from '@mui/material';

const AddOrder = () => {
  return (
    <>
      <div className="container">
        <Title title={'Добавить заказ'} icon={<LibraryAddIcon fontSize='meduim' />} />
        <form className='order-form'>
          <div className='order-form-flex'>
            <div className='order-block'>
              <div className='order-block-head'>
                <h3>Отправитель</h3>
              </div>
              <div className='order-input-block'>
                <TextField
                  id="outlined-basic"
                  label="Введите номер телефона"
                  variant="outlined"
                  placeholder='Номер отправителя'
                  type="number"
                />
              </div>
            </div>
            <div className='order-block'>
              <div className='order-block-head'>
                <h3>Получатель</h3>
              </div>
            </div>
            <div className='order-block'>
              <div className='order-block-head'>
                <h3>Детали заказа</h3>
              </div>
            </div>
          </div>
          <Button size='large' variant='contained' style={{ background: '#66bb6a' }}>
            Оформить заказ
          </Button>
        </form>
      </div>
    </>
  )
}

export default AddOrder