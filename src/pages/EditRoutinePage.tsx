import { FC } from 'react'
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
import { useParams, Link } from 'react-router-dom'

const EditRoutinePage: FC = () => {
  const dispatch = useAppDispatch()
  const { all_routines } = useAppSelector((state) => state.routine)
  const { id } = useParams()

  const routine = all_routines.find((routine) => routine.id === id)

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div>
      {/* routine */}
      {routine ? (
        <form onSubmit={submitHandler}>
          <input
            type='text'
            placeholder={routine.title}
            value={routine.title}
            onChange={(e) =>
              dispatch(
                setRoutineName({
                  routine_id: routine.id,
                  title: e.target.value,
                })
              )
            }
          />
          <div>
            {/* exercises */}
            {routine.exs.map((ex) => {
              const { id: ex_id } = ex
              return (
                <article key={ex_id}>
                  {/* exercise */}
                  <input
                    type='text'
                    placeholder='имя упражнения'
                    value={ex.title}
                    onChange={(e) =>
                      dispatch(
                        setExerciseName({
                          routine_id: routine.id,
                          ex_id,
                          title: e.target.value,
                        })
                      )
                    }
                  />
                  <button
                    type='button'
                    onClick={() =>
                      dispatch(
                        removeExercise({ routine_id: routine.id, ex_id })
                      )
                    }
                  >
                    remove
                  </button>
                  {/* set */}
                  {ex.sets?.map((set) => {
                    return (
                      <div key={set.number}>
                        <span>{ex.sets.indexOf(set) + 1}</span>x
                        <input
                          type='text'
                          placeholder='weight'
                          value={set.weight}
                          onChange={(e) =>
                            dispatch(
                              setExerciseWeight({
                                routine_id: routine.id,
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
                                routine_id: routine.id,
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
                              removeSet({
                                routine_id: routine.id,
                                ex_id,
                                number: set.number,
                              })
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
                    onClick={() =>
                      dispatch(addSet({ routine_id: routine.id, ex_id }))
                    }
                  >
                    add set
                  </button>
                </article>
              )
            })}
            <button
              type='button'
              onClick={() => dispatch(addExercise(routine.id))}
            >
              add ex
            </button>
          </div>
        </form>
      ) : null}

      <button type='button' onClick={() => dispatch(saveRoutine())}>
        <Link to={`/routine/${id}`}>save changed routine</Link>
      </button>
    </div>
  )
}

export default EditRoutinePage
