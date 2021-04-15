import React from 'react'
import { HStack, Spacer, Text } from '@chakra-ui/react'

export interface SettingItemProps {
  name: string
  controller: JSX.Element
}

const SettingItem = ({ name, controller }: SettingItemProps): JSX.Element => {
  return (
    <HStack w="full">
      <Text>{name}</Text>
      <Spacer />
      <HStack maxW={64}>{controller}</HStack>
    </HStack>
  )
}

export default SettingItem
