import React, { useEffect } from 'react'
import MyRouter from './components/Router'
import { useAppDispatch, useAppSelector } from './hooks/redux.hooks'
import { auth } from './store/features/user/userSlice'

function App() {
  const { isAuth } = useAppSelector((state) => state.UserSlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    !isAuth && dispatch(auth())
  }, [])

  return (
    <div className="App">
      <MyRouter />
    </div>
  )
}

export default App
