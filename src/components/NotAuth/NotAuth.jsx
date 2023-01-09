import React from 'react'
import { Link } from 'react-router-dom'

const NotAuth = () => {
  return (
    <div>
      Вы не авторизованы

      <Link to={'/auth/login'}>
        авторизуйтесь
      </Link>
    </div>
  )
}

export default NotAuth