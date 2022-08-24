import React, { FC, ReactNode } from 'react'
import { IHeaderLinkProps, MyHeader } from '../components/MyHeader/MyHeader'
import { APP_ROUTES } from '../types/routes/routes'
import { useAppSelector } from '../hooks/redux.hooks'
import { Container } from '@mantine/core'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const headerLinks: IHeaderLinkProps = {
    links: [{ link: APP_ROUTES.login, label: 'Войти' }],
  }
  return (
    <div>
      <MyHeader links={headerLinks.links} />
      <main>
        <Container size="xl">{children}</Container>
      </main>
    </div>
  )
}

export default MainLayout
