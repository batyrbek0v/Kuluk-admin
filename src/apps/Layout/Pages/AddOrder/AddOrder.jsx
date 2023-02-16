import React from 'react'
import { citiesRef, tariffRef, villageRef } from '../../../../components/Utils/fireStoreRef';
import { Title } from '../../../../components/Title/Title'
import { useForm } from 'react-hook-form';
import { FormValidation } from './../../../../components/Form/FormValidation/exports';
import { db } from '../../../../configs';
import { Loader } from '../../../../components/Loader/Loader';
import { Header } from '../../../../components/Header/Header';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useNavigate } from 'react-router-dom';
import './AddOrder.scss'
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Backdrop,
  CircularProgress,
  Select
} from '@mui/material';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
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

  const navigate = useNavigate()
  const [city, setCity] = React.useState(null)
  const [city2, setCity2] = React.useState(null)
  const [cityId, setCityId] = React.useState({})
  const [cityId2, setCityId2] = React.useState({})
  const [district, setDistrict] = React.useState(null)
  const [district2, setDistrict2] = React.useState(null)
  const [districtName, setDistrictName] = React.useState('')



  const [tariff, setTariff] = React.useState(null)
  const [test, setTest] = React.useState('')
  const [open, setOpen] = React.useState(false)


  React.useEffect(() => {
    const settingTariff = onSnapshot(tariffRef, snapshot => {
      setTariff(
        snapshot.docs.map(doc => ({ ...doc.data() })
        ))
    })
    return () => settingTariff()
  }, [])

  React.useEffect(() => {
    const settingCity = onSnapshot(citiesRef, snapshot => {
      setCity(snapshot.docs.map(doc => ({ ...doc.data(), })))
    })
    return () => settingCity()
  }, [])


  const getDist = async (city) => {
    setCityId(city.target.value)
    const id = city.target.value.id

    const filteredDist = query(villageRef, where('district', '==', id))
    await getDocs(filteredDist)
      .then(res => setDistrict(res?.docs?.map((doc) => ({ ...doc?.data() }))))
  }

  const getDist2 = async (city2) => {
    setCityId2(city2.target.value)
    const id = city2.target.value.id

    const filteredDist = query(villageRef, where('district', '==', id))
    await getDocs(filteredDist)
      .then(res => setDistrict2(res?.docs?.map((doc) => ({ ...doc?.data() }))))
  }

  const handlePostOrder = async (order) => {
    setOpen(!open)
    try {
      const docRef = await addDoc(collection(db, 'orders'),
        {
          addressFrom: {
            address: order.fromAdress,
            city: cityId.id,
            cityName: cityId.name,
            district: !order.fromDistrict ? '' : Number(order.fromDistrict.split(',')[0]),
            districtName: !order.fromDistrict ? '' : order.fromDistrict.split(',')[1],
            lat: 42.876254,
            lon: 74.604228
          },
          addressTo: {
            address: order.toAdress,
            city: cityId2.id,
            cityName: cityId2.name,
            district: !order.toDistrict ? '' : Number(order.toDistrict.split(',')[0]),
            districtName: !order.toDistrict ? '' : order.toDistrict.split(',')[1],
            lat: 42.876254,
            lon: 74.604228
          },
          tariff: {
            cost: order.tariff.cost,
            name: order.tariff.name,
            uid: String(order.tariff.order),
          },
          tariffId: String(order.tariff.order),
          cancellationReason: "",
          comments: order.commits,
          cost: !order.cost ? order.tariff.cost : Number(order.cost),
          cityFilter: cityId.id,
          cityFrom: cityId.id,
          cityTo: cityId2.id,
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
          statusFilter: ["status_new"],
          whoPays: Number(order.paymentPerson),
        }
      )
      setOpen(false)
      setTimeout(async () => {
        alert('Заказ успешно добавлен, нажмите на "ok" чтобы перейти к заказам')
        if (alert) {
          navigate('/orders')
        }
      }, 1000)
      reset()

    } catch (e) {
      setOpen(false)
      console.log(e.message)
    }
    console.log(
      {
        addressFrom: {
          address: order.fromAdress,
          city: cityId.id,
          cityName: cityId.name,
          district: !order.fromDistrict ? '' : Number(order.fromDistrict.split(',')[0]),
          districtName: !order.fromDistrict ? '' : order.fromDistrict.split(',')[1],
          lat: 42.876254,
          lon: 74.604228
        },
        addressTo: {
          address: order.toAdress,
          city: cityId2.id,
          cityName: cityId2.name,
          district: !order.toDistrict ? '' : Number(order.toDistrict.split(',')[0]),
          districtName: !order.toDistrict ? '' : order.toDistrict.split(',')[1],
          lat: 42.876254,
          lon: 74.604228
        },
        tariff: {
          cost: order.tariff.cost,
          name: order.tariff.name,
          uid: String(order.tariff.order),
        },
        tariffId: String(order.tariff.order),
        cancellationReason: "",
        comments: order.commits,
        cost: !order.cost ? order.tariff.cost : Number(order.cost),
        cityFilter: cityId.id,
        cityFrom: cityId.id,
        cityTo: cityId2.id,
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
        statusFilter: ["status_new"],
        whoPays: Number(order.paymentPerson),
      }
    )
  }


  const sortCity = city?.sort((a, b) => {
    if (a['id'] < b['id']) return -1
  })

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
                        label="Номер телефона"
                        variant="outlined"
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
                        label="Имя отправителя"
                        variant="outlined"
                        size='small'
                        helperText={errors?.fromName?.message}
                        error={errors?.fromName && true}
                        {...register('fromName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="fromCity"
                        select
                        label="Город/район"
                        variant="outlined"
                        size="small"
                        defaultValue={''}
                        onChange={getDist}
                      >
                        {
                          city?.map((city) => (
                            <MenuItem
                              key={city.id}
                              value={city}
                              name={city.name}
                            >
                              {city.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                      <select
                        className='district-select'
                        disabled={!cityId.id ? true : false}
                        {...register('fromDistrict')}
                      >
                        <option selected disabled>Выберите район</option>
                        {
                          district?.map((city) => (
                            <option
                              key={city.id}
                              name={city.name}
                              value={[city.id, city.name]}
                            >
                              {city.name}
                            </option>
                          ))
                        }
                      </select>
                      <TextField
                        id="outlined-basic"
                        label="Адрес доставки"
                        variant="outlined"
                        size='small'
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
                        label="Номер телефона"
                        variant="outlined"
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
                        label="Имя получателя"
                        variant="outlined"
                        size='small'
                        helperText={errors?.toName?.message}
                        error={errors?.toName && true}
                        {...register('toName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="ToCity"
                        select
                        label="Город/район"
                        defaultValue={''}
                        variant="outlined"
                        size="small"
                        error={errors?.toCity && true}
                        onChange={getDist2}
                      >
                        {
                          city?.map((city) => (
                            <MenuItem key={city.id} value={city}>
                              {city.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                      <select
                        className='district-select'
                        disabled={!cityId2.id ? true : false}
                        {...register('toDistrict')}
                      >
                        <option selected disabled>Выберите район</option>
                        {
                          district2?.map((city) => (
                            <option
                              key={city.id}
                              name={city.name}
                              value={[city.id, city.name]}
                            >
                              {city.name}
                            </option>
                          ))
                        }
                      </select>
                      <TextField
                        id="outlined-basic"
                        label="Адрес доставки"
                        variant="outlined"
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
                          label="Тип посылки"
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
                          label="Тариф"
                          defaultValue={""}
                          variant="outlined"
                          size="small"
                          {...register('tariff')}
                        >
                          {
                            tariff?.map((type) => (
                              <MenuItem key={type.order} value={type}>
                                {type.name} ({type.cost}С̲)
                              </MenuItem>
                            ))
                          }
                        </TextField>
                      </Box>
                      <TextField
                        type="text"
                        size='small'
                        label=" цену"
                        {...register('cost')}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Выкуп (0 если без выкупа)"
                        variant="outlined"
                        size='small'
                        defaultValue={0}
                        type="number"
                        {...register('redemption', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Кто оплачивает"
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
                        label="Статус оплаты"
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