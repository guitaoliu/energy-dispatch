import React from 'react'
import {
  HStack,
  Circle,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'

import { GoInfo } from 'react-icons/go'

export type Device = {
  id: number
  name: string
  online: boolean
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
      <HStack alignSelf="flex-start">
        <Icon as={GoInfo} boxSize={5} />
        <Text fontSize="lg" letterSpacing="wide">
          Devices Overall Information
        </Text>
      </HStack>
      <VStack w="full" h={28} maxHeight={32} overflowY="auto">
        <Table colorScheme="twitter" size="sm">
          <Thead>
            <Tr zIndex="sticky">
              <Th bgColor="white" position="sticky" top={0}>
                Devices
              </Th>
              <Th bgColor="white" position="sticky" top={0}>
                Online Status
              </Th>
              <Th bgColor="white" position="sticky" top={0} isNumeric>
                Output Power
              </Th>
              <Th bgColor="white" position="sticky" top={0} isNumeric>
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
    </VStack>
  )
}

export default Devices
