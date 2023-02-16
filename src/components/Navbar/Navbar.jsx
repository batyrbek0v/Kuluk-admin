import * as React from 'react';
import { sideList } from '../Utils/index';
import { NavLink } from 'react-router-dom';
import { handleSignOut } from '../../configs/index';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { FiShoppingCart, FiUsers, FiLogIn } from 'react-icons/fi'
import { MdKeyboardArrowRight, MdOutlineExpandMore } from 'react-icons/md'
import './Navbar.scss'

export default function Navbar() {
  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);

  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      width: "100%",
      background: isActive ? '#6593fe79' : '',
      color: 'white',
    }
  }
  const navLinkStyles2 = ({ isActive }) => {
    return {
      width: "100%",
      backgroundImage: isActive ? 'linear-gradient(to right, #87b8ff, #6594fe, #6594fe, #6594fe, #5a6cf3)' : '',
      color: 'white',
    }
  }

  return (
    <>
      <nav className='nav'>
        {/* <ul className='nav-list'> */}
        <div className='nav-list-wrapper'>
          <div className="nav-list">
            {
              sideList.slice(0, 1).map(({ id, icon, path, title }) => (
                <NavLink to={path} className="link" style={navLinkStyles2} key={id}>
                  <List component="div" disablePadding sx={{ "width": "100%" }}>
                    <ListItemButton className='list-li'>
                      <ListItemIcon className="list-title-icon">
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={title} className="nav-list-stat" />
                    </ListItemButton>
                  </List>
                </NavLink>
              ))
            }
          </div>
          <List
            sx={{ "width": "100%", "color": "white" }}
            component="ul"
            aria-labelledby="nested-list-subheader"
            className="nav-list"
          >
            <ListItemButton
              onClick={handleClick}
              className={open ? "list-button" : "list-button active"}
              sx={{ pl: 4 }}
            >
              <ListItemIcon className="list-button-icon">
                <FiShoppingCart color='white' size={18} />
              </ListItemIcon>
              <ListItemText primary="Заказы" />
              {open ? <MdKeyboardArrowRight size={18} /> : <MdOutlineExpandMore size={18} />}
            </ListItemButton>
            {
              sideList.slice(1, 3).map(({ id, icon, path, title }) => (
                <NavLink to={path} className="link" style={navLinkStyles} key={id}>
                  <Collapse
                    in={!open}
                    timeout="auto"
                    unmountOnExit
                    sx={{ "width": "100%" }}
                  >
                    <List component="div" disablePadding>
                      <ListItemButton className='list-li'>
                        <ListItemIcon className="list-title-icon">
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </NavLink>
              ))
            }
          </List>
          <List
            sx={{ "width": "100%", "color": "white" }}
            component="ul"
            aria-labelledby="nested-list-subheader"
            className="nav-list"
          >
            <ListItemButton
              onClick={handleClick2}
              className={open2 ? "list-button" : "list-button active"}
              sx={{ pl: 4 }}
            >
              <ListItemIcon className="list-button-icon">
                <FiUsers color='white' size={18} />
              </ListItemIcon>
              <ListItemText primary="Курьеры" />
              {open2 ? <MdKeyboardArrowRight size={18} /> : <MdOutlineExpandMore size={18} />}
            </ListItemButton>
            {
              sideList.slice(3, 5).map(({ id, icon, path, title }) => (
                <NavLink to={path} className="link" style={navLinkStyles} key={id}>
                  <Collapse
                    in={!open2}
                    timeout="auto"
                    unmountOnExit
                    sx={{ "width": "100%" }}
                  >
                    <List component="div" disablePadding>
                      <ListItemButton className='list-li'>
                        <ListItemIcon className="list-title-icon">
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </NavLink>
              ))
            }

          </List>
        </div>
        {/* <ul className='nav-list'>
          {
            sideList.map(({ id, icon, path, title }) => (
              <NavLink
                to={path}
                className='link'
                style={navLinkStyles2}
                key={id}
              >
                <li><span>{icon}</span>{title}</li>
              </NavLink>
            ))
          }
        </ul> */}
        <button onClick={handleSignOut} className='navbar-signOut'><FiLogIn size={18} /> Выйти</button>
      </nav>
    </>
  );
}