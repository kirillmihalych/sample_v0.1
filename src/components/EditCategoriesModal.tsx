import { FC } from 'react'
// redux
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  editCategory,
  removeCategory,
  closeIsEditing,
  openIsEditing,
  closeEditLabelList,
} from '../features/category/CategorySlice'
// mui
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
// icons
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'

const MyIconButton = styled(IconButton)({
  position: 'absolute',
  left: '89%',
  top: '0%',
  backgroundColor: 'white',
  borderRadius: '5px',
  color: 'black',
})

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

export const EditCategoriesModal: FC = () => {
  const dispatch = useAppDispatch()
  const { categories, isEditing, isEditLablesShowed } = useAppSelector(
    (state) => state.category
  )
  const categoryTitles = categories.map((category) => category.title)
  const handleClose = () => dispatch(closeEditLabelList())

  return (
    <div>
      <Modal
        open={isEditLablesShowed}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            sx={{ mt: 2, mb: 3 }}
            variant='h6'
            component='div'
            align='center'
          >
            Изменить категории
          </Typography>
          <List>
            {categoryTitles.map((title) => {
              return (
                <ListItem
                  key={title}
                  secondaryAction={
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => dispatch(removeCategory(title))}
                      >
                        <DeleteIcon />
                      </IconButton>
                      {isEditing ? (
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={() => dispatch(closeIsEditing())}
                        >
                          <DoneOutlineIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          onClick={() => dispatch(openIsEditing())}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      )}
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <LabelOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!isEditing ? (
                    <ListItemText primary={title} />
                  ) : (
                    <TextField
                      autoFocus
                      value={title}
                      onChange={(e) =>
                        dispatch(editCategory({ title, name: e.target.value }))
                      }
                    />
                  )}
                </ListItem>
              )
            })}
          </List>{' '}
          <MyIconButton onClick={() => dispatch(closeEditLabelList())}>
            <CancelPresentationIcon />
          </MyIconButton>
        </Box>
      </Modal>
    </div>
  )
}
