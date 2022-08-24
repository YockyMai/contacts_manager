import React, { FormEvent, useEffect } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppDispatch } from '../../hooks/redux.hooks'
import { signup } from '../../store/features/user/userSlice'
import { useNavigate } from 'react-router'
import axios from 'axios'

const SignUp = () => {
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
    dispatch(signup(values)).then(() => navigate('/', { replace: true }))
  }
  return (
    <AuthLayout>
      <Title align={'center'} order={2}>
        Регистрация
      </Title>
      <form
        style={{ width: '100%', marginBottom: 30 }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack>
          <TextInput
            label={'Ваше имя'}
            placeholder={'Иванов Иван'}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            label={'Пароль'}
            placeholder={'Придумате пароль'}
            {...form.getInputProps('password')}
          />
          <Group position="right" mt="md">
            <Button type={'submit'}>Зарегестрироватся</Button>
          </Group>
        </Stack>
      </form>
    </AuthLayout>
  )
}

export default SignUp
