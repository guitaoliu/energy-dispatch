import React from 'react'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
} from '@chakra-ui/react'

interface DevicesData {
  name: string
  description: string
}

const devicesList: DevicesData[] = [
  {
    name: 'Fuel Cell',
    description:
      'It uses fuel for power generation, and related data is collected with CAN bus.',
  },
  {
    name: 'AC/DC Transformer',
    description: 'It is able to perform the transition between DC AC power.',
  },
]

const Devices: React.FC = () => (
  <Flex justifyContent="center" alignItems="center" h="100%">
    <Table
      variant="simple"
      maxW="2xl"
      colorScheme="blue"
      boxShadow="outline"
      rounded="md"
    >
      <TableCaption fontSize="lg">
        We support all the above devices, please select the appropriate device
        in the left panel in Devices section.
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Device Name</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {devicesList.map((device) => (
          <Tr key={device.name}>
            <Td>{device.name}</Td>
            <Td>{device.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Flex>
)

export default Devices
