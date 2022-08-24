import React, { Dispatch, FC, SetStateAction } from 'react'
import { Modal, Button, TextInput, Stack, Textarea } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { editContact } from '../../store/features/contacts/contactsSlice'
import { showNotification } from '@mantine/notifications'
import { IContactScheme } from '../../types/schemes/contact'
import { useForm } from '@mantine/form'
import validatePhone from '../../helpers/validatePhone'

interface IEditContactModalProps {
  contact: IContactScheme
  modalIsOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

const EditContactModal: FC<IEditContactModalProps> = ({
  contact,
  setModalOpen,
  modalIsOpen,
}) => {
  const dispatch = useAppDispatch()
  const { id } = useAppSelector((state) => state.UserSlice.user)

  const form = useForm({
    initialValues: {
      phone: contact.phone,
      description: contact.description,
      name: contact.name,
    },
    validate: {
      phone: (value) => {
        return validatePhone(value)
      },
      description: (value) => (value.length > 0 ? null : 'Заполните это поле'),
      name: (value) => (value.length > 0 ? null : 'Заполните это поле'),
    },
  })

  const closeModal = () => {
    setModalOpen(false)
  }

  const saveContact = (values: {
    phone: string
    name: string
    description: string
  }) => {
    dispatch(
      editContact({
        phone: values.phone,
        userId: id,
        name: values.name,
        description: values.description,
        id: contact.id,
      })
    ).then(() => {
      showNotification({ title: 'Успешно', message: 'Контакт обновлен!' })
      closeModal()
    })
  }

  return (
    <Modal
      title={'Редактировать контакт!'}
      opened={modalIsOpen}
      onClose={closeModal}
    >
      <form onSubmit={form.onSubmit(saveContact)}>
        <Stack>
          <TextInput
            label={'Название контакта'}
            {...form.getInputProps('name')}
          />
          <Textarea label={'Описание'} {...form.getInputProps('description')} />
          <TextInput
            label={'Номер телефона'}
            {...form.getInputProps('phone')}
          />
          <Button type={'submit'}>Редактировать контакт</Button>{' '}
        </Stack>
      </form>
    </Modal>
  )
}

export default EditContactModal
