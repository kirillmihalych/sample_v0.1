import { FC, useEffect, useState } from 'react'
import { useTimer } from 'use-timer'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
// MUI imports
import {
  Typography,
  Button,
  Box,
  Divider,
  Grid,
  TextField,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
// MUI icons
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
// dnd
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
// redux actions
import {
  addExercise,
  addSet,
  removeExercise,
  removeSet,
  reorderExs,
  saveRoutine,
  setExerciseName,
  setExerciseReps,
  setExerciseWeight,
  setIsDone,
  setIsUndone,
  setRoutineName,
} from '../features/routine/RoutineSlice'
import { saveFinishedWorkout } from '../features/history/HistorySlice'
import { IRoutine } from '../interfaces'

const MyForm = styled('form')({
  marginTop: '5rem',
  marginLeft: '55px',
  border: '1px solid grey',
})

const MyHorizontalLine = styled('hr')({
  marginBottom: 0,
})

const MyBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-beetween',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  bgcolor: 'red',
})

const CurrentWorkout: FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { all_routines } = useAppSelector((state) => state.routine)
  const { drawerOpen } = useAppSelector((state) => state.category)
  // timer
  const { time, start, pause, reset, status } = useTimer()

  const routine = all_routines.find((routine) => routine.id === id)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleFinish = (routine: IRoutine) => {
    dispatch(saveFinishedWorkout(routine))
    navigate('/')
    dispatch(setIsUndone(routine.id))
  }

  // drag and drop
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (routine) {
      const items = Array.from(routine.exs)
      const [newOrder] = items.splice(source.index, 1)
      items.splice(destination.index, 0, newOrder)
      dispatch(reorderExs({ id, exs: items }))
    }
  }

  useEffect(() => {
    start()
  }, [routine])

  useEffect(() => {
    dispatch(setIsUndone(id as string))
  }, [location])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItem: 'center',
        justifyContent: 'center',
        rowGap: '1rem',
        margin: '5rem 5rem',
        marginLeft: drawerOpen ? 'calc(240px + 5rem)' : null,
      }}
    >
      {/* header box*/}
      <Box
        sx={{
          display: 'flex',
          alignItem: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography>{routine?.title}</Typography>
        <Button variant='contained' endIcon={<AccessAlarmsIcon />}>
          Завершить
        </Button>
      </Box>
      <Divider />
      {/* timer box */}
      <Box>
        {time > 60 ? (
          <Typography>
            Время: {Math.round(time / 60)} минут {time % 60} сек
          </Typography>
        ) : time > 3600 ? (
          <Typography>
            Время: {Math.round(time / 3600)} часов {Math.round(time / 60)} минут
          </Typography>
        ) : (
          <Typography>Время: {time} сек</Typography>
        )}
      </Box>
      <Divider />
      {/* routine constructor box */}
      {/* exercises */}
      {routine ? (
        <MyForm onSubmit={submitHandler}>
          {/* <TextField
            id='standard-basic'
            label='Имя протокола'
            variant='filled'
            value={routine.title}
            onChange={(e) =>
              dispatch(
                setRoutineName({
                  routine_id: routine.id,
                  title: e.target.value,
                })
              )
            }
            fullWidth
            required
          /> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='exs'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {routine.exs.map((ex, index) => {
                    const { id: ex_id } = ex
                    return (
                      // exercise
                      <Draggable key={ex_id} draggableId={ex_id} index={index}>
                        {(provided) => (
                          <Grid
                            container
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Grid item xs={10}>
                              <TextField
                                fullWidth
                                id='filled-basic'
                                variant='filled'
                                label='Имя упражнения'
                                value={ex.title}
                                onChange={(e) =>
                                  dispatch(
                                    setExerciseName({
                                      routine_id: routine.id,
                                      ex_id,
                                      title: e!.target.value,
                                    })
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Grid
                                container
                                direction='column'
                                justifyContent='center'
                                alignItems='center'
                                height={60}
                              >
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  onClick={() =>
                                    dispatch(
                                      removeExercise({
                                        routine_id: routine.id,
                                        ex_id,
                                      })
                                    )
                                  }
                                  sx={{
                                    height: 60,
                                    width: '100%',
                                    borderRadius: 0,
                                  }}
                                >
                                  <DeleteOutlineIcon fontSize='small' />
                                  <Typography>Удалить</Typography>
                                </Button>
                              </Grid>
                            </Grid>

                            {/* set */}
                            {/* sets */}
                            <Grid container>
                              {/* подходы */}
                              <Grid item xs={3}>
                                <Typography align='center'>Сеты</Typography>
                                <MyHorizontalLine />
                                {ex.sets?.map((set) => {
                                  return (
                                    <Typography
                                      align='center'
                                      key={set.number}
                                      sx={{
                                        height: '59px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        bgcolor: set.isDone
                                          ? 'lightgreen'
                                          : null,
                                      }}
                                    >
                                      {ex.sets.indexOf(set) + 1}
                                    </Typography>
                                  )
                                })}
                              </Grid>
                              {/* веса */}
                              <Grid item xs={3}>
                                <Typography>Веса</Typography>
                                <MyHorizontalLine />
                                {ex.sets?.map((set) => {
                                  return (
                                    <TextField
                                      key={set.number}
                                      id='outlined-basic'
                                      variant='outlined'
                                      value={set.weight}
                                      onChange={(e) =>
                                        dispatch(
                                          setExerciseWeight({
                                            routine_id: routine.id,
                                            ex_id,
                                            title: e.target.value,
                                            number: set.number,
                                          })
                                        )
                                      }
                                      sx={{
                                        height: '59px',
                                        bgcolor: set.isDone
                                          ? 'lightgreen'
                                          : null,
                                      }}
                                    />
                                  )
                                })}
                              </Grid>
                              {/* повторы */}
                              <Grid item xs={3}>
                                <Typography>Повторы</Typography>
                                <MyHorizontalLine />
                                {ex.sets?.map((set) => {
                                  return (
                                    <TextField
                                      key={set.number}
                                      id='outlined-basic'
                                      // label='кг'
                                      variant='outlined'
                                      value={set.reps}
                                      onChange={(e) =>
                                        dispatch(
                                          setExerciseReps({
                                            routine_id: routine.id,
                                            ex_id,
                                            title: e.target.value,
                                            number: set.number,
                                          })
                                        )
                                      }
                                      sx={{
                                        height: '59px',
                                        bgcolor: set.isDone
                                          ? 'lightgreen'
                                          : null,
                                      }}
                                    />
                                  )
                                })}
                              </Grid>
                              {/* кнопки */}
                              <Grid item xs={3}>
                                <Typography height={'28px'} />
                                <MyHorizontalLine />
                                {ex.sets?.map((set) => {
                                  return (
                                    <Box
                                      key={set.number}
                                      sx={{
                                        height: '59px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        bgcolor: set.isDone
                                          ? 'lightgreen'
                                          : null,
                                      }}
                                    >
                                      <IconButton
                                        onClick={() =>
                                          dispatch(
                                            setIsDone({
                                              routine_id: routine.id,
                                              ex_id,
                                              number: set.number,
                                            })
                                          )
                                        }
                                      >
                                        <DoneOutlineIcon />
                                      </IconButton>
                                      <IconButton
                                        onClick={() =>
                                          dispatch(
                                            removeSet({
                                              routine_id: routine.id,
                                              ex_id,
                                              number: set.number,
                                            })
                                          )
                                        }
                                      >
                                        <DeleteIcon color='primary' />
                                      </IconButton>
                                    </Box>
                                  )
                                })}
                              </Grid>
                            </Grid>

                            {/* добавить подход */}
                            <Button
                              variant='contained'
                              color='secondary'
                              fullWidth
                              onClick={() =>
                                dispatch(
                                  addSet({ routine_id: routine.id, ex_id })
                                )
                              }
                            >
                              <AddCircleIcon color='inherit' />
                              <Typography align='center'>
                                Добавить подход
                              </Typography>
                            </Button>
                          </Grid>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* exercises */}

          <MyBox>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => dispatch(addExercise(routine.id))}
            >
              <AddCircleIcon color='inherit' />
              <Typography align='center'>Добавить упражнение</Typography>
            </Button>
          </MyBox>
          <MyBox>
            <Button
              // disabled={title ? false : true}
              // component={Link}
              // to={`/routine/${routine.id}`}
              variant='contained'
              color='secondary'
              fullWidth
              onClick={() =>
                handleFinish({
                  id: routine.id,
                  title: routine.title,
                  exs: routine.exs,
                  category: routine.category,
                  time: time,
                })
              }
              sx={{ border: '1px solid black' }}
            >
              <SaveIcon color='inherit' />
              <Typography align='center'>Финиш</Typography>
            </Button>
          </MyBox>
        </MyForm>
      ) : null}
    </Box>
  )
}

export default CurrentWorkout
