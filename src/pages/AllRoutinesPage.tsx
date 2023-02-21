import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addRoutine } from '../features/routine/RoutineSlice'

const AllRoutinesPage: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Link to={'/create-routine'} onClick={() => dispatch(addRoutine())}>
        Создать тренировку
      </Link>
    </div>
  )
}

export default AllRoutinesPage
