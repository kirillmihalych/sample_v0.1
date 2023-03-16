import { FC } from 'react'
import { useAppSelector } from '../app/hooks'
import { useParams } from 'react-router-dom'
// MUI imports
import { Container, Typography, Grid, Box } from '@mui/material'
// MUI icons
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const SingleRoutinePage: FC = () => {
  const { all_routines } = useAppSelector((state) => state.routine)
  const { drawerOpen } = useAppSelector((state) => state.category)
  const { id } = useParams()

  const routine = all_routines.find((routine) => routine.id === id)
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
                      {exercise.restTimer}
                    </Box>
                  </Typography>
                  <Grid container columnSpacing={2}>
                    {/* sets */}
                    <Grid item>
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
                    <Grid item>
                      <Typography variant='h6' color='secondary.dark'>
                        вес
                      </Typography>
                      {sets.map((set) => {
                        return (
                          <Box
                            key={set.number}
                            sx={{ bgcolor: '#b3b3b3', paddingTop: '8px' }}
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
                    <Grid item>
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
