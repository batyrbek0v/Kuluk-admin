import React from 'react'
import { GrBike } from 'react-icons/gr'
import { FaWalking } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa'
import { MdDeliveryDining } from 'react-icons/md'
import { TbTruckDelivery } from 'react-icons/tb'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';



export const sideList = [
  { id: 1, icon: <AssessmentIcon />, title: 'Статистика', path: '/' },
  { id: 2, icon: <AiOutlinePlusCircle size={18} />, title: 'Создать заказ', path: '/addorder' },
  { id: 3, icon: <FaClipboardList size={18} />, title: 'Список заказов', path: '/orders' },
  { id: 4, icon: <AiOutlinePlusCircle size={18} />, title: 'Создать курьера', path: '/addcourier' },
  { id: 5, icon: <FaClipboardList size={18} />, title: 'Список курьеров', path: '/couriers' },
  { id: 6, icon: <AdminPanelSettingsIcon />, title: 'Админ панель', path: '/admin' },
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
  { id: 1, value: 'По городу', title: 'По городу (150С̲)', },
  { id: 2, value: 'Жилмассив', title: 'Жилмассив (220С̲)', },
  { id: 3, value: 'От двери до двери', title: 'От двери до двери (180С̲)', },
  { id: 4, value: 'Регионы', title: 'Регионы (300С̲)', },
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
  { id: 1, value: "false", title: 'Не оплачен', },
  { id: 2, value: "true", title: 'Оплачен', },
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
// ORDER-TABLE=====================

export const orderLabels = [
  { id: 1, name: '#ID' },
  { id: 2, name: 'Дата' },
  { id: 3, name: 'Статус' },
  { id: 4, name: 'Тип заказа' },
  { id: 5, name: 'Стоимость' },
  { id: 6, name: 'Метод оплаты' },
  { id: 7, name: 'Статус оплаты' },
]
export const columnCount = [
  { id: 1, name: 10 },
  { id: 2, name: 15 },
  { id: 3, name: 20 },
]


// ---------------------------------------------------------------

// SORTING-ORDER-LIST

// SORT-BY-COST

export const sortByCostList = [
  { id: 1, value: 150, name: '150С̲', },
  { id: 2, value: 180, name: '180С̲', },
  { id: 3, value: 220, name: '220С̲', },
  { id: 4, value: 300, name: '300С̲', },
]

// ORDER-STATUS 

export const orderStatus = [
  { name: 'Новый', value: 'status_new', },
  { name: 'Подтвержден', value: 'status_confirmed', },
  { name: 'Прибыл к отправителю', value: 'status_arrived_sender', },
  { name: 'У курьера', value: 'status_on_courier', },
  { name: 'В сорт.центре', value: 'status_at_sorting_center', },
  { name: 'В пути', value: 'status_on_way_cc', },
  { name: 'В сорт.центре2', value: 'status_at_sorting_center2', },
  { name: 'У курьера2', value: 'status_on_courier2', },
  { name: 'Прибыл к получателю', value: 'status_arrived_receiver', },
  { name: 'Доставлен', value: 'status_delivered', },
  { name: 'Отклонен', value: 'status_rejected', },
  { name: 'Отменен', value: 'status_cancelled', },
]