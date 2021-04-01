import React from 'react'

import {
  HStack,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

export interface CANSettingProps {
  isStart: boolean
  power: number
  canChannel: number
  baudRate: number
  setPower: React.Dispatch<React.SetStateAction<number>>
  setCanChannel: React.Dispatch<React.SetStateAction<number>>
  setBaudRate: React.Dispatch<React.SetStateAction<number>>
}

const CANSetting = ({
  isStart,
  power,
  setPower,
  canChannel,
  setCanChannel,
  baudRate,
  setBaudRate,
}: CANSettingProps): JSX.Element => (
  <>
    <HStack justifyContent="center" w={64}>
      <Text fontSize="sm">Demand Power:</Text>
      <NumberInput
        size="sm"
        w="50%"
        defaultValue={power}
        min={0}
        max={5000}
        onChange={(value) => {
          setPower(Number(value))
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>

    <HStack justifyContent="center" w={64}>
      <Text fontSize="sm">CAN Channel:</Text>
      <Select
        size="sm"
        w="50%"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setCanChannel(Number(event.target.value))
        }}
        defaultValue={canChannel}
        isDisabled={isStart}
      >
        <option value="0">USB CAN I</option>
        <option value="1">USB CAN II</option>
      </Select>
    </HStack>

    <HStack justifyContent="center" w={64}>
      <Text fontSize="sm">CAN Baud Rate:</Text>
      <Select
        size="sm"
        w="50%"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setBaudRate(Number(event.target.value) * 1000)
        }}
        defaultValue={baudRate / 1000}
        isDisabled={isStart}
      >
        <option value="5">5 kBit/s</option>
        <option value="10">10 kBit/s</option>
        <option value="20">20 kBit/s</option>
        <option value="40">40 kBit/s</option>
        <option value="50">50 kBit/s</option>
        <option value="80">80 kBit/s</option>
        <option value="100">100 kBit/s</option>
        <option value="125">125 kBit/s</option>
        <option value="200">200 kBit/s</option>
        <option value="250">250 kBit/s</option>
        <option value="400">400 kBit/s</option>
        <option value="500">500 kBit/s</option>
        <option value="666">600 kBit/s</option>
        <option value="800">800 kBit/s</option>
        <option value="1000">1 MBit/s</option>
      </Select>
    </HStack>
  </>
)

export default CANSetting
