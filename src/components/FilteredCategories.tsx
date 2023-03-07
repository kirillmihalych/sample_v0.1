import { FC } from 'react'
import { useAppSelector } from '../app/hooks'
import { ICategory, IRoutine } from '../interfaces'
// MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

interface IFilteredCategoriesProps {
  id: string
}

const FilteredCategories: FC<IFilteredCategoriesProps> = ({ id }) => {
  const { categories } = useAppSelector((state) => state.category)
  const { all_routines } = useAppSelector((state) => state.routine)

  const finded = all_routines.find((routine) => routine.id === id) as IRoutine
  const routineCategories = finded.category as ICategory[]
  const displayed = []

  if (finded && routineCategories) {
    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < routineCategories.length; j++) {
        if (categories[i].id === routineCategories[j].id) {
          displayed.push(categories[i].title)
        }
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {displayed
        ? displayed.map((category, index) => {
            return (
              <Paper
                key={index}
                elevation={0}
                variant='outlined'
                sx={{
                  fontSize: '15px',
                  padding: '0px 10px',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  bgcolor: 'lightgrey',
                }}
              >
                {category}
              </Paper>
            )
          })
        : null}
    </Box>
  )
}

export default FilteredCategories
