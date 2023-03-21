import * as React from 'react'
// redux imports
import { useAppSelector } from '../app/hooks'
// MUI
import { Box, Typography, Link, Grid, Paper } from '@mui/material'
// MUI icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
// Router
import { useParams, Link as RouterLink } from 'react-router-dom'
import { ISet } from '../interfaces/index'

export interface IEx {
  id: string
  title: string | undefined
  sets: any
  timer_trigger?: boolean
  restTimer?: string
  note?: string
  routine_id?: string
  routine_title?: string
  routine_date?: string
}

let initialValue = {
  id: '',
  routine_id: '',
  title: '',
  sets: [],
  restTimer: '',
  note: '',
  routine_title: '',
  routine_date: '',
}

const ExercisePage: React.FC = () => {
  const { id: ex_name } = useParams()
  const { history_store } = useAppSelector((state) => state.history)

  const exs = history_store
    .map((routine) => {
      // const res = []
      const res = routine.exs.filter((ex) => ex.title === ex_name)
      const values = res.map((ex: IEx) => {
        return (initialValue = {
          id: ex.id,
          routine_id: routine.id,
          title: ex.title as string,
          sets: ex.sets,
          restTimer: ex.restTimer as string,
          note: ex.note as string,
          routine_title: routine.title,
          routine_date: routine.date as string,
        })
      })

      initialValue = {
        id: '',
        routine_id: '',
        title: '',
        sets: [],
        restTimer: '',
        note: '',
        routine_title: '',
        routine_date: '',
      }

      return res.length > 0 ? values : false
    })
    .filter((ex_links) => ex_links !== false)
    .flat() as IEx[]

  // calculate max reps set
  const reps = exs
    .map((ex) => {
      return ex.sets.map((set: ISet) => set.reps)
    })
    .flat() as number[]
  const best_set = reps.sort((a, b) => b - a)

  // calculate max reps at one workout
  const max_Reps = exs.map((ex) => {
    const reps = ex.sets.map((set: ISet) => Number(set.reps))
    const maxValue = reps.reduce((acc: number, value: number) => acc + value)
    return maxValue
  })

  return (
    <Box
      sx={{
        margin: '7rem',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        gap: '5rem',
      }}
    >
      {/* records */}
      <Box sx={{ width: '45%' }}>
        <Typography variant='h4' sx={{ marginBottom: '1.5rem' }}>
          {ex_name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <EmojiEventsIcon />
          <Typography variant='h6' color='initial'>
            Рекорды
          </Typography>
        </Box>{' '}
        <Typography variant='body2'>
          Повторов в подходе: {best_set[0]}
        </Typography>
        <Typography variant='body2'>
          Повторов за тренировку: {max_Reps}
        </Typography>
      </Box>
      {/* history */}
      <Box sx={{ width: '65%' }}>
        <Typography variant='h4' sx={{ marginBottom: '1.5rem' }}>
          История
        </Typography>
        {exs.map((ex) => {
          return (
            <Paper
              key={ex.id}
              sx={{
                marginBottom: '1.5rem',
                p: 2,
                boxShadow: 1,
                bgcolor: '#EEEEEE',
                border: '2px solid black',
                borderRadius: 0,
                ':hover': {
                  boxShadow: 3,
                  bgcolor: 'white',
                },
              }}
            >
              <Link
                component={RouterLink}
                underline='none'
                to={`/history/history_routine/${ex.routine_id}`}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='h4'>{ex.routine_title}</Typography>
                  <ArrowForwardIosIcon />
                </Box>

                <Typography variant='h6'>{ex.routine_date}</Typography>

                <Box>
                  <Grid container columnSpacing={2}>
                    {/* sets */}
                    <Grid item xs={4}>
                      <Typography variant='body2' color='secondary.dark'>
                        подходы
                      </Typography>
                      {ex.sets.map((set: ISet) => {
                        return (
                          <Box
                            key={set.number}
                            sx={{ bgcolor: '#b3b3b3', paddingTop: '8px' }}
                          >
                            <Grid item>
                              <Typography align='center'>
                                {ex.sets.indexOf(set) + 1}
                              </Typography>
                            </Grid>
                            <hr />
                          </Box>
                        )
                      })}
                    </Grid>
                    {/* weights */}
                    <Grid item xs={4}>
                      <Typography variant='body2' color='secondary.dark'>
                        вес
                      </Typography>
                      {ex.sets.map((set: ISet) => {
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
                      <Typography variant='body2' color='secondary.dark'>
                        повторения
                      </Typography>
                      {ex.sets.map((set: ISet) => {
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
                </Box>
              </Link>
            </Paper>
          )
        })}
      </Box>
    </Box>
  )
}

export default ExercisePage
