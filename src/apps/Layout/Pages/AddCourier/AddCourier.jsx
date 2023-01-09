import React from 'react'
import { Title } from './../../../../components/Title/Title';
import { MenuItem, TextField } from '@mui/material';
import { courierType, cities } from '../../../../components/Utils';
import './AddCourier.css'


const AddCourier = () => {
  return (
    <>
      <div className='addCourier-container'>
        <Title title={'Добавление курьера'} />
        <div className='addCourier-inner'>
          <form>
            <TextField
              id="filled-textarea"
              label="Имя"
              placeholder="Иван"
              multiline
              variant="filled"
              size="small"
              name='Name'
            />
            <TextField
              id="filled-textarea"
              label="Фамилия"
              placeholder="Иванов"
              multiline
              variant="filled"
              size="small"
              name='SurName'

            />
            <TextField
              id="filled-textarea"
              label="Моб-номер"
              placeholder="0700-77-77-77"
              multiline
              variant="filled"
              size="small"
              name='LastName'
            />
            <TextField
              id="filled-select-currency"
              select
              label="Тип курьера"
              defaultValue="Пеший"
              helperText="Выберите тип курьера"
              variant="filled"
              size="small"
            >
              {courierType.map((type) => (
                <MenuItem key={type.title} value={type.title}>
                  {type.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="filled-textarea"
              label="Рейтинг"
              placeholder="5.0"
              multiline
              variant="filled"
              size="small"
              name='LastName'
            />
            <TextField
              id="filled-select-currency"
              select
              label="Тип курьера"
              defaultValue="Бишкек"
              helperText="Выберите тип курьера"
              variant="filled"
              size="small"
            >
              {cities.map((type) => (
                <MenuItem key={type.title} value={type.title}>
                  {type.title}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddCourier