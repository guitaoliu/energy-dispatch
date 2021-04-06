import React from 'react'
import {
  Circle,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'

export type Device = {
  id: number
  name: string
  status: boolean
  outputPower: number
  consumePower: number
}

export interface DevicesProps {
  devices: Device[]
}

const Devices = ({ devices }: DevicesProps): JSX.Element => {
  return (
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
  )
}

export default Devices
