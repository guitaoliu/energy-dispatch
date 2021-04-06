import React, { useEffect, useState } from 'react'
import { HStack } from '@chakra-ui/react'

import SpotlightItem, { SpotlightItemProps } from './SpotlightItem'

interface Data extends SpotlightItemProps {
  id: number
}

const datas: Data[] = [
  {
    id: 0,
    value: 1,
    title: 'Online',
  },
  {
    id: 1,
    value: 15.14,
    unit: 'W',
    title: 'Output',
  },
  {
    id: 2,
    value: 20.36,
    unit: 'W',
    title: 'Consumption',
  },
]

const Spotlight = () => {
  const [time, setTime] = useState<string>(
    new Date().toTimeString().substring(0, 8)
  )
  useEffect(() => {
    const updateTime = setInterval(() => {
      setTime(new Date().toTimeString().substring(0, 8))
    }, 1000)
    return () => clearInterval(updateTime)
  }, [])
  return (
    <HStack w="90%" justifyContent="space-between">
      {datas.map((data) => (
        <SpotlightItem
          key={data.id}
          value={data.value}
          title={data.title}
          unit={data?.unit}
        />
      ))}
      <SpotlightItem value={time} title="Time" />
    </HStack>
  )
}

export default Spotlight
