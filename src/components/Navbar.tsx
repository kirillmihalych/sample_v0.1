import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  // AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material'
// Drawer imports
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { useAppSelector, useAppDispatch } from '../app/hooks'
// MUI icons
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  createCategory,
  toggleDrawer,
  openEditLabelList,
} from '../features/category/CategorySlice'
import { filterRoutines } from '../features/routine/RoutineSlice'

// drawer logic
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))
// drawer end

const Navbar: FC = () => {
  const dispatch = useAppDispatch()
  const { categories, drawerOpen } = useAppSelector((state) => state.category)

  // drawer logic
  const handleDrawerToggle = () => {
    dispatch(toggleDrawer())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position='fixed' open={false}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            edge='start'
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color='secondary'
            variant='h6'
            component={RouterLink}
            to='/'
            sx={{
              alignSelf: 'center',
              marginLeft: '24px',
              paddingTop: '12px',
              textDecoration: 'none',
              height: '64px',
              // paddingBottom: '20px',
              borderBottom: '3px solid #141414',
              '&:hover': {
                borderRadius: '2px',
                borderBottom: '3px solid white',
              },
            }}
          >
            Тренировки
          </Typography>
          <Typography
            color='secondary'
            variant='h6'
            component={RouterLink}
            to='/history'
            sx={{
              alignSelf: 'center',
              marginLeft: '24px',
              paddingTop: '12px',
              textDecoration: 'none',
              height: '64px',
              // paddingBottom: '20px',
              borderBottom: '3px solid #141414',
              '&:hover': {
                borderRadius: '2px',
                borderBottom: '3px solid white',
              },
            }}
          >
            История
          </Typography>
          <Typography
            color='secondary'
            variant='h6'
            component={RouterLink}
            to='/all-exercise'
            sx={{
              alignSelf: 'center',
              marginLeft: '24px',
              paddingTop: '12px',
              textDecoration: 'none',
              height: '64px',
              // paddingBottom: '20px',
              borderBottom: '3px solid #141414',
              '&:hover': {
                borderRadius: '2px',
                borderBottom: '3px solid white',
              },
            }}
          >
            Упражнения
          </Typography>
          {/* <Typography>
            Добро пожаловать, {user.name ? user.name : 'Гость'}!
          </Typography>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Профиль</MenuItem>
              <MenuItem onClick={() => dispatch(openSignInMode())}>
                Выйти
              </MenuItem>
            </Menu>
          </div> */}
        </Toolbar>
      </AppBar>
      {/* drawer start */}
      <Drawer variant='permanent' open={drawerOpen}>
        <DrawerHeader />
        <Divider />
        <List>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => dispatch(createCategory())}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Создать'}
              sx={{ opacity: drawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => dispatch(openEditLabelList())}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Изменить'}
              sx={{ opacity: drawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: drawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={() => dispatch(filterRoutines('Все'))}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LabelOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Все'}
              sx={{ opacity: drawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
          <Divider />
          {categories.map((category) => {
            if (category.title !== 'Все') {
              return (
                <ListItem
                  key={category.title}
                  disablePadding
                  sx={{ display: 'block' }}
                  onClick={() => dispatch(filterRoutines(category.id))}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: drawerOpen ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LabelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={category.title}
                      sx={{ opacity: drawerOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            }
            return null
          })}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </Box>
  )
}

export default Navbar
