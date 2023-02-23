import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

const Navbar: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/' color='main'>
              <IconButton color='secondary'>
                <HomeIcon />
              </IconButton>
            </Link>
          </Typography>
          <Button color='inherit'>Войти</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
