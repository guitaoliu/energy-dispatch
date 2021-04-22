import React, { useEffect, useState } from 'react'
import {
  Button,
  Circle,
  Divider,
  HStack,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { GoFile, GoInfo } from 'react-icons/go'
import faker from 'faker'

import Spotlight from '../components/Spotlight/Spotlight'
import InfoCard from '../components/InfoCard'

import useFuelCell from '../hooks/useFuelCell'
import { CanStatus } from '../lib/eCan'

const logsTemp = [
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
  const [logs, setLogs] = useState(logsTemp)
  const [isLogStart, setIsLogStart] = useState<boolean>(false)

  const [onlineDevice, setOnlineDevice] = useState<number>(0)
  const [outputPower, setOutputPower] = useState<number>(0)
  const [consumePower, setConsumePower] = useState<number>(0)

  const [devices, setDevices] = useState([
    {
      id: 0,
      name: 'Fuel Cell',
      online: FCErr === CanStatus.OK,
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
        fuelCell.online = FCErr === CanStatus.OK
        fuelCell.outputPower = FCStates.outputPower.value
        return [fuelCell, transformer]
      })
    }, 500)
    return () => clearInterval(update)
  }, [FCErr, FCStates])

  useEffect(() => {
    setOnlineDevice(() =>
      devices.map((device) => Number(device.online)).reduce((a, b) => a + b)
    )
    setOutputPower(
      devices.map((device) => device.outputPower).reduce((a, b) => a + b)
    )
    setConsumePower(
      devices.map((device) => device.consumePower).reduce((a, b) => a + b)
    )
  }, [devices])

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
    <VStack my={3} spacing={4} h="full">
      <HStack w="90%">
        <Text fontSize="2xl" fontWeight="semibold">
          Overview
        </Text>
        <Spacer />
      </HStack>
      <Spotlight
        onlineDevice={onlineDevice}
        outputPower={outputPower}
        consumePower={consumePower}
      />
      <InfoCard name="Devices Overall Information" icon={GoInfo}>
        <VStack w="full" h={28} maxHeight={32} overflowY="auto">
          <Table colorScheme="blue" size="sm">
            <Thead>
              <Tr zIndex="sticky">
                <Th position="sticky" top={0}>
                  Devices
                </Th>
                <Th position="sticky" top={0}>
                  Online Status
                </Th>
                <Th position="sticky" top={0} isNumeric>
                  Output Power
                </Th>
                <Th position="sticky" top={0} isNumeric>
                  Consume Power
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {devices.map((device) => (
                <Tr key={device.id}>
                  <Td>{device.name}</Td>
                  <Td>
                    {device.online ? (
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
      </InfoCard>
      <InfoCard
        name="Log"
        icon={GoFile}
        topRight={
          <>
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
          </>
        }
      >
        <VStack w="100%" h={48} overflowY="auto">
          {logs.map((log, idx) => (
            <VStack w="full" key={log.id}>
              {idx !== 0 && <Divider size="sm" />}
              <HStack w="98%" key={log.id} fontSize="sm">
                <Text w={16}>{log.level.toUpperCase()}</Text>
                <Text>{log.content}</Text>
                <Spacer />
                <Text>{new Date(log.time).toLocaleString()}</Text>
              </HStack>
            </VStack>
          ))}
        </VStack>
      </InfoCard>
    </VStack>
  )
}

export default Dashboard
