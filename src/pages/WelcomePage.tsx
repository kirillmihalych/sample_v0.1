import { FC } from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import { Paper, Typography, Box, Button, Link } from '@mui/material'
// MUI icons
import GitHubIcon from '@mui/icons-material/GitHub'
import { moveToMainPage } from '../features/user/UserSlice'
import { useAppDispatch } from '../app/hooks'

const WelcomePage: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Box
        sx={{
          bgcolor: '#cdcdcd ',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '2rem',
            maxWidth: '750px',
          }}
        >
          <Box component='img' src='/td_logo.svg' sx={{ width: '200px' }}></Box>
          <Typography variant='h2' align='center' sx={{ color: '#525252  ' }}>
            Тренировочный дневник
          </Typography>
          <Typography variant='h5' sx={{ color: '#7b7b7b' }} align='center'>
            Тренировочный дневник это Web-приложение для создания тренировок и
            отслеживания прогресса.
          </Typography>
          <Paper
            elevation={0}
            sx={{
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography align='center'>
              Тренировочный дневник доступен в демо режиме. Тренировки будут
              сохранены в local storage и{' '}
              <Box
                component='span'
                sx={{ color: '#525252 ', fontWeight: 'bold' }}
              >
                не будут
              </Box>{' '}
              сохранены ни в какой базе данных или облаке.
            </Typography>
            <Button
              variant='outlined'
              sx={{
                marginTop: '15px',
                bgcolor: '#d7bb2b',
                '&:hover': {
                  bgcolor: '#fce154',
                },
              }}
              onClick={() => dispatch(moveToMainPage())}
            >
              Продолжить в демо режиме
            </Button>
          </Paper>
        </Box>
      </Box>
      {/* footer */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          rowGap: '1rem',
          bgcolor: '#da1f28',
          padding: '3rem',
        }}
      >
        <Box component='img' src='/td_logo.svg' sx={{ width: '150px' }} />
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          href='https://github.com/kirillmihalych/sample_v0.1'
          sx={{ marginTop: '1rem' }}
        >
          <GitHubIcon fontSize='medium' />
          <Typography variant='h6' sx={{ marginLeft: '8px' }}>
            Исходный код
          </Typography>
        </Button>
      </Box>
    </div>
  )
}

export default WelcomePage
