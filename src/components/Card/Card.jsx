import React from 'react'
import './Card.css'
import { AiOutlineFieldTime, AiOutlineQrcode, AiOutlineSend, AiFillPhone } from 'react-icons/ai'
import { MdLocationPin } from 'react-icons/md'
import { IoSend } from 'react-icons/io5'
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom'

const Card = ({
  id,
  addressFrom,
  addressTo,
  sender,
  senderName,
  receiver,
  receiverName,
  redemption,
  dateCreated,
  status,
  tariff
}) => {

  // const [date, setDate] = React.useState(0)

  // const dateTransform = new Date(+dateCreated?.seconds * 1000)

  // const time = {
  //   day: dateTransform?.getDate(),
  //   month: dateTransform?.getUTCMonth(),
  //   year: dateTransform?.getFullYear(),
  //   hour: dateTransform?.getHours(),
  //   minutes: dateTransform?.getMinutes(),
  // }
  // console.log(time)

  return (
    <>
      <Link className='link' to={id}>
        <div className='orders-card'>
          <div className="orders-card-heading">
            <div className="orders-date">
              <AiOutlineFieldTime size={'20px'} />
              <time>
                {/* {time.day}
                .{time.month + 1}
                .{time.year}
                {time.hour}
                :{time.minutes} */}
              </time>
            </div>
            <div className="orders-date">
              <AiOutlineQrcode size={'20px'} />
              <p>{id.length > 10 && id.slice(0, 12)}</p>
            </div>
          </div>
          <div className="orders-card-body">
            <div className="orders-adress-block">
              <IoSend color={'#4F92DC'} />
              <div className='orders-adress'>
                <div>
                  <p>{sender} ({senderName})</p>
                  <address>{addressFrom?.address}</address>
                </div>
                <span href={'tel:' + sender} className='adress-phone'>
                  <AiFillPhone />
                </span>
              </div>
            </div>
            <div className="orders-adress-block">
              <MdLocationPin color='#23A42F' size={'20px'} />
              <div className='orders-adress'>
                <div>
                  <p>{receiver} ({receiverName})</p>
                  <address>{addressTo?.address}</address>
                </div>
                <span href='tel:0700923082' className='adress-phone'>
                  <AiFillPhone />
                </span>
              </div>
            </div>
            <Divider />
            <div className='orders-info-block'>
              <div className='orders-info'>
                <p>{tariff.name}</p>
                <p>{tariff.cost}⃀</p>
              </div>
              <div className='orders-info'>
                <p>Выкуп</p>
                <p>{redemption}⃀</p>
              </div>
              <div className='orders-info'>
                <p>Статус</p>
                <p>У курьера</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Card