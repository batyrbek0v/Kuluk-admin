import React from 'react'
import { courierTableList } from '../Utils'
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../configs';
import { DataGrid } from '@mui/x-data-grid';
import { Loader } from '../Loader/Loader';
import { FiRefreshCcw } from 'react-icons/fi';
import '../Card/Card.css'


const TTable = () => {

  const [base, setBase] = React.useState(null)


  const handleRefreshData = async () => {
    const docRef = collection(db, "couriers")
    const data = await getDocs(docRef)
    setBase(data?.docs?.map((doc, index) => ({ ...doc?.data(), id: index, index: index })))
  }


  React.useEffect(() => {
    const getBase = async () => {
      const docRef = collection(db, "couriers")
      const data = await getDocs(docRef)
      setBase(data?.docs?.map((doc, index) => ({ ...doc?.data(), id: index, index: index })))
    }

    getBase()
  }, [])

  return (
    <>
      <div style={{ width: '100%' }} className='table-container'>
        <div className='table-refresh-icon'>
          <FiRefreshCcw title='Обновить таблицу' onClick={handleRefreshData} />
        </div>
        {
          !base
            ? <Loader height={'100%'} />
            : <DataGrid
              rows={base}
              columns={courierTableList}
              pageSize={6}
              rowsPerPageOptions={[6]}
              components={{
              }}
            />

        }
      </div>
    </>
  )
}

export default TTable