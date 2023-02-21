import { FC } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addExercise, addSet } from '../features/routine/RoutineSlice'

const RoutineConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)
  const newRoutine = all_routines[all_routines.length - 1]
  const { id: routine_id, title, exs } = newRoutine

  return (
    // routine
    <div>
      <h4>{routine_id}</h4>
      <h5>{title}</h5>
      <div>
        {exs?.map((ex) => {
          const { id: ex_id } = ex
          return (
            // exercise
            <article key={ex_id}>
              <h5>{ex.title}</h5>
              {/* set */}
              {ex.sets?.map((set) => {
                return (
                  <div key={set.number}>
                    <h5>{set.number}</h5>
                  </div>
                )
              })}

              <button onClick={() => dispatch(addSet({ routine_id, ex_id }))}>
                add set
              </button>
            </article>
          )
        })}
        <button onClick={() => dispatch(addExercise(routine_id))}>
          add ex
        </button>
      </div>
    </div>
  )
}

export default RoutineConstructor
