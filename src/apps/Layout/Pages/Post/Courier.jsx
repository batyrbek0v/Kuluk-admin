import React from 'react'
import { db } from '../../../../configs';
import { Title } from '../../../../components/Title/Title';
import { Loader } from '../../../../components/Loader/Loader';
import { Header } from '../../../../components/Header/Header';
import { useForm } from 'react-hook-form';
import { citiesRef } from '../../../../components/Utils/fireStoreRef';
import { courierType } from '../../../../components/Utils';
import { useNavigate } from 'react-router-dom';
import { FormValidation } from '../../../../components/Form/FormValidation/exports';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { doc, setDoc, getDocs, } from "firebase/firestore";
import './scss/AddCourier.scss'
import {
  MenuItem,
  TextField,
  Button,
  Box,
  Backdrop,
  CircularProgress
} from '@mui/material';

const AddCourier = () => {

  const [city, setCity] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const handleAddCourirer = async (data) => {
    setOpen(!open)
    try {
      const docRef = await setDoc(doc(db, "couriers", `${data.phone}`), {
        ...data,
        cityId: data.city.id,
        active: false,
        online: false,
      })
      setOpen(false)
      setTimeout(async () => {
        alert('Курьер успешно добавлен, нажмите на "ok" чтобы перейти к курьерам')
        if (alert) {
          navigate('/couriers')
        }
      }, 1000)
      reset()

    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      reset()
    }
  }

  React.useEffect(() => {
    const getCity = async () => {
      const data = await getDocs(citiesRef)
      setCity(data?.docs?.map((doc, index) => ({ ...doc?.data() })))
    }
    getCity()
  }, [])

  const sortCity = city?.sort((a, b) => {
    if (a['id'] < b['id']) return -1
  })

  return (
    <>
      <div className='container'>
        <Header previous="Статистика" initial="Добавить курьера" />
        <Title title={'Добавление курьера'} icon={<AiOutlinePlusCircle />} />
        <div className="container-inner">
          {
            !city
              ? <Loader />
              : (
                <div className="addCourier-wrapper">
                  <div className='order-block-head'>
                    <h3>добавление курьера</h3>
                  </div>
                  <form className='add-courier-form'>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <TextField
                        id="filled-textarea"
                        label="Имя"
                        placeholder="Иван"
                        multiline
                        variant="outlined"
                        size="small"
                        name='Name'
                        helperText={errors?.name?.message}
                        className="add-courier-input"
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
                        variant="outlined"
                        size="small"
                        name='SurName'
                        helperText={errors?.surName?.message}
                        className="add-courier-input"

                        error={errors?.surName && true}

                        {...register('surName',
                          {
                            required: FormValidation.RequiredInput.required,
                          })
                        }
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <TextField
                        id="filled-textarea"
                        label="ПИН"
                        placeholder="0101"
                        variant="outlined"
                        size="small"
                        name='PIN'
                        className="add-courier-input"
                        helperText={errors?.PIN?.message}
                        error={errors?.PIN && true}
                        multiline
                        {...register('pin',
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
                        variant="outlined"
                        size="small"
                        name='LastName'
                        className="add-courier-input"
                        helperText={errors?.phone?.message}
                        error={errors?.phone && true}
                        {...register('phone',
                          {
                            required: FormValidation.RequiredInput.required
                          })
                        }
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Тип курьера"
                        defaultValue=""
                        variant="outlined"
                        className="add-courier-input"
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
                        id="filled-select-currency"
                        select
                        label="Город/район"
                        defaultValue={''}
                        variant="outlined"
                        className="add-courier-input"
                        size="small"
                        name='city'
                        {...register('city')}
                      >
                        {city?.sort().map((type) => (
                          <MenuItem key={type.id} value={type}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <TextField
                      id="filled-textarea"
                      label="Рейтинг"
                      placeholder="5.0"
                      multiline
                      variant="outlined"
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
                  </form>
                  <Button
                    onClick={handleSubmit(data => handleAddCourirer(data))}
                    size='large'
                    fullWidth
                    variant='contained'
                    style={{ background: 'coral' }}
                    sx={{ marginTop: "10px" }}
                  >
                    Создать курьера
                  </Button>
                </div>
              )
          }
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  )
}

export default AddCourier