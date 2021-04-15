import React from 'react'
import { HStack, Spacer, Text, VStack } from '@chakra-ui/react'

export interface SettingCardProps {
  name: string
  children?: JSX.Element | JSX.Element[]
}

const SettingCard = ({ name, children }: SettingCardProps) => {
  return (
    <VStack w="full">
      <HStack w="full">
        <Text fontSize="xl">{name}</Text>
        <Spacer />
      </HStack>
      <VStack w="full" boxShadow="base" p={3}>
        {children}
      </VStack>
    </VStack>
  )
}

export default SettingCard
