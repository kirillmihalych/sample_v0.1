import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addRoutine, removeRoutine } from '../features/routine/RoutineSlice'

const AllRoutinesPage: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)

  return (
    <div>
      <div>
        {all_routines.map((routine: any) => {
          return (
            <div key={routine.id}>
              <h5>{routine.title}</h5>
              <Link to={`/routine/${routine.id}`}>watch</Link>
              <Link to={`/routine-editing/${routine.id}`}>change routine</Link>
              {/*  */}
              {/* add link to edit routine */}
              {/*  */}
              <button
                type='button'
                onClick={() => dispatch(removeRoutine(routine.id))}
              >
                delete
              </button>
            </div>
          )
        })}
      </div>
      <Link to={'/create-routine'} onClick={() => dispatch(addRoutine())}>
        Создать тренировку
      </Link>
      {/* <button type='button' onClick={() => uuid()}>
        check
      </button> */}
    </div>
  )
}

export default AllRoutinesPage
