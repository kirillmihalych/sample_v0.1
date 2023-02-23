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
      dark: '#E1E1E1',
      light: '#f5f5f5',
    },
  },
})
