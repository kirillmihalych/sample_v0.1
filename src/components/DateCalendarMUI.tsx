import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { useAppSelector } from '../app/hooks'
// MUI imports

const TrainingDay = (props: PickersDayProps<Dayjs>) => {
  const { day, outsideCurrentMonth, ...other } = props
  const single_day = day.get('date')
  const month = day.get('month') + 1
  const year = day.get('year')
  const date_format = `${single_day}-${month}-${year}`

  const { history_store } = useAppSelector((state) => state.history)
  const training_days = history_store.filter(
    (workout) => workout.date === date_format
  )

  return (
    <>
      {training_days.length < 1 ? (
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          selected={false}
          sx={{
            bgcolor: 'white',
            borderRadius: '0px',
            ':hover': {
              bgcolor: 'white',
              border: '2px solid lightgrey',
            },
            ':focus': {
              bgcolor: 'white',
              border: '2px solid black',
            },
          }}
          disableHighlightToday
          disableRipple
          focusRipple={false}
        ></PickersDay>
      ) : (
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          selected={false}
          sx={{
            bgcolor: 'lightgreen',
            borderRadius: '0px',
            ':hover': {
              bgcolor: 'lightgreen',
              border: '2px solid lightgrey',
            },
            ':focus': {
              bgcolor: 'lightgreen',
              border: '2px solid black',
            },
          }}
          disableHighlightToday
          disableRipple
          isFirstVisibleCell={false}
        ></PickersDay>
      )}
    </>
  )
}

dayjs.locale('ru')

const DateCalendarComponent: React.FC = () => {
  const day = dayjs().get('date')
  const month = dayjs().get('month') + 1
  const year = dayjs().get('year')

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(`${day}-${month}-${year}`)
  )

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        sx={{
          border: '2px solid black',
          bgcolor: 'orange',
        }}
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={value}
        onChange={(newValue) => {
          handleChange(newValue)
        }}
        slots={{ day: TrainingDay }}
      />
    </LocalizationProvider>
  )
}

export default DateCalendarComponent
