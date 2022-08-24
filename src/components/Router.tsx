import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignUp from '../pages/SignUp/SignUp'
import { APP_ROUTES } from '../types/routes/routes'
import Contacts from '../pages/Contacts/Contacts'
import { useAppSelector } from '../hooks/redux.hooks'
import Login from '../pages/Login/Login'

const MyRouter = () => {
  const { isAuth } = useAppSelector((state) => state.UserSlice)

  return (
    <Routes>
      {!isAuth && (
        <>
          <Route path={APP_ROUTES.signup} element={<SignUp />} />
          <Route path={APP_ROUTES.login} element={<Login />} />
          <Route path="*" element={<Navigate to={APP_ROUTES.login} />} />
        </>
      )}
      {isAuth && (
        <>
          <Route path={APP_ROUTES.main} element={<Contacts />} />
          <Route path="*" element={<Navigate to={APP_ROUTES.main} />} />
        </>
      )}
    </Routes>
  )
}

export default MyRouter
