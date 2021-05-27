import React, { useEffect, useState } from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  VStack,
  Text,
  Input,
  InputLeftAddon,
  InputGroup,
  useToast,
  Spacer,
} from '@chakra-ui/react'
import { BiData, BiWrench } from 'react-icons/bi'

import InfoCard from '../components/InfoCard'

import useUsbCan from '../hooks/useUsbCan'
import { DeviceType } from '../lib/eCan'
import parseBaudRate from '../utils/parseBaudRate'
import usbCanDemo, { UsbCanDataType } from '../hooks/useUsbCanData'

const GeneralUsbCan = () => {
  const toast = useToast()

  const {
    deviceType,
    deviceIndex,
    canIndex,
    baudRate,
    fetchingInterval,
  } = useUsbCan()

  const usbCanData = usbCanDemo
  const [testLine, setTestLine] = useState<number>(0)

  const [frameId, setFrameId] = useState<number>(0)
  const [frameData, setFrameData] = useState<number>(0)

  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  useEffect(() => {
    const update = setInterval(() => {
      if (isUpdating) {
        setTestLine((prevState) => prevState + 1)
      }
    }, 500)
    return () => {
      clearInterval(update)
    }
  }, [isUpdating])

  const handleSendData = () => {
    if (Math.random() < 0.2) {
      toast({
        title: 'Error!',
        description: 'Can not send that control frame',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Success',
        description: 'Success send that control frame',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
    setFrameData(0)
    setFrameId(0)
  }

  return (
    <HStack h="full" justifyContent="center" aligenItems="center" spacing={5}>
      <InfoCard
        name="Data Frame"
        width="50%"
        icon={BiData}
        topRight={
          <>
            {isUpdating ? (
              <Button
                size="sm"
                colorScheme="yellow"
                letterSpacing="wide"
                onClick={() => setIsUpdating(!isUpdating)}
              >
                STOP
              </Button>
            ) : (
              <Button
                size="sm"
                colorScheme="green"
                letterSpacing="wide"
                onClick={() => setIsUpdating(!isUpdating)}
              >
                READ
              </Button>
            )}
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              letterSpacing="wide"
              onClick={() => {
                setTestLine(0)
              }}
            >
              CLEAR
            </Button>
          </>
        }
      >
        <VStack w="full" h="28rem" overflowY="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Type</Th>
                <Th>Format</Th>
                <Th>Len</Th>
                <Th isNumeric>DATA</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usbCanData === []
                ? ''
                : usbCanData
                    .slice(0, testLine)
                    .map(
                      ({
                        index,
                        id,
                        type,
                        format,
                        len,
                        data,
                      }: UsbCanDataType) => (
                        <Tr key={index}>
                          <Td>{`0x${id}`}</Td>
                          <Td>{type}</Td>
                          <Td>{format}</Td>
                          <Td>{len}</Td>
                          <Td isNumeric fontFamily="mono">{`0x${data}`}</Td>
                        </Tr>
                      )
                    )}
            </Tbody>
          </Table>
        </VStack>
      </InfoCard>
      <VStack w="80">
        <InfoCard
          name="Control"
          width="full"
          icon={BiWrench}
          topRight={
            <Button
              size="sm"
              colorScheme="blue"
              letterSpacing="wide"
              onClick={handleSendData}
            >
              SEND
            </Button>
          }
        >
          <VStack alignItems="flex-start">
            <Text>Data Frame Configuration</Text>
            <HStack w="full">
              <Text>ID:</Text>
              <Spacer />
              <InputGroup size="sm" w={48}>
                <InputLeftAddon>0x</InputLeftAddon>
                <Input
                  placeholder="Frame ID"
                  value={frameId}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFrameId(Number(event.target.value))
                  }}
                />
              </InputGroup>
            </HStack>
            <HStack w="full">
              <Text>Data:</Text>
              <Spacer />
              <InputGroup size="sm" w={48}>
                <InputLeftAddon>0x</InputLeftAddon>
                <Input
                  placeholder="Frame data"
                  value={frameData}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFrameData(Number(event.target.value))
                  }}
                />
              </InputGroup>
            </HStack>
          </VStack>
        </InfoCard>
        <InfoCard name="USB CAN Settings" width="full">
          <VStack w="full">
            <HStack w="full">
              <Text>Device Type:</Text>
              <Spacer />
              <Text> {DeviceType[deviceType].toString()}</Text>
            </HStack>
            <HStack w="full">
              <Text>Device Index:</Text>
              <Spacer />
              <Text>{deviceIndex}</Text>
            </HStack>
            <HStack w="full">
              <Text>CAN Index:</Text>
              <Spacer />
              <Text>{canIndex}</Text>
            </HStack>
            <HStack w="full">
              <Text>CAN Baud Rate:</Text>
              <Spacer />
              <Text>{parseBaudRate(baudRate)}</Text>
            </HStack>
            <HStack w="full">
              <Text>Fetching Interval:</Text>
              <Spacer />
              <Text>{fetchingInterval}ms</Text>
            </HStack>
          </VStack>
        </InfoCard>
      </VStack>
    </HStack>
  )
}

export default GeneralUsbCan
