import React from 'react'
import { Title } from '../../../../components/Title/Title';
import { collection, getDocs, } from 'firebase/firestore';
import { db } from '../../../../configs';
import Card from '../../../../components/Card/Card';
import { Loader } from '../../../../components/Loader/Loader';
import { Pagination, PaginationItem, Stack, TextField, MenuItem } from '@mui/material';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { FaClipboardList } from 'react-icons/fa'
import './Orders.css'
import { sortByCostList } from '../../../../components/Utils';



const Orders = () => {

  const [order, setOrder] = React.useState(null)
  const [sortOrder, setSortOrder] = React.useState(null)
  const [date, setDate] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [cost, setCost] = React.useState(0)
  const [input, setInput] = React.useState('')


  // GET-ORDERS
  const getOrders = async () => {
    const docRef = collection(db, 'orders')
    const data = await getDocs(docRef)
    setOrder(data?.docs?.map(doc => ({ ...doc.data(), id: doc?.id })))
    setSortOrder(data?.docs?.map(doc => ({ ...doc.data(), id: doc?.id })).reverse())
  }

  // ------------------------
  // FILTER-SEARCH  
  // const filterSearch = order?.filter(item => {
  //     return item.senderName?.toLowerCase().includes(input.toLowerCase())
  //     || item.adressForm?.cityName.toLowerCase().includes(input.toLowerCase())
  //   })

  // 
    
  // FOR-PAGINATION
  const PAGE_SIZE = 6
  const TOTAL_PAGE = sortOrder?.length / PAGE_SIZE
  const CEIL_PAGE = Math.ceil(TOTAL_PAGE)
  const handleChangePage = (event, page) => setPage(page)
  //-------------------------------
 
  // SORTING-BY-COST
  React.useEffect(() => {
    const sorting = order?.filter(item => item.cost == cost)
    sorting && setSortOrder(sorting)
  }, [page, cost])
  

  React.useEffect(() => {
    getOrders()
  }, [page])


  if(!sortOrder) return <Loader/>

  return (
    <>
      <div className="container">
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
              />
            </div>
            <div className="order-cost-sort">
              <TextField
                id="outlined-select-currency"
                select
                label="Сортировка по цене"
                fullWidth
                defaultValue=""
                size='small'
                onChange={e => setCost(e.target.value)}
              >
                {sortByCostList.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className='orders-card-wrapper'>
            {
              !sortOrder
                ? <Loader />
                : sortOrder
                  ?.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE)
                  .map(item => <Card {...item} key={item.id} />)
                  .reverse()
            }
          </div>
            <Stack spacing={2} mt={4}>
                <Pagination
                  count={sortOrder && CEIL_PAGE}
                  onChange={handleChangePage}
                  renderItem={(item) => (
                    <PaginationItem {...item} />
                  )}
                />
                
            </Stack>
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


    
    // -----------------------