import React from 'react'
import {
  HStack,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'

export interface InfoCardProps {
  name: string
  width?: string
  icon?: React.ElementType
  topRight?: React.ReactNode
  children: React.ReactNode
}

const InfoCard = ({ name, width, icon, topRight, children }: InfoCardProps) => {
  const cardColor = useColorModeValue('white', 'whiteAlpha.300')
  return (
    <VStack
      w={width ?? '90%'}
      p={3}
      justifyContent="center"
      alignItems="center"
      bg={cardColor}
      border="transparent"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="base"
    >
      <HStack w="full">
        <Icon as={icon} boxSize={5} />
        <Text fontSize="lg" letterSpacing="wide">
          {name}
        </Text>
        <Spacer />
        {topRight}
      </HStack>
      {children}
    </VStack>
  )
}

export default InfoCard
