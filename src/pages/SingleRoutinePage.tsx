import { FC } from 'react'
import { useAppSelector } from '../app/hooks'
import { useParams, Link } from 'react-router-dom'

const SingleRoutinePage: FC = () => {
  const { all_routines } = useAppSelector((state) => state.routine)
  const { id } = useParams()

  const routine = all_routines.find((routine) => routine.id === id)
  return (
    <div>
      {routine ? (
        <div>
          <h4>{routine.title}</h4>
          <Link to={`/routine-editing/${id}`}>change routine</Link>
          <div>
            {routine.exs.map((exercise) => {
              const { sets } = exercise
              return (
                <article key={exercise.id}>
                  <h5>{exercise.title}</h5>
                  <div>
                    {sets.map((set) => {
                      return (
                        <article key={set.number}>
                          <span>Set: #{set.number}</span> x
                          <span>{set.weight} kg</span> x{' '}
                          <span>{set.reps} reps</span>
                        </article>
                      )
                    })}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default SingleRoutinePage
