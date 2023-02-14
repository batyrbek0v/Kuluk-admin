import React from 'react'
import { FormValidation } from '../../../../components/Form/FormValidation/exports';
import { citiesRef, tariffRef, villageRef } from '../../../../components/Utils/fireStoreRef';
import { Loader } from './../../../../components/Loader/Loader';
import { payment } from './../../../../components/Utils/index';
import { Header } from '../../../../components/Header/Header';
import { Title } from './../../../../components/Title/Title';
import { useParams } from 'react-router-dom';
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
  orderTariff,
  paymentPerson,
  paymentStatus,
  typeOfOrder
} from '../../../../components/Utils';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  onSnapshot
} from 'firebase/firestore';

const EditOrder = () => {


  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  // const citiesRef = collection(db, "city")
  // const villageRef = collection(db, "village")

  const [order, setOrder] = React.useState(null)
  const [city, setCity] = React.useState(null)
  const [cityId, setCityId] = React.useState('')
  const [cityId2, setCityId2] = React.useState('')
  const [district, setDistrict] = React.useState(null)
  const [district2, setDistrict2] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [tariff, setTariff] = React.useState(null)
  const [tariff2, setTariff2] = React.useState(null)
  const [test, setTest] = React.useState('')



  React.useEffect(() => {
    const getOrders = async () => {
      const docRef = doc(db, 'orders', `${id}`)
      const docSnap = await getDoc(docRef)
      setOrder({ ...docSnap.data(), id: docSnap.id })
    }
    return () => getOrders()
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

  React.useEffect(() => {

    const id2 = Number(order?.addressFrom.city)
    const gettingDist = () => {
      const filteredDist = query(villageRef, where('district', '==', id2))
      getDocs(filteredDist)
        .then(res => setDistrict(res?.docs?.map((doc) => ({ ...doc?.data() }))))
    }

    return () => gettingDist()

  }, [])

  React.useEffect(() => {

    const id = Number(order?.tariffId)
    const gettingFilteredTariff = () => {
      const filteredDist = query(tariffRef, where('order', '==', id))
      getDocs(filteredDist)
        .then(res => setTariff2(res?.docs?.map((doc) => ({ ...doc?.data() }))))
    }

    return () => gettingFilteredTariff()

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
    setTest(tariff.target.value)
  }

  const handleEditOrder = async (editOrder) => {
    try {
      setOpen(!open)
      const orderRef = updateDoc(doc(db, 'orders', `${id}`),
        {
          addressFrom: {
            address: editOrder.fromAdress,
            city: !cityId.id ? order?.addressFrom.city : cityId.id,
            cityName: !cityId.name
              ? order?.addressFrom?.cityName
              : cityId.name,
            district: !editOrder.fromDistrict
              ? order.addressFrom.district
              : Number(editOrder.fromDistrict.split(',')[0]),
            districtName: !editOrder.fromDistrict
              ? order.addressFrom.districtName
              : editOrder.fromDistrict.split(',')[1],
            lat: 42.876254,
            lon: 74.604228
          },
          addressTo: {
            address: editOrder.toAdress,
            city: !cityId2.id ? order?.addressTo.city : cityId2.id,
            cityName: !cityId2.name ? order.addressTo.cityName : cityId2.name,
            district: !editOrder.toDistrict
              ? order.addressTo.district
              : Number(editOrder.toDistrict.split(',')[0]),
            districtName: !editOrder.toDistrict
              ? order.addressTo.districtName
              : editOrder.toDistrict.split(',')[1],
            lat: 42.876254,
            lon: 74.604228
          },
          tariff: {
            cost: !Number(test.split(',')[1]) ? order?.tariff.cost : Number(test.split(',')[1]),
            name: !test.split(',')[0] ? order?.tariff.name : test.split(',')[0],
            uid: !test.split(',')[2] ? order?.tariff.uid : test.split(',')[2],
          },
          tariffId: !test.split(',')[2] ? order?.tariffId : test.split(',')[2],
          cancellationReason: "",
          comments: editOrder.commits,
          cost: Number(editOrder.cost),
          cityFilter: !cityId.id ? order?.addressFrom.city : cityId.id,
          cityFrom: !cityId.id ? order?.addressFrom.city : cityId.id,
          cityTo: !cityId2.id ? order?.addressTo.city : cityId2.id,
          courierOne: "",
          courierTwo: "",
          packageType: editOrder.packageType,
          paymentMethod: editOrder.payment,
          paymentStatus: !editOrder.paymentStatus
            ? order.paymentStatus
            : editOrder.paymentStatus == "false" ? false : true,
          receiver: editOrder.toPhone,
          receiverName: editOrder.toName,
          receiverPhone: editOrder.toPhone,
          redemption: Number(editOrder.redemption),
          sender: editOrder.fromPhone,
          senderName: editOrder.fromName,
          senderPhone: editOrder.fromPhone,
          whoPays: Number(editOrder.paymentPerson),
        }
      )
    } catch (e) {
      console.log(e.message)
    } finally {
      reset()
      setOpen(false)
    }
    console.log(
      {
        addressFrom: {
          address: editOrder.fromAdress,
          city: !cityId.id ? order?.addressFrom?.city : cityId.id,
          cityName: !cityId.name
            ? order?.addressFrom?.cityName
            : cityId.cityName,
          district: !editOrder.fromDistrict
            ? order.addressFrom.district
            : Number(editOrder.fromDistrict.split(',')[0]),
          districtName: !editOrder.fromDistrict
            ? order.addressFrom.districtName
            : editOrder.fromDistrict.split(',')[1],
          lat: 42.876254,
          lon: 74.604228
        },
        addressTo: {
          address: editOrder.toAdress,
          city: !cityId2.id ? order?.addressTo.city : cityId2.id,
          cityName: !cityId2.name ? order.addressTo.cityName : cityId2.cityName,
          district: !editOrder.toDistrict
            ? order.addressTo.district
            : Number(editOrder.toDistrict.split(',')[0]),
          districtName: !editOrder.toDistrict
            ? order.addressTo.districtName
            : editOrder.toDistrict.split(',')[1],
          lat: 42.876254,
          lon: 74.604228
        },
        tariff: {
          cost: !Number(test.split(',')[1]) ? order?.tariff.cost : Number(test.split(',')[1]),
          name: !test.split(',')[0] ? order?.tariff.name : test.split(',')[0],
          uid: !test.split(',')[2] ? order?.tariff.uid : test.split(',')[2],
        },
        tariffId: !test.split(',')[2] ? order?.tariffId : test.split(',')[2],
        cancellationReason: "",
        comments: editOrder.commits,
        cost: Number(editOrder.cost),
        cityFilter: !cityId.id ? order?.addressFrom.city : cityId.id,
        cityFrom: !cityId.id ? order?.addressFrom.city : cityId.id,
        cityTo: !cityId2.id ? order?.addressTo.city : cityId2.id,
        courierOne: "",
        courierTwo: "",
        packageType: editOrder.packageType,
        paymentMethod: editOrder.payment,
        paymentStatus: editOrder.paymentStatus == "false" ? false : true,
        receiver: editOrder.toPhone,
        receiverName: editOrder.toName,
        receiverPhone: editOrder.toPhone,
        redemption: Number(editOrder.redemption),
        sender: editOrder.fromPhone,
        senderName: editOrder.fromName,
        senderPhone: editOrder.fromPhone,
        whoPays: Number(editOrder.paymentPerson),
      }
    )
  }
  console.log(tariff2)

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
                        label="Введите номер телефона"
                        variant="outlined"
                        placeholder='Номер отправителя'
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
                        label="Введите имя отправителя"
                        variant="outlined"
                        placeholder='Имя отправителя'
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
                        id="filled-select-currency"
                        select
                        label={`Город/${order?.addressFrom.cityName}`}
                        helperText="Выберите город"
                        variant="outlined"
                        size="small"
                        defaultValue={order?.addressFrom?.cityName}
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
                        id="fromDistrict"
                        select
                        variant="outlined"
                        size='small'
                        defaultValue={order?.fromAdress?.districtName}
                        {...register('fromDistrict')}
                      >
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
                        label="Введите адрес доставки"
                        variant="outlined"
                        placeholder='Адрес'
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
                        label="Введите номер телефона"
                        variant="outlined"
                        placeholder='Номер получателя'
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
                        label="Введите имя получателя"
                        variant="outlined"
                        size="small"
                        placeholder='Имя получателя'
                        helperText={errors?.toName?.message}
                        error={errors?.toName && true}
                        defaultValue={order?.receiverName}
                        {...register('toName', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      />
                      <TextField
                        id="filled-select-currency2"
                        select
                        label={`Город/${order?.addressTo.cityName}`}
                        defaultValue={[order?.addressTo?.cityName, order?.adressTo?.city]}
                        helperText="Выберите город"
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
                        id="outlined-basic"
                        select
                        label="Село/микрорайон"
                        variant="outlined"
                        placeholder='Введите село/микрорайон'
                        // defaultValue={district2 && district2[0]?.name}
                        size="small"
                        defaultValue={''}
                        disabled={!cityId2 ? true : false}
                        {...register('toDistrict')
                        }
                      >
                        {
                          district2?.map((city) => (
                            <option key={city.id} value={[city.id, city.name]}>
                              {city.name}
                            </option>
                          ))
                        }
                      </select>
                      <TextField
                        id="outlined-basic"
                        label="Введите адрес доставки"
                        variant="outlined"
                        size="small"
                        placeholder='Адрес'
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
                          label="Выберите тип посылки"
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
                        <select
                          sx={{ width: '90%' }}
                          id="filled-select-currency"
                          select
                          label="Выберите тариф"
                          defaultValue={order?.tariff.uid}
                          variant="outlined"
                          size="small"
                          onChange={handleChangeTariff}
                        >
                          {
                            tariff?.map((type) => (
                              <option key={type.order} value={[type.name, type.cost, type.order]}>
                                {type.name} ({type.cost}С̲)
                              </option>
                            ))
                          }
                        </select>
                      </Box>
                      <input
                        defaultValue={order?.cost}
                        type="text"
                        value={test.split(',')[1]}
                        // type="number"
                        {...register('cost')}
                      />
                      <TextField
                        id="outlined-basic"
                        label="Выкуп (0 если без выкупа)"
                        variant="outlined"
                        defaultValue={order?.redemption}
                        placeholder='0'
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
                        label="Выберите кто оплачивает"
                        defaultValue={
                          order?.whoPays == '1' ? paymentPerson[0].value : paymentPerson[1].value
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
                          order?.paymentMethod == 'cash' && payment[0].value
                          || order?.paymentMethod == 'mbank' && payment[1].value
                          || order?.paymentMethod == 'optima' && payment[2].value
                          || order?.paymentMethod == 'elsom' && payment[3].value
                          || order?.paymentMethod == 'odengi' && payment[4].value
                          || order?.paymentMethod == 'other' && payment[5].value
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
                        label="Выберите стуст оплаты"
                        defaultValue={order.paymentStatus == false ? false : true}
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