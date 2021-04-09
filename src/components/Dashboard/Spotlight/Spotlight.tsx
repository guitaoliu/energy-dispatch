import React, { useEffect, useState } from 'react'
import { HStack } from '@chakra-ui/react'

import SpotlightItem, { SpotlightItemProps } from './SpotlightItem'

export interface Data extends SpotlightItemProps {
  id: number
}

export interface SpotlightProps {
  onlineDevice: number
  outputPower: number
  consumePower: number
}

const Spotlight = ({
  onlineDevice,
  outputPower,
  consumePower,
}: SpotlightProps): JSX.Element => {
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
      <SpotlightItem value={onlineDevice} title="Online" />
      <SpotlightItem value={outputPower} title="Output" unit="w" />
      <SpotlightItem value={consumePower} title="Consume" unit="w" />
      <SpotlightItem value={time} title="Time" />
    </HStack>
  )
}

export default Spotlight
