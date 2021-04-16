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
  icon?: React.ElementType
  topRight?: JSX.Element | JSX.Element[]
  children: JSX.Element | JSX.Element[]
}

const InfoCard = ({ name, icon, topRight, children }: InfoCardProps) => {
  const cardColor = useColorModeValue('white', 'whiteAlpha.300')
  return (
    <VStack
      w="90%"
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
