import React from 'react'
import { Header } from '../../../../components/Header/Header'
import { Title } from '../../../../components/Title/Title'

const Main = () => {

  return (
    <React.Fragment>
      <div className="container">
        <Header previous="Статистика" />
        <Title title={'Статистика'} />
        <div className="container-inner">

        </div>
      </div>
    </React.Fragment>
  )
}

export default Main