import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IContactScheme } from '../../../types/schemes/contact'
import axios from '../../../core/axios'
import { AxiosResponse } from 'axios'
import { showNotification } from '@mantine/notifications'

interface IContactsSlice {
  contacts: IContactScheme[]
  page: number
  search: {
    value: string
    isTyping: boolean
  }
}

const initialState = {
  contacts: [],
  page: 1,
  search: {
    value: '',
    isTyping: false,
  },
} as IContactsSlice

export const getContacts = createAsyncThunk(
  'contactsSlice/getContacts',
  async (data: { userId: number; page: number; searchValue: string }) => {
    const limit = 10

    const res: AxiosResponse<IContactScheme[]> = await axios.get(
      `/api/v1/users/${data.userId}/contacts`,
      {
        params: {
          search: data.searchValue,
          limit,
          page: data.page,
        },
      }
    )

    if (res.status !== 200) {
      showNotification({
        color: 'red',
        title: 'Ошибка',
        message: 'При загрузке контактов произошла ошибка!',
      })
      throw new Error('SERVER ERROR')
    }

    return res.data
  }
)

export const createContact = createAsyncThunk(
  'contactsSlice/createContact',
  async (data: {
    phone: string
    userId: number
    name: string
    description: string
  }) => {
    const res: AxiosResponse<IContactScheme> = await axios.post(
      `/api/v1/users/${data.userId}/contacts`,
      data
    )

    if (res.status !== 201) {
      showNotification({
        color: 'red',
        title: 'Ошибка',
        message: 'При добавлении контакта произошла ошибка!',
      })
      throw new Error('SERVER ERROR')
    }

    return res.data
  }
)

export const deleteContact = createAsyncThunk(
  'contactsSlice/deleteContact',
  async (data: { contactId: number; userId: number }) => {
    const res: AxiosResponse<IContactScheme> = await axios.delete(
      `/api/v1/users/${data.userId}/contacts/${data.contactId}`
    )

    if (res.status !== 200) {
      showNotification({
        color: 'red',
        title: 'Ошибка',
        message: 'При удалении контакта произошла ошибка!',
      })
      throw new Error('SERVER ERROR')
    }

    return res.data
  }
)

export const editContact = createAsyncThunk(
  'contactsSlice/editContact',
  async (data: IContactScheme) => {
    const res: AxiosResponse<IContactScheme> = await axios.put(
      `/api/v1/users/${data.userId}/contacts/${data.id}`,
      data
    )

    if (res.status !== 200) {
      showNotification({
        color: 'red',
        title: 'Ошибка',
        message: 'При обновлении контакта произошла ошибка!',
      })
      throw new Error('SERVER ERROR')
    }

    return res.data
  }
)

const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.search.value = action.payload
    },
    setTyping: (state, action) => {
      state.search.isTyping = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
    })
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.contacts.push(action.payload)
    })
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (el) => el.id !== action.payload.id
      )
    })
    builder.addCase(editContact.fulfilled, (state, action) => {
      state.contacts.forEach((el, index) => {
        if (el.id === action.payload.id) state.contacts[index] = action.payload
      })
    })
  },
})

export const { setSearchValue, setTyping } = contactsSlice.actions
export default contactsSlice.reducer
