import React from 'react'
import { courierTableList } from '../Utils'
import './Card.css'
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../configs';
import { DataGrid } from '@mui/x-data-grid';
import { Loader } from './../Loader/Loader';

const Card = ({ id, name, phone, index }) => {

  const [base, setBase] = React.useState(null)


  const columns = [
    { field: 'id', headerName: '#ID', width: 70 },
    { field: 'name', headerName: 'Имя', width: 130 },
    { field: 'surName', headerName: 'Фамилия', width: 130, },
    { field: 'type', headerName: 'Тип', width: 130, sortable: false, },
    { field: 'city', headerName: 'Город', width: 130, sortable: false, },
    { field: 'rating', headerName: 'Рейтинг', width: 130, },
    {
      field: 'online', headerName: 'Статус', width: 130, sortable: false,
      valueGetter: (params) => `${params.row.online === false ? 'Оффлайн' : 'Онлайн'}`
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,

      width: 160,
      valueGetter: (params) =>
        `${params.row.name || ''} ${params.row.surName || ''}`,
    },
  ];
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
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
      <div style={{ height: 400, width: '100%' }}>
        {
          !base
            ? <Loader height={'100%'} />
            : <DataGrid
              experimentalFeatures={{ newEditingApi: true }}
              rows={base}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
        }
      </div>
    </>
  )
}

export default Card