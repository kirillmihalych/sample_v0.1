import { createTheme } from '@mui/material/styles'

export const colorTheme = createTheme({
  typography: {
    fontFamily: ['PT Mono', 'monospace'].join(','),
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#141414',
      dark: '#000000',
      light: '#434343',
    },
    secondary: {
      main: '#F3F3F3',
      dark: '#b3b3b3',
      light: '#f5f5f5',
    },
  },
})
