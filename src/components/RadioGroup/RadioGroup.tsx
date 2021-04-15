import React from 'react'
import { HStack, useRadioGroup } from '@chakra-ui/react'

import RadioCard from './RadioCard'

export interface RadioGroupProps {
  name?: string
  options: string[]
  defaultValue: string
  onChange?: React.Dispatch<React.SetStateAction<string>>
}

const RadioGroup = ({
  name,
  options,
  defaultValue,
  onChange,
}: RadioGroupProps): JSX.Element => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange,
  })

  const group = getRootProps()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HStack {...group} spacing="0">
      {options.map((value, idx) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const radio = getRadioProps({ value })
        return (
          <RadioCard
            useRadioProps={radio}
            key={value}
            isFirst={idx === 0}
            isLast={idx === options.length - 1}
          >
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

export default RadioGroup
