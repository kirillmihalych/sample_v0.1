import * as React from 'react'
// Redux imports
import { useAppSelector } from '../app/hooks'
// MUI imports
import { Box, Typography, Grid, Button, Paper } from '@mui/material'
// MUI icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
// Router
import { Link as RouterLink } from 'react-router-dom'

const AllExercisePage: React.FC = () => {
  const { ex_names } = useAppSelector((state) => state.history)

  return (
    <Box sx={{ margin: '7rem' }}>
      {ex_names ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          // columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {ex_names.map((ex) => (
            <Grid item key={ex} sx={{ bgcolor: 'green', marginLeft: '10px' }}>
              <Button component={RouterLink} to={`/exercise/${ex}`}>
                {ex}
              </Button>
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Box>
  )
}

export default AllExercisePage
