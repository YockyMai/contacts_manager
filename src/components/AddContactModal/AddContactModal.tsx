import React, { useState } from 'react'
import { Modal, Button, TextInput, Stack, Textarea } from '@mantine/core'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { createContact } from '../../store/features/contacts/contactsSlice'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import validatePhone from '../../helpers/validatePhone'

const AddContactModal = () => {
  const [modalIsOpen, setModalOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { id } = useAppSelector((state) => state.UserSlice.user)

  const form = useForm({
    initialValues: {
      phone: '',
      description: '',
      name: '',
    },
    validate: {
      phone: (value) => validatePhone(value),
      description: (value) => (value.length > 0 ? null : 'Заполните это поле'),
      name: (value) => (value.length > 0 ? null : 'Заполните это поле'),
    },
  })

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const addContact = (values: {
    phone: string
    name: string
    description: string
  }) => {
    dispatch(
      createContact({
        phone: values.phone,
        userId: id,
        name: values.name,
        description: values.description,
      })
    ).then(() => {
      showNotification({ title: 'Успешно', message: 'Контакт добавлен!' })
      closeModal()
    })
  }

  return (
    <>
      <Button onClick={openModal}>Добавить контакт</Button>
      <Modal
        title={'Добавьте контакт!'}
        opened={modalIsOpen}
        onClose={closeModal}
      >
        <form onSubmit={form.onSubmit(addContact)}>
          <Stack>
            <TextInput
              label={'Название контакта'}
              {...form.getInputProps('name')}
            />
            <Textarea
              label={'Описание'}
              {...form.getInputProps('description')}
            />
            <TextInput
              label={'Номер телефона'}
              {...form.getInputProps('phone')}
            />
            <Button type={'submit'} color={'green'}>
              Добавить контакт
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  )
}

export default AddContactModal
