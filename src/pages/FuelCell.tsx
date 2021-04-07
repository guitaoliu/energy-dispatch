import React, { useEffect } from 'react'
import {
  HStack,
  VStack,
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import os from 'os'

import Controller from '../components/FuelCell/Controller'
import CANSetting from '../components/FuelCell/CANSetting'
import DataTableGrid from '../components/FuelCell/DataTableGrid'
import FCChart from '../components/FuelCell/FCChart'

import useFuelCell from '../hooks/useFuelCell'
import saveData from '../utils/saveData'
import timeToString from '../utils/timeToString'

const FuelCell: React.FC = () => {
  // Fuel Cell Data
  const {
    states: fuelCellStates,
    err: FCErr,
    baudRate,
    setBaudRate,
    isStart,
    setIsStart,
    power,
    setPower,
    deviceType,
    setDeviceType,
  } = useFuelCell()

  // Render control
  const toast = useToast()
  const {
    isOpen: chartIsOpen,
    onOpen: chartOnOpen,
    onClose: chartOnClose,
  } = useDisclosure()

  const handleSave = () => {
    const data = Object.values(fuelCellStates)
    const homedir = os.homedir()
    const err = saveData(
      JSON.stringify(data, null, 2),
      'Fuel Cell Current State',
      homedir
    )
    if (err !== null) {
      toast({
        title: 'Cannot Save',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    toast({
      title: 'Error!',
      description: 'Can not process that',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
  }, [FCErr])

  const handleStart = () => {
    setIsStart(true)

    toast({
      title: 'Done!',
      description: `Fuel cell is initialized with demand power ${power} W`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleStop = () => {
    setIsStart(false)
    toast({
      title: 'Done!',
      description: 'Fuel cell stopped',
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
              isStart={isStart}
              handleStart={handleStart}
              handleStop={handleStop}
              handleSave={handleSave}
              handleChartOpen={chartOnOpen}
            />
          </VStack>
        </HStack>

        <HStack maxW="90%" justifyContent="center" spacing={2}>
          <DataTableGrid tablesData={Object.values(fuelCellStates)} />
        </HStack>
      </VStack>

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
