import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
// redux imports
import { useAppSelector } from '../app/hooks'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface IProps {
  ex_id: string
  routine_id: string
}

const RestTimer: React.FC<IProps> = ({ ex_id, routine_id }) => {
  const { all_routines } = useAppSelector((state) => state.routine)
  const routine = all_routines.find((routine) => routine.id === routine_id)
  const ex = routine?.exs.find((ex) => ex.id === ex_id)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {ex?.restTimer}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default RestTimer
