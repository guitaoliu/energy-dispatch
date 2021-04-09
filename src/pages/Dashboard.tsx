import React, { useEffect, useState } from 'react'
import { HStack, Spacer, Text, VStack } from '@chakra-ui/react'
import faker from 'faker'

import Log, { LogRecord } from '../components/Dashboard/Log'
import Devices from '../components/Dashboard/Devices'
import Spotlight from '../components/Dashboard/Spotlight/Spotlight'

import useFuelCell from '../hooks/useFuelCell'
import { CanStatus } from '../utils/eCan'

const logsTemp: LogRecord[] = [
  {
    id: '0',
    level: 'info',
    content: 'Device Fuel Cell is online',
    time: new Date().getTime(),
  },
  {
    id: '1',
    level: 'debug',
    content: 'Device AC/DC is offline',
    time: new Date().getTime(),
  },
]

const Dashboard: React.FC = () => {
  const { err: FCErr, states: FCStates } = useFuelCell()
  const [logs, setLogs] = useState<LogRecord[]>(logsTemp)
  const [isLogStart, setIsLogStart] = useState<boolean>(false)

  const [onlineDevice, setOnlineDevice] = useState<number>(0)
  const [outputPower, setOutputPower] = useState<number>(0)
  const [consumePower, setConsumePower] = useState<number>(0)

  const [devices, setDevices] = useState([
    {
      id: 0,
      name: 'Fuel Cell',
      online: FCErr.valueOf() === CanStatus.OK.valueOf(),
      outputPower: FCStates.outputPower.value,
      consumePower: 0,
    },
    {
      id: 1,
      name: 'AC/DC Transformer',
      online: false,
      outputPower: 0,
      consumePower: 11.4,
    },
  ])

  useEffect(() => {
    const update = setInterval(() => {
      setDevices(() => {
        const [fuelCell, transformer] = devices
        fuelCell.online = FCErr.valueOf() === CanStatus.OK.valueOf()
        fuelCell.outputPower = FCStates.outputPower.value
        return [fuelCell, transformer]
      })
      setOnlineDevice(
        devices.map((device) => Number(device.online)).reduce((a, b) => a + b)
      )
      setOutputPower(
        devices.map((device) => device.outputPower).reduce((a, b) => a + b)
      )
      setConsumePower(
        devices.map((device) => device.consumePower).reduce((a, b) => a + b)
      )
    }, 500)
    return () => clearInterval(update)
  }, [])

  useEffect(() => {
    const generateLogs = setInterval(() => {
      if (isLogStart) {
        setLogs((prevState) => [
          ...prevState,
          {
            id: faker.datatype.uuid(),
            level: Math.random() < 0.8 ? 'info' : 'debug',
            content: faker.lorem.sentence(),
            time: faker.time.recent(),
          },
        ])
      }
    }, 500)
    return () => {
      clearInterval(generateLogs)
    }
  }, [isLogStart])

  return (
    <VStack my={3} spacing={4}>
      <HStack w="90%">
        <Text fontSize="2xl">Overview</Text>
        <Spacer />
      </HStack>
      <Spotlight
        onlineDevice={onlineDevice}
        outputPower={outputPower}
        consumePower={consumePower}
      />
      <Devices devices={devices} />
      <Log
        logs={logs}
        isLogStart={isLogStart}
        setIsLogStart={setIsLogStart}
        setLogs={setLogs}
      />
    </VStack>
  )
}

export default Dashboard
