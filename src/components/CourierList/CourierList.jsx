import React from 'react'
import '../Card/Card.scss'
import { onSnapshot } from 'firebase/firestore';
import { couriersRef } from './../Utils/fireStoreRef';


const CourierList = (
  surName,
  raiting,
  active,
  online,
  cityId,
  city,
  type,
  name,
  pin,
  id,
  base
) => {
  // const [courier, setCourier] = React.useState(null)



  // React.useEffect(() => {
  //   const unSub = onSnapshot(couriersRef, snapshot => {
  //     setCourier(
  //       snapshot.docs.map(doc =>
  //       ({
  //         ...doc.data(),
  //         id: doc.id
  //       })
  //       ))
  //   })
  //   return () => unSub()
  // }, [])

console.log(id)

  return (
    <>
      <div className='courier-card'>
        <div className="order-card-value">
        </div>
      </div>
    </>
  )
}

export default CourierList