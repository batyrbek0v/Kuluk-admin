import React from 'react'
import './History.scss'
import { useParams } from 'react-router-dom';
import { Header } from '../../../../components/Header/Header';
import { Title } from '../../../../components/Title/Title';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../configs';
import HistoryList from '../../../../components/Lists/History';
import { Loader } from '../../../../components/Loader/Loader';
import noData from '../../../../assets/images/no-data3.svg'

const History = () => {


  const [history, setHistory] = React.useState(null)

  const { id } = useParams()

  React.useEffect(() => {

    const getHistory = async () => {
      const docRef = collection(db, 'orders', id, 'history')
      const docSnap = await getDocs(docRef)
      setHistory(
        docSnap.docs.map(doc =>
        ({
          ...doc.data(),
          id: doc.id
        })
        ))
    }

    return () => getHistory()

  }, [])


  return (
    <>
      <div className="container">
        <Header previous="Детали заказа" initial="История заказа" />
        <Title title="История заказа" />
        <div className="container-inner">
          <div className='order-history-top'>
            <p>ID заказа:</p>
            <h3>{id}</h3>
          </div>
          <div className="orders-history-wrapper">
            {
              !history
                ? <Loader />
                : history
                  ?.sort((a, b) => a['date']?.seconds > b['date']?.seconds && -1)
                  .map((item) => <HistoryList {...item} key={item.id} />)
            }
            {
              !history?.length && (
                <figure>
                  <svg width="100%" height="300px" style={{ "margin": "20px 0" }}>
                    <image href={noData} width="100%" height="100%" />
                  </svg>
                  <figcaption style={{ "textAlign": "center" }}><h1>История пуста</h1></figcaption>
                </figure>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default History