import * as React from 'react'
import { useTimer } from 'use-timer'
// redux imports
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setRestTimer } from '../features/routine/RoutineSlice'
// MUI imports
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
// MUI icons
import TimelapseIcon from '@mui/icons-material/Timelapse'
import { Typography } from '@mui/material'

interface IRestTimerProps {
  ex_id: string
  routine_id: string
}

const SelectRestTimer: React.FC<IRestTimerProps> = ({ ex_id, routine_id }) => {
  const dispatch = useAppDispatch()
  const [time, setTime] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string)
    dispatch(
      setRestTimer({
        routine_id,
        ex_id: ex_id,
        num: event.target.value,
      })
    )
  }

  return (
    <Box
      sx={{
        minWidth: 120,
        display: 'flex',
        justifyContent: 'centeer',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      <TimelapseIcon />
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Отдых</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={time ? time : 'Без таймера'}
          label='Отдых'
          onChange={handleChange}
        >
          <MenuItem value='Без таймера'>Без таймера</MenuItem>
          <MenuItem value={10}>10с</MenuItem>
          <MenuItem value={15}>15с</MenuItem>
          <MenuItem value={20}>20с</MenuItem>
          <MenuItem value={25}>25с</MenuItem>
          <MenuItem value={30}>30с</MenuItem>
          <MenuItem value={35}>35с</MenuItem>
          <MenuItem value={40}>40с</MenuItem>
          <MenuItem value={45}>45с</MenuItem>
          <MenuItem value={50}>50с</MenuItem>
          <MenuItem value={55}>55с</MenuItem>
          <MenuItem value={60}>1 мин</MenuItem>
          <MenuItem value={65}>1 мин 5с</MenuItem>
          <MenuItem value={70}>1 мин 10с</MenuItem>
          <MenuItem value={75}>1 мин 15с</MenuItem>
          <MenuItem value={80}>1 мин 20с</MenuItem>
          <MenuItem value={85}>1 мин 25с</MenuItem>
          <MenuItem value={90}>1 мин 30с</MenuItem>
          <MenuItem value={95}>1 мин 35с</MenuItem>
          <MenuItem value={100}>1 мин 40с</MenuItem>
          <MenuItem value={105}>1 мин 45с</MenuItem>
          <MenuItem value={110}>1 мин 50с</MenuItem>
          <MenuItem value={115}>1 мин 55с</MenuItem>
          <MenuItem value={120}>2 мин</MenuItem>
          <MenuItem value={125}>2 мин 5с</MenuItem>
          <MenuItem value={130}>2 мин 10с</MenuItem>
          <MenuItem value={135}>2 мин 15с</MenuItem>
          <MenuItem value={140}>2 мин 20с</MenuItem>
          <MenuItem value={145}>2 мин 25с</MenuItem>
          <MenuItem value={150}>2 мин 30с</MenuItem>
          <MenuItem value={155}>2 мин 35с</MenuItem>
          <MenuItem value={160}>2 мин 40с</MenuItem>
          <MenuItem value={165}>2 мин 45с</MenuItem>
          <MenuItem value={170}>2 мин 50с</MenuItem>
          <MenuItem value={175}>2 мин 55с</MenuItem>
          <MenuItem value={180}>3 мин</MenuItem>
          <MenuItem value={185}>3 мин 5с</MenuItem>
          <MenuItem value={190}>3 мин 10с</MenuItem>
          <MenuItem value={195}>3 мин 15с</MenuItem>
          <MenuItem value={200}>3 мин 20с</MenuItem>
          <MenuItem value={205}>3 мин 25с</MenuItem>
          <MenuItem value={210}>3 мин 30с</MenuItem>
          <MenuItem value={215}>3 мин 35с</MenuItem>
          <MenuItem value={220}>3 мин 40с</MenuItem>
          <MenuItem value={225}>3 мин 45с</MenuItem>
          <MenuItem value={230}>3 мин 50с</MenuItem>
          <MenuItem value={235}>3 мин 55с</MenuItem>
          <MenuItem value={240}>4 мин</MenuItem>
          <MenuItem value={245}>4 мин 5с</MenuItem>
          <MenuItem value={250}>4 мин 10с</MenuItem>
          <MenuItem value={255}>4 мин 15с</MenuItem>
          <MenuItem value={260}>4 мин 20с</MenuItem>
          <MenuItem value={265}>4 мин 25с</MenuItem>
          <MenuItem value={270}>4 мин 30с</MenuItem>
          <MenuItem value={275}>4 мин 35с</MenuItem>
          <MenuItem value={280}>4 мин 40с</MenuItem>
          <MenuItem value={285}>4 мин 45с</MenuItem>
          <MenuItem value={290}>4 мин 50с</MenuItem>
          <MenuItem value={295}>4 мин 55с</MenuItem>
          <MenuItem value={300}>5 мин </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectRestTimer
