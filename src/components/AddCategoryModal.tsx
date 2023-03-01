import { FC } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { closeAddCategory } from '../features/category/CategorySlice'
import { addCategoryToRoutine } from '../features/routine/RoutineSlice'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { styled } from '@mui/material'
import { ICategory } from '../interfaces/index'

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

const MyIconButton = styled(IconButton)({
  position: 'absolute',
  left: '89%',
  top: '0%',
  backgroundColor: 'white',
  borderRadius: '5px',
  color: 'black',
})

export const AddCategoryModal: FC = () => {
  const dispatch = useAppDispatch()
  const {
    categories,
    isAddCategoryOpen,
    addRoutineId: id,
  } = useAppSelector((state) => state.category)
  const { all_routines } = useAppSelector((state) => state.routine)

  const checkboxHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    dispatch(
      addCategoryToRoutine({ id, categoryId, checkbox: e.target.checked })
    )
  }

  const routine = all_routines.find((routine) => routine.id === id)
  const handleClose = () => dispatch(closeAddCategory())

  return (
    <div>
      <Modal
        open={isAddCategoryOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <MyIconButton onClick={() => dispatch(closeAddCategory())}>
            <CancelPresentationIcon />
          </MyIconButton>
          <FormGroup>
            {categories.map((category: ICategory) => {
              const { id, title } = category
              return (
                <FormControlLabel
                  // изменить поиск айтема по ID,
                  // после добавления полной категории в рутину
                  checked={
                    routine?.category?.find((item) => item.id === id)
                      ? true
                      : false
                  }
                  control={
                    <Checkbox onChange={(e) => checkboxHandler(e, id)} />
                  }
                  label={title}
                  key={title}
                />
              )
            })}
          </FormGroup>
        </Box>
      </Modal>
    </div>
  )
}
