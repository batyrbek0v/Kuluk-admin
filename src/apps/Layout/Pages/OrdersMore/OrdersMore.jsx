import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { AiFillCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { BiDetail, BiPackage } from 'react-icons/bi';
import { CgFileDocument } from 'react-icons/cg'
import { GoPackage } from 'react-icons/go'
import { GiMedicines } from 'react-icons/gi'
import { FiPackage } from 'react-icons/fi';
import { MdFastfood } from 'react-icons/md'
import { db } from '../../../../configs';
import { Title } from '../../../../components/Title/Title'
import { Loader } from '../../../../components/Loader/Loader';
import { Header } from '../../../../components/Header/Header';
import './OrdersMore.scss'
import {
  Divider,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';

const OrdersMore = () => {

  const [order, setOrder] = React.useState(null)
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const steps = [
    'Новый',
    'Подтвержден',
    'У курьера',
    'B сорт.центре',
    'Доставлен',
  ];

  const dateTransform = new Date(+order?.dateCreated?.seconds * 1000)

  console.log(+order?.dateCreated?.seconds * 1000)

  const time = {
    day: dateTransform?.getDate(),
    month: dateTransform?.getMonth(),
    year: dateTransform?.getFullYear(),
    hour: dateTransform?.getHours(),
    minutes: dateTransform?.getMinutes(),
  }

  const getOrder = async () => {
    const docRef = doc(db, 'orders', `${id}`)
    const docSnap = await getDoc(docRef)
    setOrder({ ...docSnap.data(), id: docSnap.id })
  }

  const deleteOrder = async (id) => {
    setOpen(!open);

    try {
      const orderRef = doc(db, 'orders', `${id}`)
      setTimeout(async () => {
        await deleteDoc(orderRef)
        alert('Заказ удален, нажмите на "ok" чтобы перейти к заказам')

        if (alert) {
          navigate('/orders')
        }

      }, 1000)

      // if (message) {
      // navigate('/orders')
      // console.log('true')
      // }
      // if (message == true) {
      //   navigate('/orders')
      // }

    } catch (error) {
      alert(error.message)
    }

    if (id) {
      setDeleting(true)
    }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    getOrder()
  }, [])

  console.log(order)

  return (
    <>
      <div className="container">
        <Header previous={'Список заказов'} initial='Детали заказа' />
        <Title title={'Детали заказа'} icon={<BiDetail />} />
        <div className="container-inner">
          {
            !order
              ? <Loader />
              :
              <div className="orders-more-wrapper">
                <div className={!deleting ? "orders-more-box" : "orders-more-box deleting"}>
                  <div className="orders-more-box-header">
                    <h3>Статус заказа</h3>
                  </div>
                  <Divider />
                  <Box sx={{ width: '100%' }}>
                    {
                      order?.status == 'status_cancelled'
                        ? <Stepper activeStep={0} alternativeLabel>
                          <Step>
                            <StepLabel color='error'>Заказ отменен</StepLabel>
                          </Step>title
                        </Stepper>
                        : <Stepper activeStep={
                          order?.status == 'status_new' ? 0 : ''
                            || order?.status == 'status_confirmed' && 1
                            || order?.status == 'status_on_courier' && 2
                            || order?.status == 'status_at_sorting_center' && 3
                            || order?.status == 'status_delivered' && 5
                        }
                          alternativeLabel
                        >
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                    }
                  </Box>
                </div>
                <div className={!deleting ? "orders-more-box address" : "orders-more-box deleting"}>
                  <div className="orders-more-box-header">
                    <h3>Отправитель</h3>
                  </div>
                  <Divider />
                  {/* <div className="orders-more-box-body"> */}
                  <ul className="orders-more-body-list">
                    <li><span>Имя</span><span>{order?.senderName}</span></li>
                    <Divider />
                    <li><span>Номер телефона</span><span>{order?.sender}</span></li>
                    <Divider />
                    <li><span>Город</span><span>{order?.addressFrom.cityName}</span></li>
                    <Divider />
                    <li>
                      <span>Регион/село</span>
                      <span>
                        {
                          order?.addressFrom.districtName
                            ? order?.addressFrom.districtName
                            : '----------'
                        }
                      </span>
                    </li>
                    <Divider />
                    <li><span>Адрес отправки</span><span>{order?.addressFrom.address}</span></li>
                  </ul>
                  {/* </div> */}
                </div>
                <div className={!deleting ? "orders-more-box address" : "orders-more-box deleting"}>
                  <div className="orders-more-box-header">
                    <h3>Получатель</h3>
                  </div>
                  <Divider />
                  {/* <div className="orders-more-box-body"> */}
                  <ul className="orders-more-body-list">
                    <li><span>Имя</span><span>{order?.receiverName}</span></li>
                    <Divider />
                    <li><span>Номер телефона</span><span>{order?.receiver}</span></li>
                    <Divider />
                    <li><span>Город</span><span>{order?.addressTo.cityName}</span></li>
                    <Divider />
                    <li>
                      <span>Регион/село</span>
                      <span>
                        {
                          order?.addressTo.districtName
                            ? order?.addressTo.districtName
                            : '----------'
                        }
                      </span>
                    </li>
                    <Divider />
                    <li><span>Адрес отправки</span><span>{order?.addressTo.address}</span></li>
                  </ul>
                  {/* </div> */}
                </div>
                <div className={!deleting ? "orders-more-box" : "orders-more-box deleting"}>
                  <div className="orders-more-box-header">
                    <h3>Детали заказа</h3>
                  </div>
                  <Divider />
                  <ul className="orders-more-body-list">
                    <li><span>ID</span><span>{order?.id}</span></li>
                    <Divider />
                    <li>
                      <span>Дата</span>
                      <span>
                        {time.day < 10 && '0'}{time.day}
                        /{time.month < 10 && '0'}{time.month + 1}
                        /{time.year} {time.hour < 10 ? '0' : ''}
                        {time.hour}:{time.minutes < 10 && '0'}
                        {time.minutes}
                      </span>
                    </li>
                    <Divider />
                    <li>
                      <span>Тип посылки</span>
                      <span className='order-more-list-type'>
                        {
                          order?.packageType == 'document' && 'Документ'
                          || order?.packageType == 'medicine' && 'Лекарство'
                          || order?.packageType == 'large_box' && 'Большая коробка'
                          || order?.packageType == 'small_box' && 'Маленькая коробка'
                          || order?.packageType == 'box' && 'Коробка'
                          || order?.packageType == 'food' && 'Еда'
                          || order?.packageType == 'other' && 'Другое'
                        }
                        {
                          order?.packageType == 'document' && <CgFileDocument size={18} color="#3A46D6" />
                          || order?.packageType == 'medicine' && <GiMedicines size={18} color="#b42318" />
                          || order?.packageType == 'large_box' && <GoPackage size={18} color="#f0ad4e" />
                          || order?.packageType == 'small_box' && <BiPackage size={18} color="#f0ad4e" />
                          || order?.packageType == 'food' && <MdFastfood size={18} color="#0b815a" />
                          || order?.packageType == 'box' && <FiPackage size={18} color="#f0ad4e" />
                        }
                      </span>
                    </li>
                    <Divider />
                    <li>
                      <span>Платежное лицо</span>
                      <span>
                        {
                          order?.whoPays == '1' ? 'Отправитель' : 'Получатель'
                        }
                      </span>
                    </li>
                    <Divider />
                    <li>
                      <span>Метод оплаты</span>
                      <span>
                        {
                          order?.paymentMethod == 'cash' && 'Наличными'
                          || order?.paymentMethod == 'mbank' && 'МБАНК'
                          || order?.paymentMethod == 'optima' && 'Оптима'
                          || order?.paymentMethod == 'odengi' && 'О!Деньги'
                          || order?.paymentMethod == 'elsom' && 'Элсом'
                          || order?.paymentMethod == 'schet_faktura' && 'Счет фактура'
                          || order?.paymentMethod == 'other' && 'Другое'
                        }
                      </span>
                    </li>
                    <Divider />
                    <li>
                      <span>Статус оплаты</span>
                      <span className="order-more-list-type">
                        {!order?.paymentStatus ? 'Не оплачен' : 'Оплачен'}
                        {
                          !order?.paymentStatus
                            ? <AiFillCloseCircle size={18} color="#b42318" />
                            : <AiFillCheckCircle size={18} color="#0b815a" />
                        }
                      </span>
                    </li>
                    <Divider />
                    <li><span>Выкуп</span><span>{order?.redemption}С̲</span></li>
                    <Divider />
                    <li><span>Сумма</span><span>{order?.cost}С̲</span></li>
                    <Divider />
                    <li className='order-more-list-comments'>
                      <span>Коментарии</span>
                      <span>{order?.comments ? order?.comments : '----------'}</span>
                    </li>
                  </ul>
                </div>
                <div className={!deleting ? "orders-more-box actions" : "orders-more-box deleting"}>
                  <Button variant='contained' onClick={handleClickOpen}>Удалить</Button>
                  <Button variant='contained' onClick={() => navigate(`/orders/edit/${id}`)}>Редактировать</Button>
                </div>
              </div>
          }
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Вы уверены что хотите удалить заказ?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClickClose}>Отмена</Button>
              <Button onClick={() => deleteOrder(id)} autoFocus>
                Удалить
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default OrdersMore