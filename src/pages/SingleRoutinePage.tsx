import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useParams, useNavigate } from 'react-router-dom'
// MUI imports
import { Container, Typography, Grid, Box, IconButton } from '@mui/material'
// MUI icons
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import { removeRoutine } from '../features/routine/RoutineSlice'

const SingleRoutinePage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)
  const { drawerOpen } = useAppSelector((state) => state.category)
  const { id } = useParams()

  const routine = all_routines.find((routine) => routine.id === id)

  const handleEdit = () => {
    navigate(`/routine-editing/${id}`)
  }

  const handleDelete = () => {
    dispatch(removeRoutine(id as string))
    navigate('/')
  }
  return (
    <div>
      {routine ? (
        <Container
          fixed
          sx={
            drawerOpen
              ? { marginLeft: '240px', marginTop: '5rem' }
              : { marginTop: '5rem', marginLeft: '55px' }
          }
        >
          <Typography variant='h4'>Протокол</Typography>
          <Typography variant='h4'>«{routine.title}»</Typography>
          <Box>
            <IconButton color='primary' onClick={handleEdit}>
              <ModeEditOutlinedIcon />
            </IconButton>
            <IconButton color='primary' onClick={handleDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
          {/* exercises */}
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='start'
            marginTop={'2rem'}
          >
            {routine.exs.map((exercise) => {
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
      ) : null}
    </div>
  )
}

export default SingleRoutinePage
