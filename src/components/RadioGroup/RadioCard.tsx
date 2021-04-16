import React from 'react'
import {
  Box,
  useColorModeValue,
  useRadio,
  UseRadioProps,
} from '@chakra-ui/react'

export interface RadioCardProps {
  useRadioProps: UseRadioProps
  isFirst: boolean
  isLast: boolean
  children: JSX.Element | string
}

const RadioCard = ({
  useRadioProps,
  isLast,
  isFirst,
  children,
}: RadioCardProps): JSX.Element => {
  const checkedBgColor = useColorModeValue(
    {
      bg: 'blue.500',
      borderColor: 'blue.500',
    },
    {
      bg: 'blue.200',
      borderColor: 'blue.200',
    }
  )
  const boxBgColor = useColorModeValue('gray.300', 'whiteAlpha.400')

  const { getInputProps, getCheckboxProps } = useRadio(useRadioProps)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...input} />
      <Box
        {...checkbox} // eslint-disable-line react/jsx-props-no-spreading
        cursor="pointer"
        bg={boxBgColor}
        color="white"
        _checked={checkedBgColor}
        px={2}
        py={1}
        borderLeftWidth={isFirst ? '1px' : '0'}
        borderLeftRadius={isFirst ? 'md' : '0'}
        borderRightWidth={isLast ? '1px' : '0'}
        borderRightRadius={isLast ? 'md' : '0'}
      >
        {children}
      </Box>
    </Box>
  )
}

export default RadioCard
