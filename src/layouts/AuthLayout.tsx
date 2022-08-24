import React, { FC, ReactNode } from 'react'
import { Button, Center, Container, Divider, Group, Text } from '@mantine/core'
import { useLocation } from 'react-router'
import { APP_ROUTES } from '../types/routes/routes'
import { Link } from 'react-router-dom'

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <Container size={'sm'} mt="10%">
      {children}
      <Divider my={'xl'} />
      <Group>
        {pathname === APP_ROUTES.signup ? (
          <>
            <Text>Уже есть аккаунт?</Text>
            <Button variant={'light'} component={Link} to={APP_ROUTES.login}>
              Войти
            </Button>
          </>
        ) : (
          <>
            <Text>Еще нет аккаунта?</Text>
            <Button variant={'light'} component={Link} to={APP_ROUTES.signup}>
              Зарегестрироватся
            </Button>
          </>
        )}
      </Group>
    </Container>
  )
}

export default AuthLayout
