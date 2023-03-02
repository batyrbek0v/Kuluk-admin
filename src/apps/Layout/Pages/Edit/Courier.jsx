import React from 'react'
import { useForm } from 'react-hook-form'
import { Title } from '../../../../components/Title/Title'
import { useParams } from 'react-router-dom';
import { db } from '../../../../configs';
import { Loader } from '../../../../components/Loader/Loader';
import { Header } from '../../../../components/Header/Header';
import { citiesRef } from '../../../../components/Utils/fireStoreRef';
import { courierType } from '../../../../components/Utils';
import { useNavigate } from 'react-router-dom';
import { FormValidation } from '../../../../components/Form/FormValidation/exports';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { doc, setDoc, getDocs, getDoc, updateDoc, } from "firebase/firestore";
import {
  MenuItem,
  TextField,
  Button,
  Box,
  Backdrop,
  CircularProgress
} from '@mui/material';

const EditCourier = () => {

  const [city, setCity] = React.useState(null)
  const [cityId, setCityId] = React.useState('')
  const [courier, setCourier] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const { id } = useParams()
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()


  React.useEffect(() => {
    const getCourier = async () => {
      const docRef = doc(db, 'couriers', `${id}`)
      const docSnap = await getDoc(docRef)
      setCourier({ ...docSnap.data(), id: docSnap.id })
    }
    const getCity = async () => {
      const data = await getDocs(citiesRef)
      setCity(data?.docs?.map((doc, index) => ({ ...doc?.data() })))
    }

    getCourier()
    getCity()
  }, [])


  const handleChangeCity = (event) => {
    setCityId(event.target.value)
  }

  const handleEditCourier = async (data) => {
    setOpen(!open)
    try {
      const docRef = await updateDoc(doc(db, "couriers", `${data.phone}`), {
        ...data,
        city: {
          name: !cityId.name ? courier?.city.name : cityId.name,
          id: !cityId.id ? courier?.city.id : cityId.id,
        },
        cityId: !cityId.id ? courier?.city.id : cityId.id,
      })
      setOpen(false)
      setTimeout(async () => {
        alert('Курьер успешно отредактирован, нажмите на "ok" чтобы перейти к курьерам')
        if (alert) {
          navigate('/couriers')
        }
      }, 1000)
      reset()

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div className="container">
        <Header previous={'Cписок курьеров'} initial={'Редактирование курьера'} />
        <Title title={'Редактирование курьера'} />
        <div className="container-inner">
          {
            !courier
              ? <Loader />
              : (
                <div className="addCourier-wrapper">
                  <div className='order-block-head'>
                    <h3>Редактирование курьера</h3>
                  </div>
                  <form className='add-courier-form'>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <TextField
                        id="filled-textarea"
                        multiline
                        defaultValue={courier?.name}
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
                        defaultValue={courier.surName}
                        variant="outlined"
                        size="small"
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
                        variant="outlined"
                        size="small"
                        name='PIN'
                        defaultValue={courier.pin}
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
                        defaultValue={courier.phone}
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
                        // label="Тип курьера"
                        variant="outlined"
                        defaultValue={courier?.type}
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
                        label={!cityId ? courier?.city.name : cityId.name}
                        variant="outlined"
                        className="add-courier-input"
                        size="small"
                        name='city'
                        onChange={handleChangeCity}
                      // {...register('city')}
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
                      multiline
                      defaultValue={courier.raiting}
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
                    onClick={handleSubmit(data => handleEditCourier(data))}
                    size='large'
                    fullWidth
                    variant='contained'
                    style={{ background: 'coral' }}
                    sx={{ marginTop: "10px" }}
                  >
                    Сохранить
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

export default EditCourier