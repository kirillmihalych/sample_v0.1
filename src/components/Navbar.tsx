import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  // AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
// Drawer imports
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useAppSelector, useAppDispatch } from '../app/hooks'
// MUI icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined'
import {
  createCategory,
  toggleDrawer,
} from '../features/category/CategorySlice'

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
  const { categories, drawerOpen, categoryCreating } = useAppSelector(
    (state) => state.category
  )
  const dispatch = useAppDispatch()
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
          {categories.map((category, index) => (
            <ListItem
              key={category.title}
              disablePadding
              sx={{ display: 'block' }}
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
                  {category.id === 'favorite' ? (
                    <StarBorderIcon />
                  ) : category.id === 'trash' ? (
                    <DeleteOutlineIcon />
                  ) : (
                    <LabelOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={category.title}
                  sx={{ opacity: drawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </Box>
  )
}

export default Navbar
