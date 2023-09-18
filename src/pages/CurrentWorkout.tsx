import { FC, useEffect, useState } from 'react'
import { useTimer } from 'use-timer'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import dayjs from 'dayjs'
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
  addNote,
  addSet,
  removeExercise,
  removeSet,
  reorderExs,
  setExerciseName,
  setExerciseReps,
  setExerciseWeight,
  setIsDone,
  setIsUndone,
} from '../features/routine/RoutineSlice'
import {
  clearChosenDate,
  saveFinishedWorkout,
  setExircises,
} from '../features/history/HistorySlice'
import { IAction, IRoutine } from '../interfaces'
import { SelectRestTimer } from '../components'
import Paper from '@mui/material/Paper'
// use sound
import sound from '../assets/sound.wav'
// import boopSfx from '../../sounds/boop'

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
  const { date: chosenDate } = useAppSelector((state) => state.history)
  const [timeIsOver, setTimeIsOver] = useState(false)
  // timer
  const { time } = useTimer({
    autostart: true,
  })

  const day = dayjs().get('date')
  const month = dayjs().get('month') + 1
  const year = dayjs().get('year')

  const audio = new Audio(sound)
  audio.volume = 0.25
  function play() {
    audio.play()
  }

  // const currentTime = dayjs().hour() + ':' + dayjs().minute()
  // rest timer
  const {
    time: restTimer,
    start: startRestTimer,
    advanceTime,
    reset,
  } = useTimer({
    initialTime: Number(0),
    timerType: 'DECREMENTAL',
    endTime: Number(0),
    onTimeOver: () => {
      setTimeout(function () {
        setTimeIsOver(true)
        play()
      }, 1000)
    },
  })

  const routine = all_routines.find((routine) => routine.id === id)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleFinish = (routine: IRoutine) => {
    dispatch(saveFinishedWorkout(routine))
    navigate('/')
    dispatch(setIsUndone(routine.id))
    dispatch(clearChosenDate())
    dispatch(setExircises())
  }

  const handleIsDone = (load: IAction) => {
    const { routine_id, ex_id, number } = load
    const routine = all_routines.find((routine) => routine.id === routine_id)
    const ex = routine?.exs.find((ex) => ex.id === ex_id)

    dispatch(
      setIsDone({
        routine_id,
        ex_id,
        number,
      })
    )
    setTimeIsOver(false)
    reset()
    const num = Number(ex?.restTimer)
    startRestTimer()
    advanceTime(-num)
  }
  let minutes = Math.ceil(restTimer / 60)
  let seconds = restTimer % 60

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
    dispatch(setIsUndone(id as string))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: '1rem',
        margin: '5rem 5rem',
        marginLeft: drawerOpen ? 'calc(240px + 5rem)' : null,
        maxWidth: '900px',
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
            Длительность: {Math.round(time / 60)} минут {time % 60} сек
          </Typography>
        ) : time > 3600 ? (
          <Typography>
            Длительность: {Math.round(time / 3600)} часов{' '}
            {Math.round(time / 60)} минут
          </Typography>
        ) : (
          <Typography>Длительность: {time} сек</Typography>
        )}
      </Box>
      {/* set timer */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <Paper sx={{ fontSize: '3rem', padding: '0 1rem' }}>
          {restTimer >= 60 && minutes > 9
            ? minutes
            : restTimer >= 60 && minutes < 10
            ? `0${minutes}`
            : `00`}
        </Paper>
        :
        <Paper sx={{ fontSize: '3rem', padding: '0 1rem' }}>
          {seconds > 9
            ? seconds
            : timeIsOver || isNaN(restTimer)
            ? `00`
            : `0${seconds}`}
        </Paper>
      </Box>
      <Typography variant='h5'>Время отдыха</Typography>
      {/* routine constructor box */}
      {/* exercises */}
      {routine ? (
        <MyForm onSubmit={submitHandler}>
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
                                height={56}
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
                            <Box sx={{ width: '100%' }}>
                              {/* rest */}
                              <SelectRestTimer
                                ex_id={ex_id}
                                routine_id={routine.id}
                              />
                              {/* note */}
                              <TextField
                                sx={{ padding: '1rem' }}
                                id='outlined-multiline-flexible'
                                placeholder='Добавить заметку'
                                value={ex.note ? ex.note : ''}
                                onChange={(e) =>
                                  dispatch(
                                    addNote({
                                      routine_id: routine.id,
                                      ex_id,
                                      title: e.target.value,
                                    })
                                  )
                                }
                                multiline
                                maxRows={4}
                                fullWidth
                              />
                            </Box>

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
                                <Typography height={'24px'} />
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
                                          handleIsDone({
                                            routine_id: routine.id,
                                            ex_id,
                                            number: set.number,
                                          })
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
                  date:
                    chosenDate.length > 0
                      ? chosenDate
                      : `${day}-${month}-${year}`,
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
