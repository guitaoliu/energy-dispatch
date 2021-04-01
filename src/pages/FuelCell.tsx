import React, { useEffect, useState } from 'react'

import { HStack, Text, useMediaQuery, useToast, VStack } from '@chakra-ui/react'

import Controller from '../components/FuelCell/Controller'
import CANSetting from '../components/FuelCell/CANSetting'
import DataTableGrid from '../components/FuelCell/DataTableGrid'

import { DataRecord } from '../types/fuelCell'
import useFuelCell from '../hooks/useFuelCell'

import timeToString from '../utils/timeToString'

import { FuelCellController } from '../utils/eCan'
import FCChart from '../components/FuelCell/FCChart'

const FCController = new FuelCellController()

const FuelCell: React.FC = () => {
  const { states: fuelCellStates, setStates: fuelCellSetStates } = useFuelCell(
    0
  )

  const [isStart, setStart] = useState<boolean>(false)
  const [baudRate, setBaudRate] = useState<number>(500000)
  const [power, setPower] = useState<number>(500)
  const [deviceType, setDeviceType] = useState<number>(0)

  const clearToast = useToast()
  const [showCharts] = useMediaQuery('(min-width: 1536px)')

  /**
   * Initialize CAN bus while rendering the page
   */
  useEffect(() => {
    FCController.open()
    return () => {
      FCController.close()
    }
  }, [])

  useEffect(() => {
    FCController.deviceTypeNumber = deviceType
  }, [deviceType])

  /**
   * Listen to demand power change
   */
  useEffect(() => {
    FCController.changeStatus(power, isStart)
  }, [power, isStart])

  const handleStart = () => {
    setStart(true)
    FCController.init(false, baudRate)
    clearToast({
      title: 'Done!',
      description: `Fuel cell is initialized with demand power ${power} W`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleStop = () => {
    setStart(false)
    clearToast({
      title: 'Done!',
      description: 'Fuel cell stopped',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleClear = () => {
    Object.values(fuelCellSetStates).forEach(
      (sets: React.Dispatch<React.SetStateAction<DataRecord>>) => {
        sets((prevState: DataRecord) => ({
          ...prevState,
          value: 0,
        }))
      }
    )
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
            {timeToString(fuelCellStates.hour.value)}:
            {timeToString(fuelCellStates.minute.value)}:
            {timeToString(fuelCellStates.second.value)}
          </Text>
        </VStack>
        <VStack w="40%" justifyContent="center">
          <CANSetting
            isStart={isStart}
            power={power}
            deviceType={deviceType}
            baudRate={baudRate}
            setPower={setPower}
            setDeviceType={setDeviceType}
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
        <DataTableGrid tablesData={Object.values(fuelCellStates)} />
        {showCharts && (
          <FCChart fuelCellStates={Object.values(fuelCellStates)} />
        )}
      </HStack>
    </VStack>
  )
}

export default FuelCell
