import React from 'react'
import { GrBike } from 'react-icons/gr'
import { AiFillHome, AiOutlineClose, AiOutlineUserAdd } from 'react-icons/ai'
import { FaUserPlus, FaWalking } from 'react-icons/fa'
import { BiMessageSquareDetail, BiEdit } from 'react-icons/bi'
import { GoSignOut } from 'react-icons/go'
import { MdDeliveryDining } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsPeopleFill } from 'react-icons/bs'
import { handleSignOut } from '../../configs'
import deliveryMan from '../../assets/icons/delivery-man.png'


export const sideList = [
  { id: 1, icon: <AiFillHome />, title: 'Статистика', path: '/' },
  { id: 2, icon: <FaUserPlus />, title: 'Добавить курьера', path: '/addcourier' },
  { id: 3, icon: <BsPeopleFill />, title: 'Курьеры', path: '/couriers' },
  { id: 4, icon: <BiEdit />, title: 'Изменение', path: '/edit' },
  { id: 5, icon: <GoSignOut />, title: 'Выйти', event: handleSignOut },
  // { id: 6, icon: <AiOutlineClose />, title: 'Отмененные заказы', path: '/cancelledOrders' },
  // { id: 7, icon: <AiOutlineUserAdd />, title: 'Добавить курьера', path: '/addcourier' },
]
export const courierType = [
  { id: 1, icon: <FaWalking />, title: 'Пеший', },
  { id: 2, icon: <GrBike />, title: 'На велике', },
  { id: 3, icon: <MdDeliveryDining />, title: 'На мопеде', },
  { id: 4, icon: <TbTruckDelivery />, title: 'На машине', },
]
export const cities = [
  { id: 1, title: 'Бишкек', },
  { id: 2, title: 'Ош', },
  { id: 3, title: 'Джалал-Абад', },
  { id: 4, title: 'Нарын', },
  { id: 5, title: 'Чуй', },
  { id: 6, title: 'Баткен', },
  { id: 7, title: 'Исык-Куль', },
]
