import React from 'react'
import {
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

export interface SettingCardProps {
  name: string
  children?: JSX.Element | JSX.Element[]
}

const SettingCard = ({ name, children }: SettingCardProps) => {
  const cardColor = useColorModeValue('white', 'whiteAlpha.300')
  return (
    <VStack w="full">
      <HStack w="full">
        <Text fontSize="xl">{name}</Text>
        <Spacer />
      </HStack>
      <VStack
        w="full"
        bg={cardColor}
        border="transparent"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="base"
        p={3}
      >
        {children}
      </VStack>
    </VStack>
  )
}

export default SettingCard
