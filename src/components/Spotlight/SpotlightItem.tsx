import React from 'react'
import { VStack, HStack, Text } from '@chakra-ui/react'

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
  return (
    <VStack
      w={56}
      h={32}
      bg="white"
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
