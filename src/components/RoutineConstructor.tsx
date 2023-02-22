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

const RoutineConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)
  const newRoutine = all_routines[all_routines.length - 1]
  const { id: routine_id, title, exs } = newRoutine

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        {/* routine */}
        <input
          type='text'
          placeholder={title}
          value={title}
          onChange={(e) =>
            dispatch(setRoutineName({ routine_id, title: e.target.value }))
          }
        />
        <div>
          {exs?.map((ex) => {
            const { id: ex_id } = ex
            return (
              // exercise
              <article key={ex_id}>
                <input
                  type='text'
                  placeholder='имя упражнения'
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
                <button
                  type='button'
                  onClick={() =>
                    dispatch(removeExercise({ routine_id, ex_id }))
                  }
                >
                  remove
                </button>
                {/* set */}
                {ex.sets?.map((set) => {
                  return (
                    <div key={set.number}>
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
                    </div>
                  )
                })}

                <button
                  type='button'
                  onClick={() => dispatch(addSet({ routine_id, ex_id }))}
                >
                  add set
                </button>
              </article>
            )
          })}
          <button
            type='button'
            onClick={() => dispatch(addExercise(routine_id))}
          >
            add ex
          </button>
        </div>
      </form>
      <button type='button' onClick={() => dispatch(saveRoutine())}>
        <Link to={`/routine/${routine_id}`}>save routine</Link>
      </button>
    </div>
  )
}

export default RoutineConstructor
