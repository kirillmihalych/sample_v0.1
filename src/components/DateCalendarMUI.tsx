import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
// MUI imports

dayjs.locale('ru')

const DateCalendarComponent: React.FC = () => {
  const day = dayjs().get('date')
  const month = dayjs().get('month') + 1
  const year = dayjs().get('year')
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 13])

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(`${day}-${month}-${year}`)
  )

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    console.log(newValue)
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        sx={{ border: '2px solid black', bgcolor: 'orange' }}
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={value}
        onChange={(newValue) => {
          handleChange(newValue)
        }}
        slots={{}}
      />
    </LocalizationProvider>
  )
}

export default DateCalendarComponent
