import * as React from 'react'
// Redux imports
import { useAppSelector } from '../app/hooks'
// MUI imports
import { Box, Grid } from '@mui/material'
// MUI custom search field imports
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
// MUI icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
// Router
import { Link as RouterLink } from 'react-router-dom'

const AllExercisePage: React.FC = () => {
  const { ex_names } = useAppSelector((state) => state.history)
  const [inputValue, setInputValue] = React.useState('')

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value)
  }

  return (
    <Box sx={{ margin: '7rem', maxWidth: 1000 }}>
      {/* search form */}
      {/* <MyForm> */}
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
        <InputBase
          fullWidth
          value={inputValue}
          onChange={(e) => changeHandler(e)}
          sx={{ ml: 1, flex: 1 }}
          placeholder='Найти упражнение'
        />
      </Paper>
      {/* </MyForm> */}
      {/* exercises */}
      {ex_names ? (
        <Grid container justifyContent='space-between'>
          {ex_names.map((ex) => {
            if (ex.includes(inputValue)) {
              return (
                <Grid
                  item
                  key={ex}
                  sx={{
                    bgcolor: 'lightgrey',
                    border: '2px solid black',
                    color: 'black',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    padding: '0.5rem 1.5rem',
                    ':hover': {
                      bgcolor: 'white',
                    },
                  }}
                  xs={5.8}
                  component={RouterLink}
                  to={`/exercise/${ex}`}
                >
                  {ex}
                  <ArrowForwardIosIcon />
                </Grid>
              )
            }
            return null
          })}
        </Grid>
      ) : null}
    </Box>
  )
}

export default AllExercisePage
