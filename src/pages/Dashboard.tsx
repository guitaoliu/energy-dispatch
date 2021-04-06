import React, { useEffect, useState } from 'react'
import { VStack, HStack, Spacer, Text } from '@chakra-ui/react'
import faker from 'faker'

import Log, { LogRecord } from '../components/Dashboard/Log'
import Devices from '../components/Dashboard/Devices'
import Spotlight from '../components/Dashboard/Spotlight/Spotlight'

const devices = [
  {
    id: 0,
    name: 'Fuel Cell',
    status: true,
    outputPower: 0,
    consumePower: 0,
  },
  {
    id: 1,
    name: 'AC/DC Transformer',
    status: false,
    outputPower: 0,
    consumePower: 0,
  },
]

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
  const [isLogStart, setIsLogStart] = useState<boolean>(false)

  const [logs, setLogs] = useState<LogRecord[]>(logsTemp)

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
      <Spotlight />
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
