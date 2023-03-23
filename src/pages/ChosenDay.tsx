import * as React from 'react'
// Redux imports
import { setWorkoutOnDate } from '../features/history/HistorySlice'
import { useAppSelector, useAppDispatch } from '../app/hooks'
// MUI imports
import { Box, Container, Grid, Typography, Button, Link } from '@mui/material'
// MUI icons
import AccessTimeIcon from '@mui/icons-material/AccessTime'
// Router
import { useParams, Link as RouterLink } from 'react-router-dom'

const ChosenDay: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { history_store } = useAppSelector((state) => state.history)
  const { all_routines } = useAppSelector((state) => state.routine)
  const finded_routine = history_store.find((routine) => routine.date === id)

  const [hidden, setHidden] = React.useState(false)
  return (
    <Box>
      {finded_routine ? (
        <Container fixed sx={{ marginTop: '5rem', marginLeft: '55px' }}>
          <Typography variant='h4'>Протокол от {id}</Typography>
          <Typography variant='h4'>«{finded_routine.title}»</Typography>
          {/* exercises */}
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='start'
            marginTop={'2rem'}
          >
            {finded_routine.exs.map((exercise) => {
              const { sets } = exercise
              const timer = Number(exercise.restTimer)

              const minutes = Math.ceil(timer / 60)
              const seconds = timer % 60
              return (
                <Grid item key={exercise.id}>
                  <Typography
                    variant='h6'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      bgcolor: 'black',
                      color: '#F3F3F3',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      width: '450px',
                    }}
                  >
                    <Box>
                      {exercise.title ? exercise.title : 'имя не введено'}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <AccessTimeIcon />
                      {timer
                        ? `${minutes > 9 ? minutes : `0${minutes}`}:${
                            seconds > 9 ? seconds : `0${seconds}`
                          }`
                        : '00:00'}
                    </Box>
                  </Typography>

                  <Typography variant='body2' sx={{ p: 1 }}>
                    {exercise.note}
                  </Typography>
                  <Grid container columnSpacing={2} sx={{ width: '650px' }}>
                    {/* sets */}
                    <Grid item xs={4}>
                      <Typography variant='h6' color='secondary.dark'>
                        подходы
                      </Typography>
                      {sets.map((set) => {
                        return (
                          <Box
                            key={set.number}
                            sx={{ bgcolor: '#b3b3b3', paddingTop: '8px' }}
                          >
                            <Grid item>
                              <Typography align='center'>
                                {sets.indexOf(set) + 1}
                              </Typography>
                            </Grid>
                            <hr />
                          </Box>
                        )
                      })}
                    </Grid>
                    {/* weights */}
                    <Grid item xs={4}>
                      <Typography variant='h6' color='secondary.dark'>
                        вес
                      </Typography>
                      {sets.map((set) => {
                        return (
                          <Box
                            key={set.number}
                            sx={{
                              bgcolor: '#b3b3b3',
                              paddingTop: '8px',
                            }}
                          >
                            <Grid item>
                              <Typography align='center'>
                                {set.weight ? set.weight : '0'}
                              </Typography>
                            </Grid>
                            <hr />
                          </Box>
                        )
                      })}
                    </Grid>
                    {/* reps */}
                    <Grid item xs={4}>
                      <Typography variant='h6' color='secondary.dark'>
                        повторения
                      </Typography>
                      {sets.map((set) => {
                        return (
                          <Box
                            key={set.number}
                            sx={{ bgcolor: '#b3b3b3', paddingTop: '8px' }}
                          >
                            <Grid item>
                              <Typography align='center'>{set.reps}</Typography>
                            </Grid>
                            <hr />
                          </Box>
                        )
                      })}
                    </Grid>
                  </Grid>
                  <hr></hr>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      ) : (
        <Box sx={{ margin: '5rem' }}>
          <Typography
            variant='h6'
            color='initial'
            sx={{ marginBottom: '1rem' }}
          >
            {id} тренировка не записана
          </Typography>
          <Button
            variant='outlined'
            sx={{ marginBottom: '1rem' }}
            onClick={() => setHidden(!hidden)}
          >
            {hidden ? 'Записать' : 'Скрыть'}
          </Button>
          <Box>
            {!hidden ? (
              <>
                <Typography
                  variant='h6'
                  color='initial'
                  sx={{ marginBottom: '1rem' }}
                >
                  Выбрать тренировку
                </Typography>
                {all_routines.map((routine) => {
                  return (
                    <Grid
                      key={routine.id}
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
                          {routine.title ? routine.title : 'пустая тренировка'}
                        </Typography>
                      </Link>
                      {/* modal */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '1rem',
                          paddingLeft: '20px',
                        }}
                      ></Box>
                      <Button
                        variant='contained'
                        component={RouterLink}
                        to={`/current_routine/${routine.id}`}
                        sx={{
                          fontSize: '15px',
                          height: '24px',
                          marginBottom: '5px',
                          bgcolor: 'black',
                          '&:hover': {
                            bgcolor: 'grey',
                          },
                        }}
                        onClick={() => dispatch(setWorkoutOnDate(id as string))}
                      >
                        Старт
                      </Button>
                    </Grid>
                  )
                })}
              </>
            ) : null}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ChosenDay
