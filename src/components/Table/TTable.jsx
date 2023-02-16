import React from 'react'
import { courierTableList } from '../Utils'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../configs';
import { DataGrid } from '@mui/x-data-grid';
import { Loader } from '../Loader/Loader';
import '../Card/Card.scss'


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
        {
          !base
            ? <Loader height={'100%'} />
            : <DataGrid
              rows={base && base}
              columns={courierTableList}
              pageSize={6}
              rowsPerPageOptions={[6]}
            />

        }
      </div>
    </>
  )
}

export default TTable