import { FC } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  addExercise,
  addSet,
  saveRoutine,
  setExerciseName,
  setExerciseReps,
  setExerciseWeight,
  setRoutineName,
  removeExercise,
  removeSet,
  reorderExs,
  addNote,
} from '../features/routine/RoutineSlice'
import { useParams, Link } from 'react-router-dom'
// MUI imports
import {
  Container,
  TextField,
  Box,
  Typography,
  Grid,
  IconButton,
} from '@mui/material'
import { styled } from '@mui/system'
// MUI icons
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
// dnd
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd'
import { SelectRestTimer } from '../components'

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

const EditRoutinePage: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)
  const { drawerOpen } = useAppSelector((state) => state.category)
  const { id } = useParams()

  const handleSave = () => {
    dispatch(saveRoutine())
  }

  const routine = all_routines.find((routine) => routine.id === id)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

  return (
    <Container>
      {/* routine */}
      {routine ? (
        <MyForm
          onSubmit={submitHandler}
          sx={drawerOpen ? { marginLeft: '240px' } : null}
        >
          <TextField
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
          />
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
                              {ex.isNew ? (
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
                              ) : (
                                <Typography
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    padding: '0.98rem',
                                    borderBottom: '1px solid grey',
                                  }}
                                >
                                  {ex.title ? ex.title : ''}
                                </Typography>
                              )}
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
                            {/* timer */}
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
                                      }}
                                    >
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
              component={Link}
              to={`/routine/${routine.id}`}
              variant='contained'
              color='secondary'
              fullWidth
              onClick={() => handleSave()}
              sx={{ border: '1px solid black' }}
            >
              <SaveIcon color='inherit' />
              <Typography align='center'>Сохранить протокол</Typography>
            </Button>
          </MyBox>
        </MyForm>
      ) : null}
    </Container>
  )
}

export default EditRoutinePage
