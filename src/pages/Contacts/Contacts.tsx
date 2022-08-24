import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Center, Grid, Group, Loader, Text } from '@mantine/core'
import AddContactModal from '../../components/AddContactModal/AddContactModal'
import Contact from '../../components/Contact/Contact'
import Search from '../../components/Search/Search'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { getContacts } from '../../store/features/contacts/contactsSlice'

const Contacts = () => {
  const dispatch = useAppDispatch()
  const { contacts, page, search } = useAppSelector(
    (state) => state.ContactsSlice
  )
  const { id } = useAppSelector((state) => state.UserSlice.user)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!search.isTyping) {
      setIsLoading(true)
      dispatch(
        getContacts({ page, userId: id, searchValue: search.value })
      ).finally(() => {
        setIsLoading(false)
      })
    }
  }, [search.value])

  return (
    <MainLayout>
      <Group mb={50} align={'center'} noWrap>
        <AddContactModal />
        <Search />
      </Group>

      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : contacts.length > 0 ? (
        <Grid mt="xl">
          {contacts.map((contact) => (
            <Grid.Col key={contact.id} span={4}>
              <Contact {...contact} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Text>Список ваших контактов пуст!</Text>
      )}
    </MainLayout>
  )
}

export default Contacts
