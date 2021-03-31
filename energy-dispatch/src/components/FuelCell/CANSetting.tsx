import React from 'react'

import { HStack, Select, Text } from '@chakra-ui/react'

export interface CANSettingProps {
  setCanChannel: React.Dispatch<React.SetStateAction<number>>
  setBaudRate: React.Dispatch<React.SetStateAction<number>>
}

const CANSetting = ({
  setCanChannel,
  setBaudRate,
}: CANSettingProps): JSX.Element => (
  <>
    <HStack justifyContent="center">
      <Text fontSize="sm" w="32">
        CAN Channel:
      </Text>
      <Select
        w="32"
        fontSize="sm"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setCanChannel(Number(event.target.value))
        }}
        defaultValue="0"
      >
        <option value="0">0</option>
      </Select>
    </HStack>

    <HStack justifyContent="center">
      <Text fontSize="sm" w="32">
        CAN Baud Rate:
      </Text>
      <Select
        w="32"
        fontSize="sm"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setBaudRate(Number(event.target.value) * 1000)
        }}
        defaultValue="500"
      >
        <option value="5">5 kBit/sec</option>
        <option value="10">10 kBit/sec</option>
        <option value="20">20 kBit/sec</option>
        <option value="40">40 kBit/sec</option>
        <option value="50">50 kBit/sec</option>
        <option value="80">80 kBit/sec</option>
        <option value="100">100 kBit/sec</option>
        <option value="125">125 kBit/sec</option>
        <option value="200">200 kBit/sec</option>
        <option value="250">250 kBit/sec</option>
        <option value="400">400 kBit/sec</option>
        <option value="500">500 kBit/sec</option>
        <option value="666">600 kBit/sec</option>
        <option value="800">800 kBit/sec</option>
        <option value="1000">1 MBit/sec</option>
      </Select>
    </HStack>
  </>
)

export default CANSetting
