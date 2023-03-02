import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { AiFillDelete } from 'react-icons/ai';
import { RiEditFill } from 'react-icons/ri'
import './scss/Courier.scss'
import { db } from '../../configs';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Courier = ({
  surName,
  raiting,
  active,
  online,
  city,
  type,
  name,
  id,
}) => {

  const [deleting, setDeleting] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }


  const deleteCourier = async (id) => {
    try {
      const orderRef = doc(db, 'couriers', id)

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

  return (
    <>
      <div
        className={!deleting ? "courier-list" : 'courier-list deleting'}
        onDoubleClick={() => navigate(`/more/courier/${id}`)}
      >
        <div className="courier-list-value">
          <p> {id}</p>
        </div>
        <div className="courier-list-value">
          <p> {name}</p>
        </div>
        <div className="courier-list-value">
          <p> {surName}</p>
        </div>
        <div className="courier-list-value">
          <p> {type}</p>
        </div>
        <div className="courier-list-value">
          <p> {city?.name?.length >= 10 ? `${city?.name?.slice(0, 12)}...` : city?.name}</p>
        </div>
        <div className="courier-list-value">
          <p> {raiting}</p>
        </div>
        <div className={online ? "courier-list-value online" : "courier-list-value offline"}>
          <p> {online ? 'online' : 'offline'}</p>
        </div>
        <div className="courier-list-value">
          <p>{id}</p>
        </div>
        <div className="courier-list-actions">
          <Button onClick={handleOpen}>
            <AiFillDelete size={18} color="#651DC0" />
          </Button>
          <Button onClick={() => navigate(`/couriers/edit/${id}`)}>
            <RiEditFill size={18} color="#651DC0" />
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Вы уверены что хотите удалить заказ?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button onClick={() => deleteCourier(id)} autoFocus>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default Courier