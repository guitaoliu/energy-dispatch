import React, { useEffect, useState } from 'react'
import {
  VStack,
  HStack,
  Flex,
  Spacer,
  Circle,
  Divider,
  Text,
  Button,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import faker from 'faker'

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

type Log = {
  id: string
  content: string
  level: string
  time: number
}

const logsTemp: Log[] = [
  {
    id: faker.datatype.uuid(),
    level: 'info',
    content: 'Device Fuel Cell is online',
    time: new Date().getTime(),
  },
  {
    id: faker.datatype.uuid(),
    level: 'debug',
    content: 'Device AC/DC is offline',
    time: new Date().getTime(),
  },
]

const Dashboard: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(true)
  const [isLogStart, setIsLogStart] = useState<boolean>(false)

  const [logs, setLogs] = useState<Log[]>(logsTemp)

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
        <Text fontSize="xl">Updating</Text>
        <Switch
          colorScheme="teal"
          size="lg"
          isChecked={isUpdating}
          onChange={() => {
            setIsUpdating(!isUpdating)
          }}
        />
      </HStack>
      <HStack w="90%" justifyContent="space-between">
        <Flex
          w={56}
          h={32}
          bg="white"
          boxShadow="base"
          justifyContent="center"
          alignItems="center"
        >
          One
        </Flex>
        <Flex
          w={56}
          h={32}
          bg="white"
          boxShadow="base"
          justifyContent="center"
          alignItems="center"
        >
          One
        </Flex>
        <Flex
          w={56}
          h={32}
          bg="white"
          boxShadow="base"
          justifyContent="center"
          alignItems="center"
        >
          One
        </Flex>
      </HStack>
      <VStack
        w="90%"
        bg="white"
        p={3}
        justifyContent="center"
        alignItems="center"
        boxShadow="base"
      >
        <Text alignSelf="flex-start" fontSize="lg" letterSpacing="wide">
          Devices Overall Information
        </Text>
        <Table colorScheme="twitter" size="sm">
          <Thead>
            <Tr>
              <Th>Devices</Th>
              <Th>Online Status</Th>
              <Th isNumeric>Output Power</Th>
              <Th isNumeric>Consume Power</Th>
            </Tr>
          </Thead>
          <Tbody>
            {devices.map((device) => (
              <Tr key={device.id}>
                <Td>{device.name}</Td>
                <Td>
                  {device.status ? (
                    <HStack>
                      <Circle size={3} bg="green.400" />
                      <Text>Online</Text>
                    </HStack>
                  ) : (
                    <HStack>
                      <Circle size={3} bg="red.400" />
                      <Text>Offline</Text>
                    </HStack>
                  )}
                </Td>
                <Td isNumeric>{device.outputPower} w</Td>
                <Td isNumeric>{device.consumePower} w</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      <VStack
        w="90%"
        bg="white"
        p={3}
        justifyContent="center"
        alignItems="center"
        boxShadow="base"
      >
        <HStack w="full">
          <Text fontSize="lg" letterSpacing="wide">
            Log
          </Text>
          <Spacer />
          <Button
            letterSpacing="wider"
            size="sm"
            colorScheme="green"
            onClick={() => {
              setLogs([])
            }}
          >
            Clear
          </Button>
          {isLogStart ? (
            <Button
              size="sm"
              letterSpacing="wider"
              colorScheme="red"
              onClick={() => {
                setIsLogStart(false)
              }}
            >
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              letterSpacing="wider"
              colorScheme="blue"
              onClick={() => {
                setIsLogStart(true)
              }}
            >
              Start
            </Button>
          )}
        </HStack>
        <Divider />
        <VStack w="100%" h={48} overflowY="scroll">
          {logs.map((log, idx) => (
            <>
              {idx !== 0 && <Divider size="sm" />}
              <HStack w="98%" key={log.id} fontSize="sm">
                <Text w={16}>{log.level.toUpperCase()}</Text>
                <Text>{log.content}</Text>
                <Spacer w="95%" />
                <Text>{new Date(log.time).toLocaleString()}</Text>
              </HStack>
            </>
          ))}
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Dashboard
