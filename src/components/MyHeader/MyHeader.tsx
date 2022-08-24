import {
  Header,
  Container,
  Group,
  ActionIcon,
  Text,
  Button,
} from '@mantine/core'
import { headerStyles } from './styles'
import { Link } from 'react-router-dom'
import { Phone } from 'tabler-icons-react'
import { APP_ROUTES } from '../../types/routes/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks'
import { signOut } from '../../store/features/user/userSlice'

export interface IHeaderLinkProps {
  links: { link: string; label: string }[]
}

export function MyHeader({ links }: IHeaderLinkProps) {
  const dispatch = useAppDispatch()
  const { username } = useAppSelector((state) => state.UserSlice.user)

  const { classes } = headerStyles()

  return (
    <Header height={60} mb={80}>
      <Container className={classes.header}>
        <Button component={Link} to={APP_ROUTES.main} variant="subtle">
          <Group noWrap>
            <Phone size={30} />
            <Text>Контакты</Text>
          </Group>
        </Button>
        <Group noWrap>
          <Text color={'dimmed'} size={14}>
            {username}
          </Text>
          <Button onClick={() => dispatch(signOut())}>Выход</Button>
        </Group>
      </Container>
    </Header>
  )
}
