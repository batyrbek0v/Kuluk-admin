import React from 'react'
import { getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { Title } from '../../../../components/Title/Title';
import { Loader } from '../../../../components/Loader/Loader';
import { FaClipboardList } from 'react-icons/fa'
import { orderRef } from './../../../../components/Utils/fireStoreRef';
import { Header } from '../../../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import Card from '../../../../components/Card/Card';
import noData from '../../../../assets/images/no-data.svg'
import './Orders.scss'
import { 
  columnCount, 
  orderStatus, 
  sortByCostList ,
  orderLabels,
  typeOfOrder
} from '../../../../components/Utils';
import {
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';


const Orders = () => {

  const [order, setOrder] = React.useState(null)
  const [page, setPage] = React.useState(1)
  const [column, setColumn] = React.useState(10)

  const navigate = useNavigate()

  // GET-ORDERS
  React.useEffect(() => {
    const unSub = onSnapshot(orderRef, snapshot => {
      setOrder(
        snapshot.docs.map(doc =>
        ({
          ...doc.data(),
          id: doc.id
        })
        ))
    })
    return () => unSub()
  }, [])

  // SORT-BY-TYPE
  const typeSort = async (event) => {
    const value = event.target.value
    if (value == 'Все') {
      const unSub = onSnapshot(orderRef, snapshot => {
        setOrder(
          snapshot.docs.map(doc =>
          ({
            ...doc.data(),
            id: doc.id
          })
          ))
      })
    } else {
      const sortQuery = query(orderRef, where('packageType', '==', value))
      const base = await getDocs(sortQuery)
        .then(res => setOrder(
          res?.docs?.map(
            doc => ({
              ...doc?.data(),
              id: doc?.id
            })
          )))
        .catch(err => console.error(err.message))
    }
  }
  // SORT-BY-STATUS
  const statusSort = async (event) => {
    const value = event.target.value
    if (value == 'Все') {
      const unSub = onSnapshot(orderRef, snapshot => {
        setOrder(
          snapshot.docs.map(doc =>
          ({
            ...doc.data(),
            id: doc.id
          })
          ))
      })
    } else {
      const sortQuery = query(orderRef, where('status', '==', value))
      const base = await getDocs(sortQuery)
        .then(res => setOrder(
          res?.docs?.map(
            doc => ({
              ...doc?.data(),
              id: doc?.id
            })
          )))
        .catch(err => console.error(err.message))
    }
  }
  // SORT-BY-COST
  const sortCost = async (event) => {
    const value = event.target.value
    if (value == 'Все') {
      const unSub = onSnapshot(orderRef, snapshot => {
        setOrder(
          snapshot.docs.map(doc =>
          ({
            ...doc.data(),
            id: doc.id
          })
          ))
      })
    } else {
      const sortQuery = query(orderRef, where('cost', '==', value))
      const base = await getDocs(sortQuery)
        .then(res => setOrder(
          res?.docs?.map(
            doc => ({
              ...doc?.data(),
              id: doc?.id
            })
          )))
        .catch(err => console.error(err.message))
    }
    // console.log(value)
  }

  // PAGINATION
  const TOTAL_PAGE = order?.length / column
  const CEIL_PAGE = Math.ceil(TOTAL_PAGE)
  const handleChangePage = (event, page) => setPage(page)

  return (
    <>
      <div className="container">
        <Header previous='Статистика' initial='Список заказов' />
        <Title title={'Список заказов'} icon={<FaClipboardList />} />
        <div className='container-inner'>
          <div className='orders-sorting-header'>
            <div className='order-search-block'>
              <TextField
                id="outlined-search"
                label="Что вы ищите?"
                type="search"
                placeholder='Введите то что ищите'
                size='small'
                sx={{ 'borderRadius': '20px' }}
              />
            </div>
            <div className="order-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="По цене"
                fullWidth
                defaultValue="Все"
                size='small'
                onChange={sortCost}
              >
                <MenuItem value="Все">
                  Все
                </MenuItem>
                {
                  sortByCostList.map(cost => (
                    <MenuItem key={cost.id} value={cost.value}>
                      {cost.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className="order-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="По типу"
                fullWidth
                defaultValue="Все"
                size='small'
                onChange={typeSort}
              >
                <MenuItem value='Все'>
                  Все
                </MenuItem>
                {
                  typeOfOrder.map((type) => (
                    <MenuItem key={type.id} value={type.value}>
                      {type.name}
                    </MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div className="order-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="По статусу"
                fullWidth
                defaultValue="Все"
                size='small'
                onChange={statusSort}
              >
                <MenuItem value='Все'>Все</MenuItem>
                {orderStatus.map((status) => (
                  <MenuItem key={status.name} value={status.value}>
                    {status.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="order-sort">
              <input
                className='order-sort-dareInput'
                type="date"
                name="orderDate"
                id="orderDate"
              />
            </div>
          </div>
          <div className='orders-card-wrapper'>
            <div className='orders-card-header'>
              <Button
                variant="contained"
                className='orders-card-header-btn'
                onClick={() => navigate('/addorder')}
              >
                Новый заказ
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
            <div className="orders-card-wrapper-labels">
              {
                orderLabels.map(({ id, name }) => (
                  <div key={id}>
                    <p>{name}</p>
                  </div>
                ))
              }
            </div>
            {
              !order
                ? <Loader />
                : order
                  ?.sort((a, b) => a['dateCreated']?.seconds > b['dateCreated']?.seconds && -1)
                  .slice((page - 1) * column, (page - 1) * column + column)
                  .map(item => <Card {...item} key={item?.id} />)
            }
            {
              !order?.length &&
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

export default Orders

  // ------------------------
  // FILTER-SEARCH  
  // const filterSearch = order?.filter(item => {
  //     return item.senderName?.toLowerCase().includes(input.toLowerCase())
  //     || item.adressForm?.cityName.toLowerCase().includes(input.toLowerCase())
  //   })

  // 


  // SORT-COST-ASC-DESC
  // const handleChangeStatus = (event, newValue) => {
  //   const value = event.target.value
  //   const sortedData = [...order].sort((a, b) => {
  //     if (value === 'ASC') {
  //       return a.cost - b.cost;
  //     } else {
  //       return b.cost - a.cost;
  //     }
  //   });
  //   setOrder(sortedData)
  //   console.log(order)
  // }
