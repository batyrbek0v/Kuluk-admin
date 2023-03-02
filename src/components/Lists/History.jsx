import React from 'react'
import './scss/History.scss'


const History = ({ description, id, date }) => {

  const dateTransform = new Date(+date?.seconds * 1000)

  const time = {
    day: dateTransform?.getDate(),
    month: dateTransform?.getMonth(),
    year: dateTransform?.getFullYear(),
    hour: dateTransform?.getHours(),
    minutes: dateTransform?.getMinutes(),
  }


  return (
    <>
      <div className='history-list'>
        <p>{description}</p>
        <time>
          {time.day < 10 && '0'}{time.day}
          .{time.month < 10 && '0'}{time.month + 1}
          .{time.year} / {time.hour < 10 ? '0' : ''}
          {time.hour}:{time.minutes < 10 && '0'}
          {time.minutes}
        </time>
      </div>
    </>
  )
}

export default History