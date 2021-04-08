import React, { useEffect, useState } from 'react'
import { HStack } from '@chakra-ui/react'

import SpotlightItem, { SpotlightItemProps } from './SpotlightItem'
import { Device } from '../Devices'

export interface Data extends SpotlightItemProps {
  id: number
}

export interface SpotlightProps {
  devices: Device[]
}

const Spotlight = ({ devices }: SpotlightProps): JSX.Element => {
  const [time, setTime] = useState<string>(
    new Date().toTimeString().substring(0, 8)
  )

  useEffect(() => {
    const updateTime = setInterval(() => {
      setTime(new Date().toTimeString().substring(0, 8))
    }, 1000)
    return () => clearInterval(updateTime)
  }, [])

  const [onlineDevice, setOnlineDevice] = useState<number>(
    devices.map((device) => Number(device.online)).reduce((a, b) => a + b)
  )

  const [outputPower, setOutputPower] = useState<number>(
    devices.map((device) => device.outputPower).reduce((a, b) => a + b)
  )
  const [consumePower, setConsumePower] = useState<number>(
    devices.map((device) => device.consumePower).reduce((a, b) => a + b)
  )

  useEffect(() => {
    setOnlineDevice(
      devices.map((device) => Number(device.online)).reduce((a, b) => a + b)
    )
    setOutputPower(
      devices.map((device) => device.outputPower).reduce((a, b) => a + b)
    )
    setConsumePower(
      devices.map((device) => device.consumePower).reduce((a, b) => a + b)
    )
  }, [devices])

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
