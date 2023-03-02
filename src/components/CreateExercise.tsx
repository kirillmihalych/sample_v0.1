import { FC, useState } from 'react'

const CreateExercise: FC = () => {
  const [title, setTitle] = useState<string>('')
  const [reps, setReps] = useState<string>('')

  const titleChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const repsChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(e.target.value)
  }

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='title'
          value={title}
          onChange={titleChanger}
        />
        <input type='text' placeholder='weight' />
        <input
          type='text'
          placeholder='reps'
          value={reps}
          onChange={repsChanger}
        />
      </form>
      <button>Add to routine</button>
    </div>
  )
}

export default CreateExercise
