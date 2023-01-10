import React from 'react'
import { Title } from './../../../../components/Title/Title';
import { MenuItem, TextField, Button } from '@mui/material';
import { courierType, cities } from '../../../../components/Utils';
import './AddCourier.css'
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa'
import { POST } from '../../../../api/api';
import { FormValidation } from '../../../../components/Form/FormValidation/exports';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../../../../configs';

const AddCourier = () => {

  const [active, setActive] = React.useState(false)
  const [online, setOnline] = React.useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const handleAddCourirer = async (data) => {
    try {
      const docRef = await setDoc(doc(db, "couriers", `${data.number}`), {
        ...data,
        active,
        online
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      reset()
    }
  }

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
              helperText={errors?.name?.message}
              error={errors?.name && true}
              {...register('name',
                {
                  required: FormValidation.RequiredInput.required
                })
              }
            />
            <TextField
              id="filled-textarea"
              label="Фамилия"
              placeholder="Иванов"
              multiline
              variant="filled"
              size="small"
              name='SurName'
              helperText={errors?.surName?.message}
              error={errors?.surName && true}

              {...register('surName',
                {
                  required: FormValidation.RequiredInput.required,

                })
              }
            />
            <TextField
              id="filled-textarea"
              label="ПИН"
              placeholder="0101"
              variant="filled"
              size="small"
              name='PIN'
              helperText={errors?.PIN?.message}
              error={errors?.PIN && true}
              multiline
              {...register('PIN',
                {
                  required: FormValidation.RequiredInput.required,
                  maxLength: FormValidation.maxLengthValidation
                })
              }
            />
            <TextField
              id="filled-textarea"
              label="Моб-номер"
              placeholder="0700-77-77-77"
              multiline
              variant="filled"
              size="small"
              name='LastName'
              helperText={errors?.phone?.message}
              error={errors?.phone && true}
              {...register('number',
                {
                  required: FormValidation.RequiredInput.required
                })
              }
            />

            <TextField
              id="filled-textarea"
              label="Рейтинг"
              placeholder="5.0"
              multiline
              variant="filled"
              size="small"
              name='raiting'
              helperText={errors?.rating?.message}
              error={errors?.rating && true}
              {...register('raiting',
                {
                  required: FormValidation.RequiredInput.required
                })
              }
            />
            <TextField
              sx={{ width: '200px' }}
              id="filled-select-currency"
              select
              label="Тип курьера"
              defaultValue="Пеший"
              helperText="Выберите тип курьера"
              variant="filled"
              size="small"
              {...register('type')}
            >
              {courierType.map((type) => (
                <MenuItem key={type.title} value={type.title}>
                  {type.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              sx={{ width: '200px' }}
              id="filled-select-currency"
              select
              label="Город"
              defaultValue="Бишкек"
              helperText="Выберите тип курьера"
              variant="filled"
              size="small"
              {...register('city')}
            >
              {cities.map((type) => (
                <MenuItem key={type.title} value={type.title}>
                  {type.title}
                </MenuItem>
              ))}
            </TextField>
          </form>
          <Button
            variant="contained"
            type='submit'
            className='form-button'
            onClick={handleSubmit(data => handleAddCourirer(data))}
          >
            Добавить
            <FaUserPlus />
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddCourier