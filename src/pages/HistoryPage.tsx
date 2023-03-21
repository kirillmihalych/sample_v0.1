import { FC, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  removeRoutine,
  reorderRoutines,
} from '../features/routine/RoutineSlice'
import { deleteWorkoutFormHistory } from '../features/history/HistorySlice'
import { openAddCategory } from '../features/category/CategorySlice'
// MUI Imports
import { Grid, Box } from '@mui/material'
import { styled } from '@mui/system'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// Mui icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// dnd
import { AddCategoryModal } from '../components/AddCategoryModal'
import FilteredCategories from '../components/FilteredCategories'
import DateCalendarComponent from '../components/DateCalendarMUI'

// test branch

const MyGridContainer = styled(Grid)({
  width: 'calc(85% - 120px)',
  maxWidth: 1000,
  margin: '5rem auto',
})

const HistoryPage: FC = () => {
  const dispatch = useAppDispatch()
  const { history_store } = useAppSelector((state) => state.history)

  // MUI logic
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [routineId, setRoutineId] = useState<string>('')
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget)
    setRoutineId(id)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <MyGridContainer>
      <DateCalendarComponent />
      <Grid item xs={9}>
        {history_store
          ? history_store.map((routine) => {
              return (
                <Grid
                  container
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    border: '2px solid #E1E1E1',
                    marginTop: '5px',
                    padding: '0 12px',
                    borderRadius: '5px',
                    bgcolor: '#F3F3F3',
                    height: '125px',
                  }}
                  key={routine.id}
                >
                  <Link
                    underline='none'
                    component={RouterLink}
                    to={`/history/history_routine/${routine.id}`}
                    sx={{
                      width: 'calc(100% - 45px)',
                      padding: '20px',
                      // paddingLeft: 'calc(-20px)',
                      '&:hover': {
                        transition: 0.2,
                        bgcolor: '#b3b3b3',
                        borderRadius: '5px',
                      },
                    }}
                  >
                    <Typography variant='h6'>
                      {routine.title ? routine.title : 'пустая тренировка'}
                    </Typography>
                  </Link>
                  {/* modal */}
                  <AddCategoryModal />
                  {/* menu start */}
                  <Box>
                    <IconButton
                      id='demo-positioned-button'
                      aria-controls={open ? 'demo-positioned-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(e) => handleClick(e, routine.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      id='demo-positioned-menu'
                      aria-labelledby='demo-positioned-button'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      {/* Items */}
                      {/* change item */}
                      <MenuItem
                        onClick={handleClose}
                        component={RouterLink}
                        to={`/routine-editing/${routineId}`}
                      >
                        <IconButton
                          sx={{
                            '&.MuiButtonBase-root:hover': {
                              bgcolor: 'transparent',
                            },
                          }}
                        >
                          <EditIcon fontSize='medium' color='primary' />
                        </IconButton>
                        <Typography>Изменить</Typography>
                      </MenuItem>
                      {/* delete item */}
                      <MenuItem onClick={handleClose}>
                        <Box
                          onClick={() =>
                            dispatch(deleteWorkoutFormHistory(routineId))
                          }
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton
                            sx={{
                              '&.MuiButtonBase-root:hover': {
                                bgcolor: 'transparent',
                              },
                            }}
                          >
                            <DeleteIcon fontSize='medium' color='primary' />
                          </IconButton>
                          <Typography>Удалить</Typography>
                        </Box>
                      </MenuItem>
                      {/* End of items */}
                      {/* //////////// */}
                      {/* Add category */}

                      <MenuItem onClick={handleClose}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                          onClick={() => dispatch(openAddCategory(routineId))}
                        >
                          <IconButton
                            sx={{
                              '&.MuiButtonBase-root:hover': {
                                bgcolor: 'transparent',
                              },
                            }}
                          >
                            <AddCircleOutlineIcon
                              fontSize='medium'
                              color='primary'
                            />
                          </IconButton>
                          <Typography>Категории</Typography>
                        </Box>
                      </MenuItem>
                      {/* Add category end */}
                    </Menu>
                    {/* menu end */}
                  </Box>
                  {/* отображение категорий */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      paddingLeft: '20px',
                    }}
                  >
                    <FilteredCategories id={routine.old_id as string} />
                  </Box>
                  <Box>{routine.date}</Box>
                </Grid>
              )
            })
          : null}
      </Grid>
    </MyGridContainer>
  )
}

export default HistoryPage
