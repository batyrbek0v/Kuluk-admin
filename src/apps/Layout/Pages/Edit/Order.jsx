import React from 'react'
import { FormValidation } from '../../../../components/Form/FormValidation/exports';
import { citiesRef, tariffRef, villageRef } from '../../../../components/Utils/fireStoreRef';
import { Loader } from '../../../../components/Loader/Loader';
import { payment } from '../../../../components/Utils/index';
import { Header } from '../../../../components/Header/Header';
import { Title } from '../../../../components/Title/Title';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { db } from '../../../../configs';
import { FiEdit } from 'react-icons/fi';
import { Button } from '@mui/material';
import {
  TextField,
  Box,
  MenuItem,
  Backdrop,
  CircularProgress
} from '@mui/material';
import {
  paymentPerson,
  paymentStatus,
  typeOfOrder
} from '../../../../components/Utils';
import {
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  onSnapshot,
  addDoc,
  collection
} from 'firebase/firestore';

const EditOrder = () => {


  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()

  const [order, setOrder] = React.useState(null)
  const [city, setCity] = React.useState(null)
  const [cityId, setCityId] = React.useState('')
  const [cityId2, setCityId2] = React.useState('')
  const [district, setDistrict] = React.useState(null)
  const [district2, setDistrict2] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [tariff, setTariff] = React.useState(null)
  const [tariff2, setTariff2] = React.useState(null)


  const getOrder = async () => {
    const docRef = doc(db, 'orders', `${id}`)
    const docSnap = await getDoc(docRef)
    setOrder({ ...docSnap.data(), id: docSnap.id })
  }

  React.useEffect(() => {
    getOrder()
  }, [])

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
    console.log(city.target.value)
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

  const handleChangeTariff = (tariff) => {
    setTariff2(tariff.target.value)
  }

  const handleEditOrder = async (editOrder) => {
    setOpen(!open)
    try {
      await updateDoc(doc(db, 'orders', `${id}`), {
        addressFrom: {
          address: editOrder.fromAdress,
          city: !cityId.id ? order?.addressFrom.city : cityId.id,
          cityName: !cityId.name
            ? order?.addressFrom?.cityName
            : cityId.name,
          district: !editOrder.fromDistrict
            ? order?.addressFrom.district
            : Number(editOrder.fromDistrict.split(',')[0]),
          districtName: !editOrder.fromDistrict
            ? order?.addressFrom.districtName
            : editOrder.fromDistrict.split(',')[1],
          lat: 42.876254,
          lon: 74.604228
        },
        addressTo: {
          address: editOrder.toAdress,
          city: !cityId2.id ? order?.addressTo.city : cityId2.id,
          cityName: !cityId2.name ? order.addressTo.cityName : cityId2.name,
          district: !editOrder.toDistrict
            ? order?.addressTo.district
            : Number(editOrder.toDistrict.split(',')[0]),
          districtName: !editOrder.toDistrict
            ? order?.addressTo.districtName
            : editOrder.toDistrict.split(',')[1],
          lat: 42.876254,
          lon: 74.604228
        },
        tariff: {
          cost: !tariff2?.cost ? order?.tariff?.cost : tariff2.cost,
          name: !tariff2?.name ? order?.tariff?.name : tariff2.name,
          uid: !tariff2?.order ? order?.tariff?.uid : String(tariff2.order),
        },
        tariffId: !tariff2?.order ? order?.tariff?.uid : String(tariff2.order),
        comments: editOrder.commits,
        cost: !editOrder.cost ? tariff2?.cost : Number(editOrder.cost),
        cityFilter: !cityId.id ? order?.addressFrom.city : cityId.id,
        cityFrom: !cityId.id ? order?.addressFrom.city : cityId.id,
        cityTo: !cityId2.id ? order?.addressTo.city : cityId2.id,
        packageType: editOrder.packageType,
        paymentMethod: editOrder.payment,
        paymentStatus: editOrder.paymentStatus === "false" ? false : true,
        receiver: editOrder.toPhone,
        receiverName: editOrder.toName,
        receiverPhone: editOrder.toPhone,
        redemption: Number(editOrder.redemption),
        sender: editOrder.fromPhone,
        senderName: editOrder.fromName,
        senderPhone: editOrder.fromPhone,
        whoPays: Number(editOrder.paymentPerson),
      })

      // await addDoc(collection(db, 'orders', id, 'history'), {
      //   date: new Date,
      //   description: `Админ обновил детали заказа`,
      // })

      setOpen(false)
      setTimeout(async () => {
        alert('Заказ успешно отредактирован, нажмите на "ok" чтобы перейти к заказам')
        if (alert) {
          navigate('/orders')
        }
      }, 1000)
      reset()
    } catch (e) {
      console.log(e.message)
    }
  }



  const sortCity = city?.sort((a, b) => {
    if (a['id'] < b['id']) return -1
  })

  return (
    <>
      <div className="container">
        <Header previous={'Список заказов'} initial='Редактирование ' />
        <Title title={'Редактирование заказа'} icon={<FiEdit />} />
        <div className="container-inner">
          {
            !city
              ? <Loader />
              : <form className='order-form'>
                <div className='order-form-flex'>
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
                        helperText={errors?.fromPhone && 'Масимум 10 символов'}
                        error={errors?.fromPhone && true}
                        defaultValue={order?.sender}
                        size="small"
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
                        helperText={errors?.fromName?.message}
                        error={errors?.fromName && true}
                        defaultValue={order?.senderName}
                        size="small"
                        {...register('fromName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        className='edit-order-input'
                        id="filled-select-currency"
                        select
                        label={!cityId ? `${order?.addressFrom.cityName}` : cityId.name}
                        variant="outlined"
                        size="small"
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
                      <select className='district-select' {...register('fromDistrict')}>
                        {
                          !district
                            ? <option
                              value={[order?.addressFrom.district, order?.addressFrom.districtName]}
                              selected
                            >
                              {order?.addressFrom.districtName}
                            </option>
                            : district?.map((city) => (
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
                        size="small"
                        error={errors?.fromAdress ? true : false}
                        helperText={errors ? errors?.fromAdress?.message : ''}
                        defaultValue={order?.addressFrom.address}
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
                        size="small"
                        helperText={errors?.toPhone && 'Масимум 10 символов'}
                        error={errors?.toPhone && true}
                        defaultValue={order?.receiver}
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
                        size="small"
                        helperText={errors?.toName?.message}
                        error={errors?.toName && true}
                        defaultValue={order?.receiverName}
                        {...register('toName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        className='edit-order-input'
                        id="filled-select-currency2"
                        select
                        label={!cityId2 ? `${order?.addressTo.cityName}` : cityId2.name}
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
                      <select className='district-select' {...register('toDistrict')}>

                        {
                          !district2
                            ? <option
                              value={[order?.addressTo.district, order?.addressTo.districtName]}
                              selected
                            >
                              {order?.addressTo.districtName}
                            </option>
                            : district2?.map((city) => (
                              <option key={city.id} value={[city.id, city.name]}>
                                {city.name}
                              </option>
                            ))
                        }
                      </select>
                      <TextField
                        id="outlined-basic"
                        label="Адрес доставки"
                        variant="outlined"
                        size="small"
                        error={errors?.toAdress && true}
                        helperText={errors?.toAdress?.message}
                        defaultValue={order?.addressTo.address}
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
                          defaultValue={order?.packageType}
                          variant="outlined"
                          size="small"
                          error={errors?.orderType && true}
                          {...register('packageType', {
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
                          className='edit-order-input'
                          select
                          label={!tariff2 ? `${order?.tariff?.name} (${order?.tariff?.cost}С̲)` : ''}
                          defaultValue={""}
                          variant="outlined"
                          size="small"
                          onChange={handleChangeTariff}
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
                        label="Стоимость доставки"
                        defaultValue={order?.cost}
                        {...register('cost')}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Выкуп (0 если без выкупа)"
                        variant="outlined"
                        defaultValue={order?.redemption}
                        type="number"
                        size="small"
                        {...register('redemption', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="filled-select-currency"
                        select
                        label="Кто оплачивает"
                        defaultValue={
                          order?.whoPays === 1 ? paymentPerson[0].value : paymentPerson[1].value
                        }
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
                        variant="outlined"
                        size="small"
                        defaultValue={
                          order?.paymentMethod === 'cash' && payment[0].value
                          || order?.paymentMethod === 'mbank' && payment[1].value
                          || order?.paymentMethod === 'optima' && payment[2].value
                          || order?.paymentMethod === 'elsom' && payment[3].value
                          || order?.paymentMethod === 'odengi' && payment[4].value
                          || order?.paymentMethod === 'other' && payment[5].value
                        }
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
                        defaultValue={`${order?.paymentStatus}`}
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
                        defaultValue={order?.comments}
                        {...register('commits', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleSubmit(data => handleEditOrder(data))}
                  size='large'
                  variant='contained'
                  style={{ background: '#66bb6a' }}
                >
                  Сохранить
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

export default EditOrder