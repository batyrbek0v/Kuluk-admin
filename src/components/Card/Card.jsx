import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline, MdHistory } from 'react-icons/md';
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { db } from '../../configs';
import { orderStatus } from '../Utils';
import './Card.scss'
import {
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  collection
} from 'firebase/firestore';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField
} from '@mui/material';

const Card = ({
  id,
  dateCreated,
  status,
  packageType,
  paymentMethod,
  paymentStatus,
  cost
}) => {

  const navigate = useNavigate()

  const dateTransform = new Date(+dateCreated?.seconds * 1000)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [statusPopUp, setStatusPopUp] = React.useState(false)
  const [statusValue, setStatusValue] = React.useState('')

  const time = {
    day: dateTransform?.getDate(),
    month: dateTransform?.getMonth(),
    year: dateTransform?.getFullYear(),
    hour: dateTransform?.getHours(),
    minutes: dateTransform?.getMinutes(),
  }

  const openAction = Boolean(anchorEl)

  const deleteOrder = async (id) => {
    try {
      const orderRef = doc(db, 'orders', `${id}`)

      setTimeout(async () => {
        await deleteDoc(orderRef)
        await addDoc(collection(db, 'orders', id, 'history'), {
          date: new Date,
          description: `Админ удалил заказ`
        })
      }, 1000)

    } catch (error) {
      console.error(error);
    }

    if (id) {
      setDeleting(true)
    }

    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClosePopUp = () => {
    setAnchorEl(null)
    setOpen(false);
  };

  const handleOpenStatusPopUp = () => {
    setStatusPopUp(true)
  }

  const handleCloseStatusPopUp = () => {
    setStatusPopUp(false)
  }

  const handleChangeStatus = async () => {
    try {
      setStatusPopUp(false)
      await updateDoc(doc(db, 'orders', id),
        {
          status: statusValue,
          statusFilter: [statusValue],
        }
      )

      await addDoc(collection(db, 'orders', id, 'history'), {
        date: new Date,
        description: `Админ изменил статус заказа на ${statusValue}`
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
      <div
        className={!deleting ? 'orders-card' : 'orders-card deleting'}
        onDoubleClick={() => navigate(`/more/orders/${id}`)}
      >
        <div className="orders-card-values">
          <p>{id?.length > 10 && id?.slice(0, 12)}...</p>
        </div>
        <div className="orders-card-values">
          <time>
            {time.day < 10 && '0'}{time.day}
            .{time.month < 10 && '0'}{time.month + 1}
            .{time.year} / {time.hour < 10 ? '0' : ''}
            {time.hour}:{time.minutes < 10 && '0'}
            {time.minutes}
          </time>
        </div>
        <div
          onClick={handleOpenStatusPopUp}
          className=
          {
            status === 'status_new' ? 'orders-card-values status_order new-order' : ''
              || status === 'status_confirmed' ? 'orders-card-values status_order confirmed-order' : ''
                || status === 'status_arrived_sender' ? 'orders-card-values status_order arrived-sender-order' : ''
                  || status === 'status_on_courier' ? 'orders-card-values status_order on-courier-order' : ''
                    || status === 'status_at_sorting_center' ? 'orders-card-values status_order at-sorting-order' : ''
                      || status === 'status_on_way_cc' ? 'orders-card-values status_order on-way' : ''
                        || status === 'status_at_sorting_center2' ? 'orders-card-values status_order at-sorting-order' : ''
                          || status === 'status_on_courier2' ? 'orders-card-values status_order on-courier-order' : ''
                            || status === 'status_arrived_receiver' ? 'orders-card-values status_order arrived-receiver-order' : ''
                              || status === 'status_delivered' ? 'orders-card-values status_order delivered-order' : ''
                                || status === 'status_rejected' ? 'orders-card-values status_order rejected-order' : ''
                                  || status === 'status_cancelled' ? 'orders-card-values status_order cancelled-order' : ''
          }
        >
          <p>
            {
              status === 'status_new' && 'Новый'
              || status === 'status_confirmed' && 'Подтвержден'
              || status === 'status_arrived_sender' && 'Прибыл к отправ'
              || status === 'status_on_courier' && 'У курьера'
              || status === 'status_at_sorting_center' && 'B сорт.центре'
              || status === 'status_on_way_cc' && 'В пути'
              || status === 'status_at_sorting_center2' && 'B сорт.центре(2)'
              || status === 'status_on_courier2' && 'У курьера(2)'
              || status === 'status_arrived_receiver' && 'Прибыл к получ'
              || status === 'status_delivered' && 'Доставлен'
              || status === 'status_rejected' && 'Отклонен'
              || status === 'status_cancelled' && 'Отменен'
            }
          </p>
        </div>
        <div className='orders-card-values'>
          <p>
            {
              (packageType === 'document' && 'Документ')
              || packageType === 'medicine' && 'Лекарство'
              || packageType === 'large_box' && 'L коробка'
              || packageType === 'small_box' && 'S коробка'
              || packageType === 'box' && 'M коробка'
              || packageType === 'food' && 'Еда'
              || packageType === 'other' && 'Другое'
            }
          </p>
        </div>
        <div className='orders-card-values'>
          <p>{cost}⃀</p>
        </div>
        <div className='orders-card-values'>
          <p>
            {
              (paymentMethod === 'cash' && 'Наличными')
              || paymentMethod === 'mbank' && 'МБАНК'
              || paymentMethod === 'optima' && 'Оптима'
              || paymentMethod === 'odengi' && 'О!Деньги'
              || paymentMethod === 'elsom' && 'Элсом'
              || paymentMethod === 'schet_faktura' && 'Счет фактура'
              || paymentMethod === 'other' && 'Другое'
            }
          </p>
        </div>
        <div className={
          !paymentStatus ? 'orders-card-values status_order not-paid' : 'orders-card-values status_order paid'
        }
        >
          <p>
            {!paymentStatus ? 'Не оплачен' : 'Оплачен'}
          </p>
        </div>
        <div className="order-card-actions">
          <IconButton
            id="long-button"
            aria-haspopup="true"
            aria-controls={openAction ? 'long-menu' : undefined}
            aria-expanded={openAction ? 'true' : undefined}
            className="order-card-actions-btn"
            onClick={handleOpen}
          >
            <FiMoreHorizontal />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={openAction}
            onClose={handleClosePopUp}
            PaperProps={{
              style: {
                width: '5ch',
              },
            }}
          >
            <MenuItem onClick={handleClickOpen}>
              <div className='order-card-actions-menu'>
                <MdDeleteOutline size={'20px'} color='#3A46D6' />
              </div>
            </MenuItem>
            <MenuItem onClick={() => navigate(`/orders/edit/${id}`)} className="order-card-actions-menu">
              <div className='order-card-actions-menu'>
                <FiEdit color='#3A46D6' />
              </div>
            </MenuItem>
            <MenuItem onClick={() => navigate(`/orders/history/${id}`)} className="order-card-actions-menu">
              <div className='order-card-actions-menu'>
                <MdHistory size={'20px'} color='#3A46D6' />
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Dialog open={statusPopUp} onClose={handleCloseStatusPopUp}>
        <DialogTitle>Нажмите на поле чтобы изменить статус заказа</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            defaultValue={status}
            size='small'
            onChange={e => setStatusValue(e.target.value)}
          >
            {orderStatus.map((status) => (
              <MenuItem key={status.name} value={status.value}>
                {status.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStatusPopUp}>Отменить</Button>
          <Button onClick={handleChangeStatus}>Подтвердить</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClosePopUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Вы уверены что хотите удалить заказ?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Отмена</Button>
          <Button onClick={() => deleteOrder(id)} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Card