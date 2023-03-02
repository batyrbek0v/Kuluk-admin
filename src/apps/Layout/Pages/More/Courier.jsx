import React from 'react'
import { Header } from '../../../../components/Header/Header'
import './scss/Courier.scss'
import { Title } from './../../../../components/Title/Title';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../configs';
import avatar from '../../../../assets/images/avatar.svg'
import { Button } from '@mui/material';
import { Box } from '@mui/system';
const Courier = () => {

  const { id } = useParams()
  const [courier, setCourier] = React.useState(null)

  React.useEffect(() => {
    const getCourier = async () => {
      const docRef = doc(db, 'couriers', id)
      const docSnap = await getDoc(docRef)
      setCourier({ ...docSnap.data(), id: docSnap.id })
    }
    return () => getCourier()
  }, [])

  console.log(courier)

  return (
    <>
      <div className="container">
        <Header previous={"Список курьеров"} initial={"Детали курьера"} />
        <Title title={"Детали курьера"} />
        <div className="container-inner">
          <div className="courier-more-wrapper">
            <div className="courier-more-card">
              <div className="courier-card-left-side">
                <div className="courier-card-avatar">
                  <img src={!courier?.avatar ? avatar : courier?.avatar} alt={courier?.name} />
                  <span className={
                    !courier?.online
                      ? "courier-card-status offline"
                      : "courier-card-status online"
                  }
                  >
                  </span>
                </div>
                <h3>{courier?.name} {courier?.surName}</h3>
              </div>
              <div className="courier-card-right-side">
                <div className="courier-card-list">
                  <span>
                    <p>Имя:</p>
                    <p>{courier?.name}</p>
                  </span>
                  <span>
                    <p>Фамилия:</p>
                    <p>{courier?.surName}</p>
                  </span>


                  <span>
                    <p>Номер:</p>
                    <p>{courier?.phone}</p>
                  </span>

                </div>
                <div className="courier-card-list">
                  <span>
                    <p>Рейтинг:</p>
                    <p>{courier?.raiting}</p>
                  </span>
                  <span>
                    <p>Город:</p>
                    <p>{courier?.city?.name}</p>
                  </span>
                  <span>
                    <p>Аккаунт:</p>
                    <p>{!courier?.active ? "Аккаунт не активный" : "Аккаунт активный"}</p>
                  </span>
                </div>
                <div className="courier-card-list">
                  <span>
                    <p>Тип курьера:</p>
                    <p>{courier?.type}</p>
                  </span>
                </div>
                <div className="courier-card-list">
                  <Box display={'flex'} gap={'4px'}>
                    <Button variant='outlined'>Удалить курьера</Button>
                    <Button variant='outlined'>Редактировать</Button>
                  </Box>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Courier