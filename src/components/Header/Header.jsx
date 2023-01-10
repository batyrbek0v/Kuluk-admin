import * as React from 'react';
import { sideList } from './../Utils/index';
import { Link } from 'react-router-dom';
import './Header.css'


export default function Header() {
  const [show, setShow] = React.useState(false)

  return (
    <>
      <header>
        <nav className='nav'>
          <ul className='nav-list'>
            {
              sideList.map(({ id, icon, path, title, event }) => (
                <li key={id}>
                  <Link to={path} className='link' onClick={event}>
                    {icon}
                    <span>{title}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
    </>
  );
}