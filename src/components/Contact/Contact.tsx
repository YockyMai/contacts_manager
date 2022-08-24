import { Divider, Group, Text, Title, Button } from '@mantine/core'
import React, { FC, useState } from 'react'
import { IContactScheme } from '../../types/schemes/contact'
import ContactMenu from '../ContactMenu/ContactMenu'
import { Copy } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

const Contact: FC<IContactScheme> = ({
  description,
  name,
  phone,
  id,
  userId,
}) => {
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phone.toString()).then(() => {
      showNotification({
        title: 'Успешно!',
        message: 'Номер добавлен в буфер обмена!',
      })
    })
  }

  return (
    <div
      style={{
        padding: '5px 10px',
        boxShadow: '3px 2px 5px #dde3ed',
        borderRadius: '0.3em',
      }}
    >
      <Group align={'center'} mt={'sm'} noWrap position={'apart'}>
        <Title order={3} color={'dimmed'}>
          {name}
        </Title>
        <ContactMenu contact={{ id, userId, phone, name, description }} />
      </Group>
      <Divider my="sm" />
      <Text size={14} color={'dark'} align={'justify'}>
        {description}
      </Text>
      <Button
        style={{ width: '100%' }}
        my={'sm'}
        onClick={copyPhoneNumber}
        rightIcon={<Copy />}
        color={'teal'}
      >
        <Text>Телефон: {phone}</Text>
      </Button>
    </div>
  )
}

export default Contact
