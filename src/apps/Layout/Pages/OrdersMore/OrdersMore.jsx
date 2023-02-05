import React from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Title } from '../../../../components/Title/Title'
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../configs';
import { getDoc } from 'firebase/firestore';
import { BiDetail } from 'react-icons/bi';
import { AiOutlineQrcode, AiFillPhone } from 'react-icons/ai';
import { MdLocationPin, MdFastfood } from 'react-icons/md'
import { Divider, Button, ButtonGroup, Box, Stepper, Step, StepLabel } from '@mui/material';
import { Loader } from '../../../../components/Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { VscError } from 'react-icons/vsc';
import { FiEdit, FiPackage } from 'react-icons/fi';
import './OrdersMore.css'
import { Header } from '../../../../components/Header/Header';
import { CgFileDocument } from 'react-icons/cg'
import { GiMedicines } from 'react-icons/gi'
import { GoPackage } from 'react-icons/go'
import { BiPackage } from 'react-icons/bi'

const OrdersMore = () => {

  const [order, setOrder] = React.useState(null)
  const { id } = useParams()
  const steps = [
    'Подтвержден',
    'Новый',
    'У курьера',
    'B сорт.центре',
    'Доставлен',
  ];

  const getOrder = async () => {
    const docRef = doc(db, 'orders', `${id}`)
    const docSnap = await getDoc(docRef)
    setOrder({ ...docSnap.data(), id: docSnap.id })
  }

  const deleteOrder = async (order) => {
    try {
      const orderRef = doc(db, 'orders', `${order?.id}`)
      await deleteDoc(orderRef)
    } catch (error) {
      console.error(error)
    }
  }

  const navigate = useNavigate()

  React.useEffect(() => {
    getOrder()
  }, [])

  return (
    <>
      <div className="container">
        <Header previous={'Список заказов'} initial='Детали заказа' />
        <Title title={'Детали заказа'} icon={<BiDetail />} />
        <div className="container-inner">
          {
            !order
              ? <Loader />
              : <div className="orders-more-block">
                <div className='orders-more-heading'>
                  <Box sx={{ width: '100%' }}>
                    {
                      order?.status == 'status_cancelled'
                        ? <Stepper activeStep={0} alternativeLabel>
                          <Step>
                            <StepLabel color='error'>Заказ отменен</StepLabel>
                          </Step>
                        </Stepper>
                        : <Stepper activeStep={
                          order?.status == 'status_confirmed' ? 0 : ''
                            || order?.status == 'status_new' && 1
                            || order?.status == 'status_on_courier' && 2
                            || order?.status == 'status_at_sorting_center' && 3
                            || order?.status == 'status_delivered' && 4
                        }
                          alternativeLabel
                        >
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel >{label}</StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                    }
                  </Box>
                </div>
                <Divider />
                <div className='order-more-box'>
                  <div className='order-more-box-heading'>
                    <h4>Отправитель</h4>
                  </div>
                  <div className="order-more-box-body">
                    <div className="order-more-adress">
                      <div>
                        <AiFillPhone size={'20px'} color={'#23A42F'} />
                        <p>{order?.sender}</p>
                        <strong>({order?.senderName})</strong>
                      </div>
                      <div>
                        <MdLocationPin size={'24px'} color={'#23A42F'} />
                        <address>
                          {order?.addressFrom?.cityName}, {order?.addressFrom?.districtName} / {order?.addressFrom?.address}
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className='order-more-box'>
                  <div className='order-more-box-heading'>
                    <h4>Получатель</h4>
                  </div>
                  <div className="order-more-box-body">
                    <div className="order-more-adress">
                      <div>
                        <AiFillPhone size={'20px'} color={'#23A42F'} />
                        <p>{order?.receiver}</p>
                        <strong>({order?.receiverName})</strong>
                      </div>
                      <div>
                        <MdLocationPin size={'24px'} color={'#23A42F'} />
                        <address>
                          {order?.addressTo?.cityName}, {order?.addressTo?.districtName} / {order?.addressTo?.address}
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
                <div className='order-more-box'>
                  <div className='order-more-box-heading'>
                    <h4>Детали заказа</h4>
                  </div>
                  <div className='order-more-box-detail'>
                    <div className='order-detail-wrapper'>
                      <div className='order-tariff-type'>
                        <p>Тариф</p>
                        <h3>{order?.tariff?.name}</h3>
                      </div>
                      <div className='order-tariff-type'>
                        <p>Тип посылки</p>
                        <h3>
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
                            order?.packageType == 'document' && <CgFileDocument />
                            || order?.packageType == 'medicine' && <GiMedicines />
                            || order?.packageType == 'large_box' && <GoPackage />
                            || order?.packageType == 'small_box' && <BiPackage />
                            || order?.packageType == 'box' && <FiPackage />
                            || order?.packageType == 'food' && <MdFastfood />
                          }
                        </h3>
                      </div>
                    </div>
                    <ul className='order-detail-list'>
                      <li>
                        <span>Оплачивает:</span>
                        <span>{order?.whoPays == '1' ? 'Отправитель' : 'Получатель'}</span>
                      </li>
                      <li>
                        <span>Способ оплаты:</span>
                        <span>
                          {
                            order?.paymentMethod == 'cash' && 'Наличнымим'
                            || order?.paymentMethod == 'mbank' && 'МБАНК'
                            || order?.paymentMethod == 'optima' && 'Оптима'
                            || order?.paymentMethod == 'odengi' && 'О! Деньги'
                            || order?.paymentMethod == 'elsom' && 'Элсом'
                            || order?.paymentMethod == 'other' && 'Другое'
                          }
                        </span>
                      </li>
                      <li>
                        <span>Стоимость доставки:</span>
                        <span>{order?.cost}⃀</span>
                      </li>
                      <li>
                        <span>Выкуп:</span>
                        <span>{order?.redemption}⃀</span>
                      </li>
                      <li>
                        <span>Статус оплаты:</span>
                        <span>{order?.paymentStatus == false ? 'Не оплачен' : 'Оплачен'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <Divider />
                <div className="order-more-btns">
                  <ButtonGroup sx={{ "gap": "4px" }}>
                    <Button
                      variant='contained'
                      color='success'
                      sx={{ "gap": "4px" }}
                      onClick={() => navigate(`/orders/edit/${id}`)}
                    >
                      Редактировать
                      <FiEdit />
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      sx={{ "gap": "4px" }}
                      onClick={e => deleteOrder(order)}
                    >
                      Удалить заказ
                      <AiFillDelete />
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      sx={{ "gap": "4px" }}
                    >
                      Отменить заказ
                      <VscError />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default OrdersMore