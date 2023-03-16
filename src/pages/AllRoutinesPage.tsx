import { FC, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  addRoutine,
  removeRoutine,
  reorderRoutines,
} from '../features/routine/RoutineSlice'
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
import AddBoxIcon from '@mui/icons-material/AddBox'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
// dnd
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { AddCategoryModal } from '../components/AddCategoryModal'
import FilteredCategories from '../components/FilteredCategories'

// test branch

const MyGridContainer = styled(Grid)({
  width: '95%',
  // minWidth: 450,
  maxWidth: 1000,
  margin: '5rem auto',
})

const AllRoutinesPage: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines, filtered_routines } = useAppSelector(
    (state) => state.routine
  )

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

  // dnd
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const items = Array.from(all_routines)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)
    dispatch(reorderRoutines(items))
  }

  return (
    <MyGridContainer
      container
      spacing={2}
      direction='row'
      justifyContent='center'
      alignItems='center'
      // sx={drawerOpen ? { marginLeft: '125px' } : null}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant='contained'
          color='secondary'
          sx={{
            width: '74.5%',
            boxShadow: 'none',
            border: '2px solid lightgrey',
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'lightgrey',
              boxShadow: 'none',
              border: '2px solid black',
            },
          }}
          component={RouterLink}
          to={'/create-routine'}
          onClick={() => dispatch(addRoutine())}
        >
          <Typography>Создать тренировку</Typography>
          <IconButton>
            <AddBoxIcon fontSize='large' color='primary' />
          </IconButton>
        </Button>
      </Grid>
      {/* dnd */}
      {filtered_routines.length >= 1 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'routines'}>
            {(provided) => (
              <Grid
                item
                xs={9}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filtered_routines
                  ? filtered_routines.map((routine, index) => {
                      return (
                        <Draggable
                          key={routine.id}
                          draggableId={routine.id}
                          index={index}
                        >
                          {(provided) => (
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
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Link
                                underline='none'
                                component={RouterLink}
                                to={`/routine/${routine.id}`}
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
                                  {routine.title
                                    ? routine.title
                                    : 'пустая тренировка'}
                                </Typography>
                              </Link>
                              {/* modal */}
                              <AddCategoryModal />
                              {/* menu start */}
                              <Box>
                                <IconButton
                                  id='demo-positioned-button'
                                  aria-controls={
                                    open ? 'demo-positioned-menu' : undefined
                                  }
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
                                      <EditIcon
                                        fontSize='medium'
                                        color='primary'
                                      />
                                    </IconButton>
                                    <Typography>Изменить</Typography>
                                  </MenuItem>
                                  {/* delete item */}
                                  <MenuItem onClick={handleClose}>
                                    <Box
                                      onClick={() =>
                                        dispatch(removeRoutine(routineId))
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
                                        <DeleteIcon
                                          fontSize='medium'
                                          color='primary'
                                        />
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
                                      onClick={() =>
                                        dispatch(openAddCategory(routineId))
                                      }
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
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '1rem',
                                  paddingLeft: '20px',
                                }}
                              >
                                {/* отображение категорий */}
                                <FilteredCategories id={routine.id} />
                                {/* отображение категорий */}
                              </Box>
                              <Button
                                variant='contained'
                                component={RouterLink}
                                to={`/current_routine/${routine.id}`}
                                sx={{
                                  fontSize: '15px',
                                  height: '24px',
                                  // padding: '0px 10px',
                                  // borderRadius: '5px',
                                  marginBottom: '5px',
                                  bgcolor: 'black',
                                  '&:hover': {
                                    bgcolor: 'grey',
                                  },
                                }}
                              >
                                Старт
                              </Button>
                            </Grid>
                          )}
                        </Draggable>
                      )
                    })
                  : null}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'routines'}>
            {(provided) => (
              <Grid
                item
                xs={9}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {all_routines
                  ? all_routines.map((routine, index) => {
                      return (
                        <Draggable
                          key={routine.id}
                          draggableId={routine.id}
                          index={index}
                        >
                          {(provided) => (
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
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Link
                                underline='none'
                                component={RouterLink}
                                to={`/routine/${routine.id}`}
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
                                  {routine.title
                                    ? routine.title
                                    : 'пустая тренировка'}
                                </Typography>
                              </Link>
                              {/* modal */}
                              <AddCategoryModal />
                              {/* menu start */}
                              <Box>
                                <IconButton
                                  id='demo-positioned-button'
                                  aria-controls={
                                    open ? 'demo-positioned-menu' : undefined
                                  }
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
                                      <EditIcon
                                        fontSize='medium'
                                        color='primary'
                                      />
                                    </IconButton>
                                    <Typography>Изменить</Typography>
                                  </MenuItem>
                                  {/* delete item */}
                                  <MenuItem onClick={handleClose}>
                                    <Box
                                      onClick={() =>
                                        dispatch(removeRoutine(routineId))
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
                                        <DeleteIcon
                                          fontSize='medium'
                                          color='primary'
                                        />
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
                                      onClick={() =>
                                        dispatch(openAddCategory(routineId))
                                      }
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
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '1rem',
                                  paddingLeft: '20px',
                                }}
                              >
                                {/* отображение категорий */}
                                <FilteredCategories id={routine.id} />
                                {/* отображение категорий */}
                              </Box>
                              <Button
                                variant='contained'
                                component={RouterLink}
                                to={`/current_routine/${routine.id}`}
                                sx={{
                                  fontSize: '15px',
                                  height: '24px',
                                  // padding: '0px 10px',
                                  // borderRadius: '5px',
                                  marginBottom: '5px',
                                  bgcolor: 'black',
                                  '&:hover': {
                                    bgcolor: 'grey',
                                  },
                                }}
                              >
                                Старт
                              </Button>
                            </Grid>
                          )}
                        </Draggable>
                      )
                    })
                  : null}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/*  */}
    </MyGridContainer>
  )
}

export default AllRoutinesPage
