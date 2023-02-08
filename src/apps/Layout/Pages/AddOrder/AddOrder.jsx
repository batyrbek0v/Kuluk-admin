import React from 'react'
import { citiesRef, tariffRef, villageRef } from '../../../../components/Utils/fireStoreRef';
import { Title } from '../../../../components/Title/Title'
import { useForm } from 'react-hook-form';
import { FormValidation } from './../../../../components/Form/FormValidation/exports';
import { db } from '../../../../configs';
import { Loader } from '../../../../components/Loader/Loader';
import { Header } from '../../../../components/Header/Header';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import './AddOrder.css'
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Backdrop,
  CircularProgress
} from '@mui/material';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import {
  orderTariff,
  payment,
  paymentPerson,
  paymentStatus,
  typeOfOrder
} from '../../../../components/Utils';

const AddOrder = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const date = new Date()

  const [city, setCity] = React.useState(null)
  const [cityId, setCityId] = React.useState('')
  const [cityId2, setCityId2] = React.useState('')
  const [district, setDistrict] = React.useState(null)
  const [district2, setDistrict2] = React.useState(null)
  const [tariff, setTariff] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const handleChange = (e) => {
    setCityId(e.target.value)
  }
  const handleChange2 = (e) => {
    setCityId2(e.target.value)
  }

  const handlePostOrder = async (order) => {
    console.log(order)
    try {
      setOpen(!open)
      const docRef = await addDoc(collection(db, 'orders'),
        {
          addressFrom: {
            address: order.fromAdress,
            city: cityId[0],
            cityName: cityId[1],
            district: order.fromDistrict[1],
            districtName: order.fromDistrict[0],
            lat: 42.876254,
            lon: 74.604228
          },
          addressTo: {
            address: order.toAdress,
            city: cityId2[0],
            cityName: cityId2[1],
            district: order.toDistrict[0],
            districtName: order.toDistrict[1],
            lat: 42.876254,
            lon: 74.604228
          },
          tariff: {
            cost: Number(order.cost),
            name: order.tariff.name,
            uid: order.tariff.order,
          },
          tariffId: order.tariff.order,
          cancellationReason: "",
          comments: order.commits,
          cost: Number(order.cost),
          cityFilter: cityId[0],
          cityFrom: cityId[0],
          cityTo: cityId2[0],
          cityFilter: cityId[0],
          courierOne: "",
          courierTwo: "",
          dateCreated: date,
          packageType: order.orderType,
          paymentMethod: order.payment,
          paymentStatus: order.paymentStatus == 'false' ? false : true,
          receiver: order.toPhone,
          receiverName: order.toName,
          receiverPhone: order.toPhone,
          redemption: Number(order.redemption),
          sender: order.fromPhone,
          senderName: order.fromName,
          senderPhone: order.fromPhone,
          status: "status_new",
          whoPays: Number(order.paymentPerson),
        }
      )
    } catch (e) {
      console.log(e.message)
    } finally {
      // reset()
      setOpen(false)
    }
  }


  React.useEffect(() => {
    const getTariff = async () => {
      const data = await getDocs(tariffRef)
      setTariff(data?.docs?.map((doc) => ({ ...doc?.data() })))
    }
    return () => getTariff()
  }, [])

  React.useEffect(() => {

    const getCity = async () => {
      const data = await getDocs(citiesRef)
      setCity(data?.docs?.map((doc, index) => ({ ...doc?.data() })))
    }
    const getDist = async () => {
      const q = query(villageRef, where("district", "==", cityId[0] && cityId[0]));
      const base = await getDocs(q)
        .then(res => {
          setDistrict(res?.docs?.map((doc) => ({ ...doc?.data() })))
        })
    }
    const getDist2 = async () => {
      const q = query(villageRef, where("district", "==", cityId2[0] && cityId2[0]));
      const base = await getDocs(q)
      setDistrict2(base?.docs?.map((doc) => ({ ...doc?.data() })))
    }


    getCity()
    getDist(cityId)
    getDist2(cityId2)
  }, [cityId, cityId2])


  const sortCity = city?.sort((a, b) => {
    if (a['id'] < b['id']) return -1
  })


  console.log(tariff)

  return (
    <>
      <div className="container">
        <Header previous={'Статистика'} initial={'Добавление заказа'} />
        <Title title={'Добавление заказа'} icon={<LibraryAddIcon fontSize='meduim' />} />
        <div className="container-inner">
          {
            !city
              ? <Loader />
              : <form className='order-form'>
                <div className='order-form-flex' >
                  {/* ОТПРАВИТЕЛЬ */}
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
                        size='small'
                        helperText={errors?.fromPhone && 'Масимум 10 символов'}
                        error={errors?.fromPhone && true}
                        {...register('fromPhone', {
                          required: FormValidation.RequiredInput.required,
                          maxLength: 10
                        })
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="Введите имя отправителя"
                        variant="outlined"
                        placeholder='Имя отправителя'
                        size='small'
                        helperText={errors?.fromName?.message}
                        error={errors?.fromName && true}
                        {...register('fromName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Город/район"
                        variant="outlined"
                        size="small"
                        defaultValue={''}
                        onChange={handleChange}
                      >
                        {
                          city?.map((city) => (
                            <MenuItem
                              key={city.id}
                              value={[city.id, city.name]}
                              name={city.name}
                              id={city.id}
                            >
                              {city.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                      <TextField
                        id="outlined-basic"
                        select
                        label="Село/микрорайон"
                        variant="outlined"
                        size='small'
                        placeholder='Введите село/микрорайон'
                        defaultValue={''}
                        disabled={!cityId ? true : false}
                        {...register('fromDistrict')}
                      >
                        {
                          district?.map((city) => (
                            <MenuItem key={city.id} value={[city.name, city.id]}>
                              {city.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                      <TextField
                        id="outlined-basic"
                        label="Введите адрес доставки"
                        variant="outlined"
                        size='small'
                        placeholder='Адрес'
                        error={errors?.fromAdress ? true : false}
                        helperText={errors ? errors?.fromAdress?.message : ''}
                        {...register('fromAdress', {
                          required: FormValidation.RequiredInput.required
                        })
                        }
                      />
                    </div>
                  </div>
                  {/* ----------------- */}
                  {/* ПОЛУЧАТЕЛЬ */}
                  <div className='order-block'>
                    <div className='order-block-head'>
                      <h3>Получатель</h3>
                    </div>
                    <div className="order-input-block">
                      <TextField
                        id="outlined-basic"
                        label="Введите номер телефона"
                        variant="outlined"
                        placeholder='Номер получателя'
                        type="number"
                        size='small'
                        helperText={errors?.toPhone && 'Масимум 10 символов'}
                        error={errors?.toPhone && true}
                        {...register('toPhone', {
                          required: FormValidation.RequiredInput.required,
                          maxLength: 10
                        })
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="Введите имя получателя"
                        variant="outlined"
                        size='small'
                        placeholder='Имя получателя'
                        helperText={errors?.toName?.message}
                        error={errors?.toName && true}
                        {...register('toName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="filled-select-currency2"
                        select
                        label="Город/район"
                        defaultValue={''}
                        variant="outlined"
                        size="small"
                        error={errors?.toCity && true}
                        onChange={handleChange2}
                      >
                        {
                          city?.map((city) => (
                            <MenuItem key={city.id} value={[city.id, city.name]}>
                              {city.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                      <TextField
                        id="outlined-basic"
                        select
                        label="Село/микрорайон"
                        variant="outlined"
                        size='small'
                        placeholder='Введите село/микрорайон'
                        // defaultValue={district2 && district2[0]?.name}
                        defaultValue={''}
                        disabled={!cityId2 ? true : false}
                        {...register('toDistrict')}
                      >
                        {
                          district2?.map((city) => (
                            <MenuItem key={city.id} value={[city.id, city.name]}>
                              {city.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                      <TextField
                        id="outlined-basic"
                        label="Введите адрес доставки"
                        variant="outlined"
                        placeholder='Адрес'
                        size='small'
                        error={errors?.toAdress && true}
                        helperText={errors?.toAdress?.message}
                        {...register('toAdress', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                    </div>
                  </div>
                  {/* ------------- */}
                  {/* ДЕТАЛИ ЗАКАЗА */}
                  <div className='order-block'>
                    <div className='order-block-head'>
                      <h3>Детали заказа</h3>
                    </div>
                    <div className="order-input-block">
                      <Box sx={{ display: 'flex', gap: '4px' }}>
                        <TextField
                          sx={{ width: '90%' }}
                          id="filled-select-currency"
                          select
                          label="Выберите тип посылки"
                          defaultValue={typeOfOrder[0].value}
                          variant="outlined"
                          size="small"
                          error={errors?.orderType && true}
                          {...register('orderType', {
                            required: FormValidation.RequiredInput.required,
                          })
                          }
                        >
                          {typeOfOrder.map((type) => (
                            <MenuItem key={type.id} value={type.value}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          sx={{ width: '90%' }}
                          id="filled-select-currency"
                          select
                          label="Выберите тариф"
                          defaultValue={""}
                          variant="outlined"
                          size="small"
                          {...register('tariff', {
                            required: FormValidation.RequiredInput.required,
                          })
                          }
                        >
                          {tariff?.map((type) => (
                            <MenuItem key={type.order} value={{ ...type }}>
                              {type.name} ({type.cost}⃀)
                            </MenuItem>
                          ))}
                        </TextField>
                      </Box>
                      <TextField
                        id="outlined-basic"
                        label="Выкуп (0 если без выкупа)"
                        variant="outlined"
                        size='small'
                        defaultValue={0}
                        placeholder='0'
                        type="number"
                        {...register('redemption', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="outlined-basic"
                        label="Введите стоимость доставки"
                        variant="outlined"
                        size='small'
                        defaultValue={150}
                        type="number"
                        {...register('cost', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Выберите кто оплачивает"
                        defaultValue={paymentPerson[0].value}
                        variant="outlined"
                        size="small"
                        {...register('paymentPerson', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      >
                        {paymentPerson.map((person) => (
                          <MenuItem key={person.id} value={person.value}>
                            {person.title}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Метод оплаты"
                        defaultValue={payment[0].value}
                        variant="outlined"
                        size="small"
                        {...register('payment', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      >
                        {payment.map((type) => (
                          <MenuItem key={type.id} value={type.value}>
                            {type.title}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Выберите стуст оплаты"
                        defaultValue={paymentStatus[0].value}
                        variant="outlined"
                        size="small"
                        {...register('paymentStatus', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      >
                        {paymentStatus.map((type) => (
                          <MenuItem key={type.id} value={type.value}>
                            {type.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  {/* ДОПОЛНИТЕЛЬНО */}
                  <div className='order-block'>
                    <div className='order-block-head'>
                      <h3>Дополнительно</h3>
                    </div>
                    <div className="order-input-block">
                      <TextField
                        id="outlined-multiline-static"
                        label="Коментарии"
                        multiline
                        rows={4}
                        {...register('commits')}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit(data => handlePostOrder(data))}
                  size='large'
                  variant='contained'
                  style={{ background: 'coral' }}
                >
                  Оформить заказ
                </Button>
              </form>
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

export default AddOrder