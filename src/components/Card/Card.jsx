import React from 'react'
import './Card.scss'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit, FiMoreHorizontal } from 'react-icons/fi'

const Card = ({
  id,
  dateCreated,
  status,
  packageType,
  paymentMethod,
  paymentStatus,
  addressFrom,
  addressTo,
  sender,
  senderName,
  receiver,
  receiverName,
  redemption,
  tariff,
  cost
}) => {

  const dateTransform = new Date(+dateCreated?.seconds * 1000)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const time = {
    day: dateTransform?.getUTCDate(),
    month: dateTransform?.getMonth(),
    year: dateTransform?.getFullYear(),
    hour: dateTransform?.getHours(),
    minutes: dateTransform?.getMinutes(),
  }
  const openAction = Boolean(anchorEl)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClosePopUp = () => {
    setOpen(false);
    setAnchorEl(null)
  };

  console.log(open)

  return (
    <>
      {/* <Link className='link' to={id && id}> */}
      <div
        className={'orders-card'}
        onDoubleClick={() => navigate(id)}
      >
        <div className="orders-card-values">
          <p>{id?.length > 10 && id?.slice(0, 12)}...</p>
        </div>
        <div className="orders-card-values">
          <time>
            {time.day < 10 && '0'}{time.day}
            .{time.month < 10 && '0'}{time.month + 1}
            .{time.year} / {time.hour}:{time.minutes < 10 && '0'}{time.minutes}
          </time>
        </div>
        <div className='orders-card-values'>
          <p>
            {
              status == 'status_new' && 'Новый'
              || status == 'status_confirmed' && 'Подтвержден'
              || status == 'status_arrived_sender' && 'Подтвержден'
              || status == 'status_on_courier' && 'У курьера'
              || status == 'status_at_sorting_center' && 'B сорт.центре'
              || status == 'status_delivered' && 'Доставлен'
              || status == 'status_rejected' && 'Отклонен'
              || status == 'status_cancelled' && 'Отменен'
            }
          </p>
        </div>
        <div className='orders-card-values'>
          <p>
            {
              packageType == 'document' && 'Документ'
              || packageType == 'medicine' && 'Лекарство'
              || packageType == 'large_box' && 'Большая коробка'
              || packageType == 'small_box' && 'Мал-ая коробка'
              || packageType == 'box' && 'Коробка'
              || packageType == 'food' && 'Еда'
              || packageType == 'other' && 'Другое'
            }
          </p>
        </div>
        <div className='orders-card-values'>
          <p>{cost}⃀</p>
        </div>
        <div className='orders-card-values'>
          <p>
            {
              paymentMethod == 'cash' && 'Наличными'
              || paymentMethod == 'mbank' && 'МБАНК'
              || paymentMethod == 'optima' && 'Оптима'
              || paymentMethod == 'odengi' && 'О!Деньги'
              || paymentMethod == 'elsom' && 'Элсом'
              || paymentMethod == 'other' && 'Другое'
            }
          </p>
        </div>
        <div className='orders-card-values'>
          <p>
            {paymentStatus == false ? 'Не оплачен' : 'Оплачен'}
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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopUp}>Отмена</Button>
          <Button onClick={handleClosePopUp} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      {/* </Link> */}
    </>
  )
}

export default Card