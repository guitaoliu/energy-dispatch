import React, { useEffect, useState } from 'react'
import {
  HStack,
  VStack,
  Icon,
  Box,
  Text,
  Tooltip,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import { BiLineChart } from 'react-icons/bi'

import Controller from '../components/FuelCell/Controller'
import CANSetting from '../components/FuelCell/CANSetting'
import DataTableGrid from '../components/FuelCell/DataTableGrid'
import FCChart from '../components/FuelCell/FCChart'
import useFuelCell from '../hooks/useFuelCell'

import { FuelCellController } from '../utils/eCan'
import { DataRecord } from '../types/fuelCell'
import timeToString from '../utils/timeToString'

const FCController = new FuelCellController()

const FuelCell: React.FC = () => {
  // Fuel Cell Data
  const { states: fuelCellStates, setStates: fuelCellSetStates } = useFuelCell(
    0
  )

  // Setting control
  const [isStart, setStart] = useState<boolean>(false)
  const [baudRate, setBaudRate] = useState<number>(500000)
  const [power, setPower] = useState<number>(500)
  const [deviceType, setDeviceType] = useState<number>(0)

  // Render control
  const clearToast = useToast()
  const {
    isOpen: chartIsOpen,
    onOpen: chartOnOpen,
    onClose: chartOnClose,
  } = useDisclosure()

  // Initialize CAN bus while rendering the page
  useEffect(() => {
    FCController.open()
    return () => {
      FCController.close()
    }
  }, [])

  // Listen to device type change
  useEffect(() => {
    FCController.deviceTypeNumber = deviceType
  }, [deviceType])

  // Listen to demand power change
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
    <Box my={3}>
      <VStack justifyContent="center">
        <HStack w="90%" justifyContent="space-between">
          <VStack w="30%" justifyContent="center" alignItems="center">
            <Text fontSize="3xl">UP TIME</Text>
            <Text fontSize="3xl" fontWeight="bold" letterSpacing="wider">
              {timeToString(fuelCellStates.hour.value)}:
              {timeToString(fuelCellStates.minute.value)}:
              {timeToString(fuelCellStates.second.value)}
            </Text>
          </VStack>
          <VStack w="30%" justifyContent="center">
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
          <VStack w="40%" justifyContent="center">
            <Controller
              handleClear={handleClear}
              isStart={isStart}
              handleStart={handleStart}
              handleStop={handleStop}
            />
          </VStack>
        </HStack>

        <HStack maxW="90%" justifyContent="center" spacing={2}>
          <DataTableGrid tablesData={Object.values(fuelCellStates)} />
        </HStack>
      </VStack>

      <Tooltip label="Open Chart">
        <Button
          pos="absolute"
          top={3}
          right={3}
          colorScheme="blue"
          letterSpacing="wide"
          shadow={2}
          onClick={chartOnOpen}
        >
          <Icon as={BiLineChart} boxSize={6} />
        </Button>
      </Tooltip>
      <Drawer
        isOpen={chartIsOpen}
        placement="right"
        onClose={chartOnClose}
        size="xl"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Fuel Cell Data Chart</DrawerHeader>
            <DrawerBody>
              <FCChart fuelCellStates={Object.values(fuelCellStates)} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}

export default FuelCell
