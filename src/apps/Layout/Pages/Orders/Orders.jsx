import React from 'react'
import { Title } from '../../../../components/Title/Title';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import Card from '../../../../components/Card/Card';
import { Loader } from '../../../../components/Loader/Loader';
import { GrUpdate } from 'react-icons/gr';
import { FaClipboardList } from 'react-icons/fa'
import { columnCount, sortByCostList } from '../../../../components/Utils';
import { Refresh, Search } from '@mui/icons-material';
import { orderRef } from './../../../../components/Utils/fireStoreRef';
import { typeOfOrder, orderLabels } from './../../../../components/Utils/index';
import { Header } from '../../../../components/Header/Header';
import { styled } from '@mui/system';
import { GridSearchIcon } from '@mui/x-data-grid';
import './Orders.scss'
import { useNavigate } from 'react-router-dom';
import {
  Pagination, 
  PaginationItem, 
  Stack, 
  TextField, 
  MenuItem, 
  Button, 
  createTheme } from '@mui/material';
import Skeleton from '../../../../components/Skeleton';


const Orders = () => {

  const [order, setOrder] = React.useState(null)
  const [sortOrder, setSortOrder] = React.useState(null)
  const [date, setDate] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [cost, setCost] = React.useState(0)
  const [type, setType] = React.useState('')
  const [input, setInput] = React.useState('')
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
  },[page])

// ---------------------------------
  // SORT-ORDERS-BY-COST
  const costSort = async () => {
    const sortQuery = query(orderRef, where('cost', '==', cost)) 
    const base = await getDocs(sortQuery)
    .then(res => setOrder(
      res?.docs?.map(
        doc => ({
          ...doc?.data(),
          id: doc?.id
        })
      )))
    .catch(err => console.error(err))
  }
  // SORT-ORDERS-BY-TYPE
  const typeSort = async (value) => {
    const sortQuery = query(orderRef, where('packageType', '==', type)) 
    const base = await getDocs(sortQuery)
    .then(res => setOrder(
        res?.docs?.map(
          doc => ({
            ...doc?.data(),
            id: doc?.id
          })
        )))
    .catch(err => console.error(err))
  }

  // PAGINATION
  const TOTAL_PAGE = order?.length / column
  const CEIL_PAGE = Math.ceil(TOTAL_PAGE)
  const handleChangePage = (event, page) => setPage(page)
  //-------------------------------
 
  
  // React.useEffect(() => {
  //   costSort()
  // }, [page, cost])

  // React.useEffect(() => {
  //   typeSort()
  // }, [page, type])
  

  // if(CEIL_PAGE === NaN) return <Loader/>

  return (
    <>
      <div className="container">
        <Header previous='Статистика' initial='Список заказов'/>
        <Title title={'Список заказов'} icon={<FaClipboardList />} />
        <div className='container-inner'>
          <div className='orders-sorting-header'>
            <div className='order-search-block'>
              <TextField
                id="outlined-search"
                label="Что вы ищите?"
                fullWidth
                type="search"
                placeholder='Введите то что ищите'
                size='small'
                onChange={e => setInput(e.target.value.trim())}
                sx={{'borderRadius': '20px'}}
              />
            </div>
            <div className="order-cost-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="По цене"
                fullWidth
                defaultValue=""
                size='small'
                onChange={e => setCost(e.target.value)}
              >
                {sortByCostList.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="order-cost-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="По типу"
                fullWidth
                defaultValue=""
                size='small'
                onChange={e => setType(e.target.value)}
              >
                {typeOfOrder.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="order-cost-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="По статусу"
                fullWidth
                defaultValue=""
                size='small'
                onChange={e => setType(e.target.value)}
              >
                {typeOfOrder.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              {/* <Button variant='contained' onClick={unSub}> <Refresh/></Button> */}
            </div>
          </div>
          <div className='orders-card-wrapper'>
            <div className='orders-card-header'>
            <TextField
                id="outlined-select-currency"
                select
                label="Колонны"
                defaultValue={10}
                size='small'
                sx={{'width': '200px'}}
                onChange={e => setColumn(e.target.value)}
              >
                {columnCount.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
            <Button 
              variant="contained" 
              className='orders-card-header-btn'
              onClick={() => navigate('/addorder')}
            >
              Создать новый заказ
            </Button>
            <Stack spacing={2} direction={'row'}>
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
                orderLabels.map(({id,name}) => (
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
                  ?.slice((page - 1) * column, (page - 1) * column + column)
                  .map(item => <Card {...item} key={item?.id} />)
                  .reverse()
                  
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders

 // var sortBase = []
  // SORTING-BY-COST
  // function sort() {
  // 
  // }
  // --------------------------
  // console.log(order)
  // const dateTramsform = new Date(+dateTramsform * 1000)
  // const getDate = {
  //   day: dateTramsform.getDate(),
  //   month: dateTramsform.getUTCMonth(),
  //   year: dateTramsform.getFullYear(),
  //   hour: dateTramsform.getHours(),
  //   minutes: dateTramsform.getMinutes(),
  // }
  // console.log(`${getDate.day}.${getDate.month + 1}.${getDate.year},`, `${getDate.hour}:${getDate.minutes}`)

  // ------------------------
  // FILTER-SEARCH  
  // const filterSearch = order?.filter(item => {
  //     return item.senderName?.toLowerCase().includes(input.toLowerCase())
  //     || item.adressForm?.cityName.toLowerCase().includes(input.toLowerCase())
  //   })

  // 
    
    // -----------------------