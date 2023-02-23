import { FC } from 'react'
import { Link } from 'react-router-dom'
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
} from '../features/routine/RoutineSlice'
// MUI imports
import { Container, TextField, Box, Typography, Grid } from '@mui/material'
import { styled } from '@mui/system'
// MUI icons
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const MyForm = styled('form')({
  height: '85vh',
  marginTop: '2rem',
  border: '1px solid grey',
})

const MyBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-beetween',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  bgcolor: 'red',
})

const RoutineConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)
  const newRoutine = all_routines[all_routines.length - 1]
  const { id: routine_id, title, exs } = newRoutine

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Container>
      <MyForm onSubmit={submitHandler}>
        {/* routine */}
        <TextField
          id='standard-basic'
          label='Имя протокола'
          variant='filled'
          value={title}
          onChange={(e) =>
            dispatch(setRoutineName({ routine_id, title: e.target.value }))
          }
          fullWidth
        />
        <div>
          {exs?.map((ex) => {
            const { id: ex_id } = ex
            return (
              // exercise
              <Grid container key={ex_id}>
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
                          routine_id,
                          ex_id,
                          title: e.target.value,
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
                        dispatch(removeExercise({ routine_id, ex_id }))
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
                {ex.sets?.map((set) => {
                  return (
                    <Grid container key={set.number}>
                      <span>{ex.sets.indexOf(set) + 1}</span>
                      x
                      <input
                        type='text'
                        placeholder='weight'
                        value={set.weight}
                        onChange={(e) =>
                          dispatch(
                            setExerciseWeight({
                              routine_id,
                              ex_id,
                              title: e.target.value,
                              number: set.number,
                            })
                          )
                        }
                      />
                      x
                      <input
                        type='text'
                        placeholder='reps'
                        value={set.reps}
                        onChange={(e) =>
                          dispatch(
                            setExerciseReps({
                              routine_id,
                              ex_id,
                              title: e.target.value,
                              number: set.number,
                            })
                          )
                        }
                      />
                      <button
                        type='button'
                        onClick={() =>
                          dispatch(
                            removeSet({ routine_id, ex_id, number: set.number })
                          )
                        }
                      >
                        remove
                      </button>
                    </Grid>
                  )
                })}
                <Button
                  variant='contained'
                  color='secondary'
                  fullWidth
                  onClick={() => dispatch(addSet({ routine_id, ex_id }))}
                >
                  <AddCircleIcon color='inherit' />
                  <Typography align='center'>Добавить подход</Typography>
                </Button>
              </Grid>
            )
          })}
          <MyBox>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => dispatch(addExercise(routine_id))}
            >
              <AddCircleIcon color='inherit' />
              <Typography align='center'>Добавить упражнение</Typography>
            </Button>
          </MyBox>
        </div>
      </MyForm>
      <button type='button' onClick={() => dispatch(saveRoutine())}>
        <Link to={`/routine/${routine_id}`}>save routine</Link>
      </button>
    </Container>
  )
}

export default RoutineConstructor
