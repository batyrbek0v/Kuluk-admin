import React from 'react'
import { Title } from '../../../../components/Title/Title'
import './AddOrder.css'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Button, TextField, MenuItem, Box } from '@mui/material';
import { cities, orderTariff, payment, paymentPerson, paymentStatus, typeOfOrder } from '../../../../components/Utils';
import { useForm } from 'react-hook-form';
import { FormValidation } from './../../../../components/Form/FormValidation/exports';
import { addDoc, collection, doc, getDoc, getDocs, query, QuerySnapshot, setDoc, where } from 'firebase/firestore';
import { db } from '../../../../configs';
import { Loader } from '../../../../components/Loader/Loader';
import { async } from '@firebase/util';

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
  const [district, setDistrict] = React.useState(null)

  const citiesRef = collection(db, "city")

  const villageRef = collection(db, "village")

  const handleChange = (e) => {
    // console.log(event.target)
    setCityId(e.target.value)
  }




  const handlePostOrder = async (order) => {
    try {
      const docRef = await addDoc(collection(db, 'orders'),
        {
          adressFrom: {
            adress: order.fromAdress,
            city: cityId[0],
            cityName: cityId[1],
            districtName: order.fromDistrict[0],
            district: order.fromDistrict[1],
          },
          adressTo: {
            adress: order.toAdress,
            city: order.toCity,
            district: order.toDistrict,
          },
          tariff: {
            cost: order.cost,
            name: order.orderTariff,
            cost: order.cost,
          },
          comments: order.commits,
          cost: order.cost,
          courierOne: order.fromPhone,
          courierTwo: order.toPhone,
          paymentMethod: order.payment,
          whoPays: order.paymentPerson,
          paymentStatus: order.paymentStatus == 'Оплачено' ? true : false,
          packageType: order.orderType,
          dataCreated: date,
          sandlerName: order.fromName,
          recieverName: order.toName
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

      const q = query(villageRef, where("district", "==", cityId[0]));


      const base = await getDocs(q)
      // console.log(base)
      // const newBase = base.forEach(doc => {
      //   console.log(doc.data())
      // });

      // setDistrict(base && base?.map((doc) => ({ ...doc?.data() })))

      setDistrict(base?.docs?.map((doc) => ({ ...doc?.data() })))

    }
    getCity()
    getDist(cityId)
  }, [cityId])


  const sortCity = city?.sort((a, b) => {
    if (a['id'] < b['id']) return -1
  })

  // console.log(district)

  return (
    <>
      <div className="container">
        <Title title={'Добавить заказ'} icon={<LibraryAddIcon fontSize='meduim' />} />
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
                      {...register('fromName', {
                        required: FormValidation.RequiredInput.required,
                      })
                      }
                    />
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Город/район"
                      helperText="Выберите город"
                      variant="outlined"
                      size="small"
                      defaultValue={city[0].id}
                      onChange={handleChange}
                    // {...register('fromCity',
                    //   {
                    //     required: FormValidation.RequiredInput.required,
                    //   })
                    // }
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
                      defaultValue={district && district[0]?.name}
                      disabled={!cityId ? true : false}
                      {...register('fromDistrict', {
                        required: FormValidation.RequiredInput.required
                      })
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
                      {...register('toName', {
                        required: FormValidation.RequiredInput.required,
                      })
                      }
                    />
                    <TextField
                      id="filled-select-currency"
                      select
                      label="Город/район"
                      defaultValue={city[1].name}
                      helperText="Выберите тип курьера"
                      variant="outlined"
                      size="small"
                      error={errors?.toCity && true}
                      {...register('toCity', {
                        required: FormValidation.RequiredInput.required,
                      })
                      }
                    >
                      {
                        city?.map((city) => (
                          <MenuItem key={city.id} value={city.name}>
                            {city.name}
                          </MenuItem>
                        ))
                      }
                    </TextField>
                    <TextField
                      id="outlined-basic"
                      label="Село/микрорайон"
                      variant="outlined"
                      placeholder='Введите село/микрорайон'
                      // error={errors?.fromAdress ? true : false}
                      // helperText={errors ? errors?.fromAdress?.message : ''}
                      {...register('toDistrict', {
                        required: FormValidation.RequiredInput.required
                      })
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Введите адрес доставки"
                      variant="outlined"
                      placeholder='Адрес'
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
                        defaultValue="По городу (150⃀)"
                        variant="outlined"
                        size="small"
                        {...register('orderTariff', {
                          required: FormValidation.RequiredInput.required,
                        })
                        }
                      >
                        {orderTariff.map((type) => (
                          <MenuItem key={type.id} value={type.title}>
                            {type.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    <TextField
                      id="outlined-basic"
                      label="Выкуп (0 если без выкупа)"
                      variant="outlined"
                      defaultValue={0}
                      placeholder='0'
                      type="number"
                      {...register('buyOut', {
                        required: FormValidation.RequiredInput.required,
                      })
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Введите стоимость доставки"
                      variant="outlined"
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
                      rows={7}
                      {...register('commits', {
                        required: FormValidation.RequiredInput.required,
                      })
                      }
                    />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSubmit(data => handlePostOrder(data))}
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

export default AddOrder