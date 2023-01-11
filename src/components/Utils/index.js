import React from 'react'
import { GrBike } from 'react-icons/gr'
import { AiFillHome, AiOutlineClose, AiOutlineUserAdd } from 'react-icons/ai'
import { FaUserPlus, FaWalking, FaUserEdit } from 'react-icons/fa'
import { BiMessageSquareDetail, BiEdit } from 'react-icons/bi'
import { GoSignOut } from 'react-icons/go'
import { FcAssistant } from 'react-icons/fc'
import { MdDeliveryDining } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import { BsTable } from 'react-icons/bs'
import { handleSignOut } from '../../configs'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const sideList = [
  { id: 1, icon: <AssessmentIcon />, title: 'Статистика', path: '/' },
  { id: 2, icon: <PersonAddAlt1Icon />, title: 'Добавить курьера', path: '/addcourier' },
  { id: 3, icon: <LibraryAddIcon fontSize="small" />, title: 'Добавить заказ', path: '/addorder' },
  { id: 4, icon: <BsTable />, title: 'Таблица курьеров', path: '/couriers' },
  { id: 5, icon: <AdminPanelSettingsIcon />, title: 'Админ панель', path: '/admin' },
  { id: 6, icon: <ExitToAppIcon />, title: 'Выйти', event: handleSignOut },
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

export const courierTableList = [
  { field: 'id', headerName: '#ID', width: 70 },
  { field: 'name', headerName: 'Имя', width: 130 },
  { field: 'surName', headerName: 'Фамилия', width: 130, },
  { field: 'type', headerName: 'Тип', width: 130, sortable: false, },
  { field: 'city', headerName: 'Город', width: 130, sortable: false, },
  { field: 'raiting', headerName: 'Рейтинг', width: 130, },
  {
    field: 'online', headerName: 'Статус', width: 130, sortable: false,
    valueGetter: (params) => `${params.row.online === false ? 'Оффлайн' : `Онлайн`}`
  },
  {
    field: 'number', headerName: 'Номер телефона', sortable: false, width: 160,
  },
];
