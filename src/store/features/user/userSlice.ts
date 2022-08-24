import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../core/axios'
import { IUserScheme } from '../../../types/schemes/user'
import { AxiosResponse } from 'axios'
import { showNotification } from '@mantine/notifications'
import instance from '../../../core/axios'

interface IUserSlice {
  user: IUserScheme
  isAuth: boolean
}

const initialState = {
  user: {},
  isAuth: false,
} as IUserSlice

export const signup = createAsyncThunk(
  'userSlice/signup',
  async (data: { username: string; password: string }) => {
    try {
      const res: AxiosResponse<IUserScheme> = await axios.post(
        '/api/v1/users',
        data
      )

      if (res.status !== 201) {
        throw new Error('SERVER ERROR')
      }
      localStorage.setItem('userId', res.data.id.toString())

      return res.data
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Ошибка регситрации',
        message: 'Попробуйте позже',
      })
    }
  }
)

export const auth = createAsyncThunk(
  'userSlice/auth',
  async (_, { rejectWithValue }) => {
    const userId = localStorage.getItem('userId') // Вместо auth токена использую id, так как он не досутпен в mockApi (или досутпен я не увидел!)

    const res: AxiosResponse<IUserScheme> = await axios.get(
      `/api/v1/users/${userId}`
    )

    return res.data
  }
)

export const signin = createAsyncThunk(
  'userSlice/signin',
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    const res: AxiosResponse<IUserScheme[]> = await axios.get(
      `/api/v1/users?username=${data.username}&password=${data.password}`
    )

    if (res.data.length === 0) {
      showNotification({
        color: 'red',
        title: 'Ошибка',
        message: 'Неверный логин или пароль',
      })
      return rejectWithValue('AUTH_ERROR')
    }

    localStorage.setItem('userId', res.data[0].id.toString())
    return res.data
  }
)

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = {} as IUserScheme
      state.isAuth = false

      localStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload!
      state.isAuth = true
    })
    builder.addCase(auth.fulfilled, (state, action) => {
      state.user = action.payload!
      state.isAuth = true
    })
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload[0]
      state.isAuth = true
    })
  },
})

export const { signOut } = userSlice.actions
export default userSlice.reducer
