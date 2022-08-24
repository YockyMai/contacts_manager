import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './features/user/userSlice'
import ContactsSlice from './features/contacts/contactsSlice'

export const store = configureStore({
  reducer: {
    UserSlice,
    ContactsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
