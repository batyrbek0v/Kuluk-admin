import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { db } from '../../configs';
import { deleteDoc, doc } from 'firebase/firestore';
import './Card.scss'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem
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


  return (
    <>
      <div
        className={!deleting ? 'orders-card' : 'orders-card deleting'}
        onDoubleClick={() => navigate(id)}
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
        <div className={
          status === 'status_new' ? 'orders-card-values new-order' : ''
            || status === 'status_confirmed' ? 'orders-card-values confirmed-order' : ''
              || status === 'status_arrived_sender' ? 'orders-card-values arrived-sender-order' : ''
                || status === 'status_on_courier' ? 'orders-card-values on-courier-order' : ''
                  || status === 'status_at_sorting_center' ? 'orders-card-values at-sorting-order' : ''
                    || status === 'status_delivered' ? 'orders-card-values delivered-order' : ''
                      || status === 'status_rejected' ? 'orders-card-values rejected-order' : ''
                        || status === 'status_cancelled' ? 'orders-card-values cancelled-order' : ''
        }
        >
          <p>
            {
              status === 'status_new' && 'Новый'
              || status === 'status_confirmed' && 'Подтвержден'
              || status === 'status_arrived_sender' && 'Прибыл к отправ'
              || status === 'status_on_courier' && 'У курьера'
              || status === 'status_at_sorting_center' && 'B сорт.центре'
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
          !paymentStatus ? 'orders-card-values not-paid' : 'orders-card-values paid'
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
                <MdDeleteOutline size={'22'} color='#ef5350' />
              </div>
            </MenuItem>
            <MenuItem onClick={() => navigate(`/orders/edit/${id}`)} className="order-card-actions-menu">
              <div className='order-card-actions-menu'>
                <FiEdit size={'18px'} color='teal' />
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
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