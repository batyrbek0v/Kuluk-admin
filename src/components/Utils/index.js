import React from 'react'
import { GrBike } from 'react-icons/gr'
import { FaWalking } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa'
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
  { id: 2, icon: <LibraryAddIcon fontSize="small" />, title: 'Добавить заказ', path: '/addorder' },
  { id: 3, icon: <FaClipboardList size={"18px"} />, title: 'Список заказов', path: '/orders' },
  { id: 4, icon: <PersonAddAlt1Icon />, title: 'Добавить курьера', path: '/addcourier' },
  { id: 5, icon: <BsTable />, title: 'Таблица курьеров', path: '/couriers' },
  { id: 6, icon: <AdminPanelSettingsIcon />, title: 'Админ панель', path: '/admin' },
  { id: 7, icon: <ExitToAppIcon />, title: 'Выйти', event: handleSignOut },
]

export const courierType = [
  { id: 1, icon: <FaWalking />, title: 'Пеший', },
  { id: 2, icon: <GrBike />, title: 'На велике', },
  { id: 3, icon: <MdDeliveryDining />, title: 'На мопеде', },
  { id: 4, icon: <TbTruckDelivery />, title: 'На машине', },
]


// ---------------------------------------------------------------

// ORDER-UNPUT==================================
export const typeOfOrder = [
  { id: 1, value: 'document', name: 'Документ', },
  { id: 2, value: 'medicine', name: 'Лекарство', },
  { id: 3, value: 'food', name: 'Еда', },
  { id: 4, value: 'small_box', name: 'Маленькая коробка', },
  { id: 5, value: 'box', name: 'Коробка', },
  { id: 6, value: 'large_box', name: 'Большая коробка', },
  { id: 7, value: 'other', name: 'Другое', },
]
export const orderTariff = [
  { id: 1, value: 'По городу', title: 'По городу (150⃀)', },
  { id: 2, value: 'Жилмассив', title: 'Жилмассив (220⃀)', },
  { id: 3, value: 'От двери до двери', title: 'От двери до двери (180⃀)', },
  { id: 4, value: 'Регионы', title: 'Регионы (300⃀)', },
]
export const payment = [
  { id: 1, value: "cash", title: 'Наличными', },
  { id: 2, value: "mbank", title: 'МБАНК', },
  { id: 3, value: "optima", title: 'Оптима', },
  { id: 5, value: "elsom", title: 'Элсом', },
  { id: 4, value: "odengi", title: 'О!-деньги', },
  { id: 6, value: "other", title: 'Другое', },
]

export const paymentStatus = [
  { id: 1, value: false, title: 'Не оплачен', },
  { id: 2, value: true, title: 'Оплачен', },
]
export const paymentPerson = [
  { id: 1, value: '1', title: 'Отправитель', },
  { id: 2, value: '2', title: 'Получатель', },
]
// ORDER-UNPUT==================================

// ---------------------------------------------------------------

// COURIERS-AND-ORDER-TABLE=====================
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
// COURIERS-AND-ORDER-TABLE=====================

// ---------------------------------------------------------------

// SORTING-ORDER-LIST

// SORT-BY-COST

export const sortByCostList = [
  // { id: 1, name: 'Все', title: 'Отправитель', },
  // { id: 2, name: 'По убыванию', title: 'Отправитель', },
  // { id: 3, name: 'По возростанию', title: 'Получатель', },
  // { id: 2, name: 'Все', title: 'Получатель', },
  { id: 1, name: 150, title: 'Получатель', },
  { id: 2, name: 180, title: 'Получатель', },
  { id: 3, name: 220, title: 'Получатель', },
  { id: 4, name: 300, title: 'Получатель', },
]