import React, { FC, useState } from 'react'
import { ActionIcon, Menu } from '@mantine/core'
import { DotsVertical, Pencil, Trash } from 'tabler-icons-react'
import EditContactModal from '../EditContactModal/EditContactModal'
import { IContactScheme } from '../../types/schemes/contact'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { deleteContact } from '../../store/features/contacts/contactsSlice'

const ContactMenu: FC<{ contact: IContactScheme }> = ({ contact }) => {
  const userId = useAppSelector((state) => state.UserSlice.user.id)
  const dispatch = useAppDispatch()
  const [editModal, setEditModal] = useState(false)

  const removeContact = () => {
    dispatch(deleteContact({ contactId: contact.id, userId }))
  }
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <DotsVertical />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<Pencil size={14} />}
          onClick={() => setEditModal(true)}
        >
          Редактировать
        </Menu.Item>
        <Menu.Item
          onClick={removeContact}
          color="red"
          icon={<Trash size={14} />}
        >
          Удалить контакт
        </Menu.Item>
      </Menu.Dropdown>

      <EditContactModal
        modalIsOpen={editModal}
        setModalOpen={setEditModal}
        contact={contact}
      />
    </Menu>
  )
}

export default ContactMenu
