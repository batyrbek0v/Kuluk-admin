import React from 'react'
import { Title } from '../../../../components/Title/Title';
import Card from './../../../../components/Card/Card';
import './Admin.css'
import { FcAssistant } from 'react-icons/fc';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../configs';


const Admin = () => {

  const [base, setBase] = React.useState(null)

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
      <div className='admin-container'>
        <div>
          <Title title={'Админ панель'} icon={<FcAssistant />} />
          <p>Удаление/редактирование курьеров</p>
        </div>
        <div className='admin-card-wrapper'>
          <div className='admin-card-wrapper-head'>
            <div>
              
            </div>
          </div>
          {
            base?.map(item => <Card {...item} key={item.id}/>)
          }
        </div>
      </div>
    </>
  )
}

export default Admin