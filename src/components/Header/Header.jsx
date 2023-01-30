import React from 'react'
import './Header.scss'
import { MdNavigateNext } from 'react-icons/md'
import { Avatar, Badge, Stack, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Box } from '@mui/system';

export const Header = ({ previous, initial }) => {
  return (
    <>
      <div className='main-header'>
        <div className='header-page-navigation'>
          <h3>{previous} <MdNavigateNext size={'24px'} /> {initial}</h3>
        </div>
        <Stack direction="row" spacing={3} alignItems="center" className='header-user'>
          <Badge badgeContent={4} color='error' className={'lll'}>
            <MailIcon color="action" />
          </Badge>
          <Box display="flex" alignItems="center" gap="4px">
            <Avatar src='' />
            <Typography variant="p">Kuluk admin</Typography>
          </Box>
        </Stack>
      </div>
    </>
  )
}
