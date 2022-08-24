import React, { ChangeEvent, useEffect, useState } from 'react'
import { TextInput } from '@mantine/core'
import { Search as IconSearch } from 'tabler-icons-react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import {
  setSearchValue,
  setTyping,
} from '../../store/features/contacts/contactsSlice'

const Search = () => {
  const dispatch = useAppDispatch()
  const { value, isTyping } = useAppSelector(
    (state) => state.ContactsSlice.search
  )

  const [searchTimeout, setSearchTimeout] = useState<any>(false)

  useEffect(() => {
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
      dispatch(setTyping(true))
    }

    setSearchTimeout(
      setTimeout(() => {
        dispatch(setTyping(false))
      }, 500)
    )
  }, [value])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.currentTarget.value))
  }

  return (
    <TextInput
      placeholder={'Поиск по номеру, имени и описанию'}
      icon={<IconSearch />}
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  )
}

export default Search
