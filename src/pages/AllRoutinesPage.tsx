import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addRoutine, removeRoutine } from '../features/routine/RoutineSlice'
// MUI Imports
import { Grid } from '@mui/material'
import { styled } from '@mui/system'

const MyGridContainer = styled(Grid)({
  width: '95%',
  maxWidth: 1000,
  margin: '0 auto',
})

const AllRoutinesPage: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)

  return (
    <MyGridContainer
      container
      spacing={2}
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item xs={3}>
        <Link to={'/create-routine'} onClick={() => dispatch(addRoutine())}>
          Создать тренировку
        </Link>
      </Grid>
      <Grid item xs={9}>
        {all_routines.map((routine: any) => {
          return (
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
              key={routine.id}
            >
              <h5>{routine.title}</h5>
              <Link to={`/routine/${routine.id}`}>watch</Link>
              <Link to={`/routine-editing/${routine.id}`}>change routine</Link>
              <button
                type='button'
                onClick={() => dispatch(removeRoutine(routine.id))}
              >
                delete
              </button>
            </Grid>
          )
        })}
      </Grid>
    </MyGridContainer>
  )
}

export default AllRoutinesPage
