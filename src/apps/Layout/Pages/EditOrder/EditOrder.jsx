import React from 'react'
import { Title } from './../../../../components/Title/Title';
import { FiEdit } from 'react-icons/fi';
import { Loader } from './../../../../components/Loader/Loader';
import { TextField, Box, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../../../../configs';
import { FormValidation } from '../../../../components/Form/FormValidation/exports';
import { orderTariff, paymentPerson, paymentStatus, typeOfOrder } from '../../../../components/Utils';
import { payment } from './../../../../components/Utils/index';
import { useParams } from 'react-router-dom';

const EditOrder = () => {


  const { id } = useParams()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const citiesRef = collection(db, "city")
  const villageRef = collection(db, "village")

  const [order, setOrder] = React.useState(null)
  const [city, setCity] = React.useState(null)
  const [cityId, setCityId] = React.useState('')
  const [cityId2, setCityId2] = React.useState('')
  const [district, setDistrict] = React.useState(null)
  const [district2, setDistrict2] = React.useState(null)

  const handleChange = (e) => {
    setCityId(e.target.value)
  }
  const handleChange2 = (e) => {
    setCityId2(e.target.value)
  }

  const getOrders = async () => {
    const docRef = doc(db, 'orders', `${id}`)
    const docSnap = await getDoc(docRef)
    setOrder({ ...docSnap.data(), id: docSnap.id })
  }


  const handleEditOrder = async (order) => {
    try {
      const orderRef = updateDoc(doc(db, 'orders', `${id}`),
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
            cost: order.cost,
            name: order.orderTariff,
            cost: order.cost,
          },
          cancellationReason: "",
          comments: order.commits,
          cost: order.cost,
          cityFrom: cityId[0],
          cityTo: cityId2[0],
          cityFilter: cityId[0],
          courierOne: "",
          courierTwo: "",
          packageType: order.orderType,
          paymentMethod: order.payment,
          paymentStatus: order.paymentStatus,
          receiver: order.toPhone,
          receiverName: order.toName,
          receiverPhone: order.toPhone,
          redemption: order.redemption,
          sender: order.fromPhone,
          senderName: order.fromName,
          senderPhone: order.fromPhone,
          whoPays: order.paymentPerson,
        }
      )
    } catch (e) {
      console.log(e.message)
    } finally {
      reset()
    }
  }


  React.useEffect(() => {

    const getCity = async () => {
      const data = await getDocs(citiesRef)
      setCity(data?.docs?.map((doc, index) => ({ ...doc?.data() })))
    }

    const getDist = async () => {
      const q = query(villageRef, where("district", "==", cityId[0] && cityId[0]));
      const base = await getDocs(q)
      setDistrict(base?.docs?.map((doc) => ({ ...doc?.data() })))
    }
    const getDist2 = async () => {
      const q = query(villageRef, where("district", "==", cityId2[0] && cityId2[0]));
      const base = await getDocs(q)
      setDistrict2(base?.docs?.map((doc) => ({ ...doc?.data() })))
    }

    getOrders()
    getCity()
    getDist(cityId)
    getDist2(cityId2)

  }, [cityId, cityId2])


  return (
    <>
      <div className="container">
        <Title title={'Редактирование заказа'} icon={<FiEdit />} />
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
                      defaultValue={order?.addressFrom.city}
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
                      placeholder='Введите село/микрорайон'
                      defaultValue={''}
                      disabled={!cityId ? true : false}
                      {...register('fromDistrict')
                      }
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
                      placeholder='Адрес'
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
                      defaultValue={order?.addressTo.cityName}
                      helperText="Выберите город"
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
                      placeholder='Введите село/микрорайон'
                      // defaultValue={district2 && district2[0]?.name}
                      defaultValue={''}
                      disabled={!cityId2 ? true : false}
                      {...register('toDistrict')
                      }
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
                        // {...register('city')}
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
                        defaultValue={order?.tariff.name}
                        variant="outlined"
                        size="small"
                        {...register('orderTariff', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      >
                        {orderTariff.map((type) => (
                          <MenuItem key={type.id} value={type.value}>
                            {type.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <TextField
                      id="outlined-basic"
                      label="Выкуп (0 если без выкупа)"
                      variant="outlined"
                      defaultValue={order?.redemption}
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
                      defaultValue={order?.cost}
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
                      rows={7}
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
                Оформить заказ
              </Button>
            </form>
        }
      </div>
    </>
  )
}

export default EditOrder