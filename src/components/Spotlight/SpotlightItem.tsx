import React from 'react'
import { VStack, HStack, Text, useColorModeValue } from '@chakra-ui/react'

export interface SpotlightItemProps {
  value: number | string
  unit?: string
  title: string
}

const SpotlightItem = ({
  value,
  title,
  unit,
}: SpotlightItemProps): JSX.Element => {
  const cardColor = useColorModeValue('white', 'whiteAlpha.300')
  return (
    <VStack
      w={56}
      h={32}
      bg={cardColor}
      border="transparent"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="base"
      justifyContent="center"
      alignItems="center"
    >
      <HStack>
        <Text fontSize={48} fontWeight="semibold" display="inline">
          {value}
        </Text>
        {unit && (
          <Text
            fontSize={32}
            letterSpacing="wide"
            display="inline"
            alignSelf="flex-start"
            pt={2}
          >
            {unit}
          </Text>
        )}
      </HStack>
      <Text fontSize="lg">{title.toUpperCase()}</Text>
    </VStack>
  )
}

export default SpotlightItem
