import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
// router
import { Link as RouterLink } from 'react-router-dom'
// redux
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setUser, closeSignInMode } from '../features/user/UserSlice'

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='#'>
        Тренировочный дневник
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function SignIn() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)
  const [errorEmail, setErrorEmail] = React.useState<boolean>(false)
  const [errorPassword, setErrorPassword] = React.useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email') as string
    const password = data.get('password') as string

    setErrorPassword(false)
    setErrorEmail(false)

    if (user.password !== password) {
      setErrorPassword(true)
    }
    if (user.email !== email) {
      setErrorEmail(true)
    }

    if (user.password === password && user.email === email) {
      dispatch(closeSignInMode())
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Вход
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            error={errorEmail}
            helperText={errorEmail ? 'Неверный email' : null}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
            error={errorPassword}
            helperText={errorPassword ? 'Неверный пароль' : null}
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Запомни меня!'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Забыли пороль?
              </Link>
            </Grid>
            <Grid item>
              <Link variant='body2' component={RouterLink} to='sign-up'>
                {'Зарегистрироваться'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
