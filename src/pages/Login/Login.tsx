import React, { FormEvent } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../hooks/redux.hooks'
import { useForm } from '@mantine/form'
import { signin } from '../../store/features/user/userSlice'
import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text,
} from '@mantine/core'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value: string) =>
        value.length > 0 ? null : 'Заполните это поле',
      password: (value: string) =>
        value.length > 0 ? null : 'Заполните это поле',
    },
  })

  const handleSubmit = (
    values: { username: string; password: string },
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    dispatch(signin(values)).then(() => navigate('/', { replace: true }))
  }
  return (
    <AuthLayout>
      <Title align={'center'} order={2}>
        Вход
      </Title>
      <form
        style={{ width: '100%', marginBottom: 30 }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack>
          <Text>Пароль и имя для входа: TestUser</Text>
          <TextInput
            label={'Имя'}
            placeholder={'Иванов Иван'}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label={'Пароль'}
            placeholder={'Придумате пароль'}
            {...form.getInputProps('password')}
          />
          <Group position="right" mt="md">
            <Button type={'submit'}>Войти</Button>
          </Group>
        </Stack>
      </form>
    </AuthLayout>
  )
}

export default Login
