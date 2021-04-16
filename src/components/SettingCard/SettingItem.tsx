import React from 'react'
import { HStack, Spacer, Text } from '@chakra-ui/react'

export interface SettingItemProps {
  name: string
  children: JSX.Element | JSX.Element[]
}

const SettingItem = ({ name, children }: SettingItemProps): JSX.Element => {
  return (
    <HStack w="full">
      <Text>{name}</Text>
      <Spacer />
      <HStack maxW={64}>{children}</HStack>
    </HStack>
  )
}

export default SettingItem
