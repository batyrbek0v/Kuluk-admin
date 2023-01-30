import * as React from 'react';
import { sideList } from '../Utils/index';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { handleSignOut } from '../../configs/index';


export default function Navbar() {
  const [show, setShow] = React.useState(false)

  const navLinkStyles = ({ isActive }) => {
    return {
      background: isActive ? '#5A6CF3' : '',
    }
  }

  return (
    <>
      <header>
        <nav className='nav'>
          <ul className='nav-list'>
            {
              sideList.map(({ id, icon, path, title }) => (
                <NavLink
                  to={path}
                  className='link'
                  style={navLinkStyles}
                  key={id}
                >
                  <li><span>{icon}</span>{title}</li>
                </NavLink>
              ))
            }
          </ul>
          <button onClick={handleSignOut} className='navbar-signOut'><ExitToAppIcon /> Выйти</button>
        </nav>
      </header>
    </>
  );
}