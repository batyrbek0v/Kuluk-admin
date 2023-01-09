import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SideBar from '../Sidebar/Sidebar';
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