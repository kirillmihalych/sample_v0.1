import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import TextField from '@mui/material/TextField'
import {
  addCategory,
  closeModal,
  openModal,
} from '../features/category/CategorySlice'

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

export const BasicModal = () => {
  const dispatch = useAppDispatch()
  const { showModal } = useAppSelector((state) => state.category)

  const [tempTitle, setTempTitle] = React.useState<string>('')
  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleCreate = () => {
    dispatch(addCategory(tempTitle))
    dispatch(closeModal())
  }

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            fullWidth
            id='new-category'
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alingItems: 'center',
              gap: '5px',
              marginTop: '5px',
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button variant='outlined' fullWidth onClick={handleCreate}>
              Создать
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
