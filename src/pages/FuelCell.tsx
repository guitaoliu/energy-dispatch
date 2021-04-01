import React, { useState, useEffect } from 'react'

import {
  HStack,
  VStack,
  Text,
  Box,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react'

import Controller from '../components/FuelCell/Controller'
import CANSetting from '../components/FuelCell/CANSetting'
import DataTableGrid from '../components/FuelCell/DataTableGrid'

import { DataRecord } from '../types/fuelCell'
import useFuelCell from '../hooks/useFuelCell'

import timeToString from '../utils/timeToString'

import { FuelCellController } from '../utils/eCan'

const FCController = new FuelCellController()

const FuelCell: React.FC = () => {
  const { states: fuelCellStates, setStates: fuelCellSetStates } = useFuelCell(
    0
  )

  const [baudRate, setBaudRate] = useState<number>(500000)
  const [power, setPower] = useState<number>(500)
  const [canChannel, setCanChannel] = useState<number>(0)
  const [isStart, setStart] = useState<boolean>(false)

  const clearToast = useToast()
  const [showCharts] = useMediaQuery('(min-width: 1536px)')

  useEffect(() => {
    FCController.open()
    return () => {
      FCController.close()
    }
  }, [])

  const handleStart = () => {
    setStart(true)
    FCController.init(false, baudRate)
    FCController.changeStatus(power, isStart)
    clearToast({
      title: 'Done!',
      description: `USB CAN started and fuel cell is initialized with demand power ${power}W`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleStop = () => {
    setStart(false)
    FCController.changeStatus(power, isStart)
    clearToast({
      title: 'Done!',
      description: 'Fuel cell stopped',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleClear = () => {
    clearToast({
      title: 'Done!',
      description: 'Cleared!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack justifyContent="center">
      <HStack w="80%" justifyContent="center">
        <VStack w="30%" justifyContent="center" alignItems="center">
          <Text fontSize="3xl">UP TIME</Text>
          <Text fontSize="3xl" fontWeight="bold" letterSpacing="wider">
            {timeToString(fuelCellStates.hour)}:
            {timeToString(fuelCellStates.minute)}:
            {timeToString(fuelCellStates.second)}
          </Text>
        </VStack>
        <VStack w="40%" justifyContent="center">
          <CANSetting
            isStart={isStart}
            power={power}
            canChannel={canChannel}
            baudRate={baudRate}
            setPower={setPower}
            setCanChannel={setCanChannel}
            setBaudRate={setBaudRate}
          />
        </VStack>
        <VStack w="30%" justifyContent="center">
          <Controller
            handleClear={handleClear}
            isStart={isStart}
            handleStart={handleStart}
            handleStop={handleStop}
          />
        </VStack>
      </HStack>

      <HStack w="80%" justifyContent="center" spacing={2}>
        <DataTableGrid
          tablesData={Object.values(fuelCellStates) as DataRecord[]}
        />
        {showCharts && (
          <Box
            w="50%"
            bg="cyan.200"
            h="48"
            m={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white">Chart</Text>
          </Box>
        )}
      </HStack>
    </VStack>
  )
}

export default FuelCell
