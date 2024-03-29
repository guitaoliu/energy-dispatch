import React, { useEffect, useState } from 'react'
import {
  Button,
  Circle,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { GoFile, GoInfo } from 'react-icons/go'
import { ipcRenderer } from 'electron'

import { Spotlight } from '../components/Spotlight'
import InfoCard from '../components/InfoCard'

import useDataUpdatingInterval from '../hooks/useDataUpdatingInterval'
import useFuelCell from '../hooks/useFuelCell'
import { CanStatus } from '../lib/eCan'
import { Log } from '../types'
import { CLEAR_LOG, READ_LATEST_LOGS } from '../constant'
import log from '../log'

const Dashboard: React.FC = () => {
  const toast = useToast()
  const tableHeaderBgColor = useColorModeValue('white', 'gray.600')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { err: FCErr, states: FCStates } = useFuelCell()
  const { dataUpdatingInterval } = useDataUpdatingInterval()
  const [logs, setLogs] = useState<Log[]>([])
  const [logCount, setLogCount] = useState<number>(10)

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
        const [fuelCell, ...others] = devices
        fuelCell.online = FCErr === CanStatus.OK
        fuelCell.outputPower = FCStates.outputPower.value
        return [fuelCell, ...others]
      })
    }, dataUpdatingInterval)
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

  const handleReadLog = async () => {
    const lastLogs = await ipcRenderer.invoke(READ_LATEST_LOGS, logCount)
    log.debug(`Read ${logCount} lines of logs.`)
    setLogs(lastLogs)
  }

  const handleClearLog = async (): Promise<void> => {
    const status = (await ipcRenderer.invoke(CLEAR_LOG)) as boolean
    if (status) {
      toast({
        title: 'Done!',
        description: 'Success cleared log',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error!',
        description: 'Cannot clear log',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleReadLogNumsChange = (value: number) => setLogCount(value)

  useEffect(() => {
    handleReadLog().catch((error) => log.error(error.toString()))
  }, [])

  return (
    <VStack my={3} spacing={4} h="full" justifyContent="center">
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
                <Th bgColor={tableHeaderBgColor} position="sticky" top={0}>
                  Devices
                </Th>
                <Th bgColor={tableHeaderBgColor} position="sticky" top={0}>
                  Online Status
                </Th>
                <Th
                  bgColor={tableHeaderBgColor}
                  position="sticky"
                  top={0}
                  isNumeric
                >
                  Output Power
                </Th>
                <Th
                  bgColor={tableHeaderBgColor}
                  position="sticky"
                  top={0}
                  isNumeric
                >
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
            <Text>Read lines:</Text>
            <NumberInput
              defaultValue={logCount}
              min={0}
              w={24}
              size="sm"
              onChange={(_value: string, value: number) =>
                handleReadLogNumsChange(value)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              letterSpacing="wider"
              size="sm"
              colorScheme="green"
              onClick={handleReadLog}
            >
              Read
            </Button>
            <Button
              letterSpacing="wider"
              size="sm"
              colorScheme="red"
              variant="outline"
              onClick={onOpen}
            >
              Clear
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Attention!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    This operation will cause all logs to be deleted immediately
                    and cannot be retrieved.
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    variant="outline"
                    onClick={() => {
                      onClose()
                      log.debug('Cancel clear log.')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleClearLog().catch((error) => {
                        log.error(error)
                      })
                      handleReadLog().catch((error) => {
                        log.error(error)
                      })
                      onClose()
                    }}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        }
      >
        <VStack w="100%" h={48} overflowY="auto">
          {logs.length === 0 ? (
            <VStack
              w="100%"
              h="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text>There is no log currently.</Text>
            </VStack>
          ) : (
            logs.map((l: Log, idx: number) => (
              <VStack w="full" key={l.id}>
                {idx !== 0 && <Divider size="sm" />}
                <HStack w="98%" key={l.id} fontSize="sm">
                  <Text w={16}>{l.level.toUpperCase()}</Text>
                  <Text>{l.content}</Text>
                  <Spacer />
                  <Text>{new Date(l.time).toLocaleString()}</Text>
                </HStack>
              </VStack>
            ))
          )}
        </VStack>
      </InfoCard>
    </VStack>
  )
}

export default Dashboard
