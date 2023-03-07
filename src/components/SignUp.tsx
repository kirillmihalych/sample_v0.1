import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
// router
import { Link as RouterLink, useNavigate } from 'react-router-dom'
// redux
import { useAppDispatch } from '../app/hooks'
import { setUser } from '../features/user/UserSlice'

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

export default function SignUp() {
  const dispatch = useAppDispatch()

  const [errorName, setErrorName] = React.useState<boolean>(false)
  const [errorEmail, setErrorEmail] = React.useState<boolean>(false)
  const [errorPassword, setErrorPassword] = React.useState<boolean>(false)

  const navigate = useNavigate()
  // создать хэндлнавигейт, чтобы вслывало окно успеха на странице входа

  // mail regex
  const regexEmailValidation: RegExp = /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,}$/i
  // password regex
  const regexPasswordValidation: RegExp =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  // login regex
  const regexLoginValidation: RegExp =
    /^(?=.*[A-Za-z])[a-zA-Z0-9!@#$%^&*]{3,16}$/

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    // data
    const name = data.get('firstName') as string
    const email = data.get('email') as string
    const password = data.get('password') as string

    setErrorName(false)
    setErrorEmail(false)
    setErrorPassword(false)

    // name validation
    if (!name || !regexLoginValidation.test(name)) {
      setErrorName(true)
    }
    if (!email || !regexEmailValidation.test(email)) {
      setErrorEmail(true)
    }
    if (!password || !regexPasswordValidation.test(password)) {
      setErrorPassword(true)
    }

    if (name && email && password) {
      navigate('/sign-in')
    }

    dispatch(setUser({ name, email, password }))
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
          Регистрация
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='Имя'
                autoFocus
                error={errorName}
                helperText={'Логин должен состоять из 3-16 латинских букв'}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
                error={errorEmail}
                helperText={
                  errorEmail ? 'Пустой email или неверный формат' : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Пароль'
                type='password'
                id='password'
                autoComplete='new-password'
                error={errorPassword}
                helperText={
                  'Необходимо придумать безопасный пароль. Он должен содержать 6-16 символов, прописные латинские буквы, строчные латинские буквы, цифры, специальные символы.'
                }
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to='/sign-in' variant='body2' component={RouterLink}>
                Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
