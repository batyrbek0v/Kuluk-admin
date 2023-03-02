import React from 'react'
import { Title } from './../../../../components/Title/Title';
import { Header } from './../../../../components/Header/Header';
import { Loader } from '../../../../components/Loader/Loader';
import { onSnapshot } from 'firebase/firestore';
import { couriersRef } from './../../../../components/Utils/fireStoreRef';
import { FaClipboardList } from 'react-icons/fa';
import noData from '../../../../assets/images/no-data2.svg'
import { useNavigate } from 'react-router-dom';
import { columnCount, courierTableList } from '../../../../components/Utils';
import Courier from '../../../../components/Lists/CourierList';
import './Couriers.scss'
import {
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

const Couriers = () => {

  const [courier, setCourier] = React.useState(null)
  const [page, setPage] = React.useState(1)
  const [column, setColumn] = React.useState(10)
  const navigate = useNavigate()

  // GET-COURIERS
  React.useEffect(() => {
    const unSub = onSnapshot(couriersRef, snapshot => {
      setCourier(
        snapshot.docs.map(doc =>
        ({
          ...doc.data(),
          id: doc.id
        })
        ))
    })
    return () => unSub()
  }, [])

  // PAGINATION
  const TOTAL_PAGE = courier?.length / column
  const CEIL_PAGE = Math.ceil(TOTAL_PAGE)
  const handleChangePage = (event, page) => setPage(page)


  return (
    <>
      <div className='container'>
        <Header previous="Cтатистика" initial="Список курьеров" />
        <Title title={'Список курьеров'} icon={<FaClipboardList />} />
        <div className='container-inner'>
          <div className="orders-card-wrapper">
            <div className='orders-card-header'>
              <Button
                variant="contained"
                className='orders-card-header-btn courier'
                onClick={() => navigate('/post/courier')}
              >
                Создать курьера
              </Button>
              <Stack spacing={2} direction={'row'}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Колонны"
                  defaultValue={10}
                  size='small'
                  sx={{ 'width': '200px' }}
                  onChange={e => setColumn(e.target.value)}
                >

                  {
                    columnCount.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
                <Pagination
                  count={CEIL_PAGE}
                  onChange={handleChangePage}
                  shape="rounded"
                  renderItem={(item) => (
                    <PaginationItem {...item} />
                  )}
                />
              </Stack>
            </div>
            <div className="courier-list-wrapper-labels">
              {
                courierTableList.map((label) => (
                  <div key={label.headerName}>
                    <p>{label.headerName}</p>
                  </div>
                ))
              }
            </div>
            {
              !courier
                ? <Loader />
                : courier
                  ?.slice((page - 1) * column, (page - 1) * column + column)
                  .map(item => <Courier {...item} key={item?.id} />)
            }
            {
              !courier?.length &&
              <figure>
                <svg width="100%" height="300px" style={{ "margin": "20px 0" }}>
                  <image href={noData} width="100%" height="100%" />
                </svg>
                <figcaption style={{ "textAlign": "center" }}><h1>Результатов не найдено</h1></figcaption>
              </figure>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Couriers