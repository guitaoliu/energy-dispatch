import React, { useEffect, useState, useMemo } from 'react'
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
import os from 'os'

import Controller from '../components/FuelCell/Controller'
import CANSetting from '../components/FuelCell/CANSetting'
import DataTableGrid from '../components/FuelCell/DataTableGrid'
import FCChart from '../components/FuelCell/FCChart'
import useFuelCell from '../hooks/useFuelCell'

import { FuelCellController } from '../utils/eCan'
import saveData from '../utils/saveData'
import { DataRecord } from '../types/fuelCell'
import timeToString from '../utils/timeToString'

const FuelCell: React.FC = () => {
  const FCController = useMemo(() => new FuelCellController(), [])

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
  const toast = useToast()
  const {
    isOpen: chartIsOpen,
    onOpen: chartOnOpen,
    onClose: chartOnClose,
  } = useDisclosure()

  // Initialize CAN bus while rendering the page
  useEffect(() => {
    if (FCController.open() === 0) {
      toast({
        title: 'Error',
        description: 'Device Open Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    if (FCController.init(false, baudRate) === 0) {
      toast({
        title: 'Error',
        description: 'CAN Bus Initialize Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    if (FCController.start() === 0) {
      toast({
        title: 'Error',
        description: 'CAN Bus Start Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    return () => {
      console.log(FCController.close())
    }
  }, [])

  // Listen to demand power change
  useEffect(() => {
    FCController.changeStatus(power, isStart)
  }, [power, isStart])

  const handleUpdateDate = () => {
    FCController.update()

    fuelCellSetStates.setOutputCurrent((prevState) => ({
      ...prevState,
      value: FCController.outputCurrent,
    }))
    fuelCellSetStates.setOutputPower((prevState) => ({
      ...prevState,
      value: FCController.outputPower,
    }))
    fuelCellSetStates.setOutputVolt((prevState) => ({
      ...prevState,
      value: FCController.outputVolt,
    }))
    fuelCellSetStates.setDCDCCurrent((prevState) => ({
      ...prevState,
      value: FCController.dcdcCurrent,
    }))
    fuelCellSetStates.setDCDCPower((prevState) => ({
      ...prevState,
      value: FCController.dcdcVolt,
    }))
    fuelCellSetStates.setDCDCTemperature((prevState) => ({
      ...prevState,
      value: FCController.dcdcTemperature,
    }))
    fuelCellSetStates.setPowerStackMaxNumber((prevState) => ({
      ...prevState,
      value: FCController.powerStackMaxNumber,
    }))
    fuelCellSetStates.setPowerStackMaxVolt((prevState) => ({
      ...prevState,
      value: FCController.powerStackMaxVolt,
    }))
    fuelCellSetStates.setPowerStackMinNumber((prevState) => ({
      ...prevState,
      value: FCController.powerStackMinNumber,
    }))
    fuelCellSetStates.setPowerStackMinVolt((prevState) => ({
      ...prevState,
      value: FCController.powerStackMinVolt,
    }))
    fuelCellSetStates.setConcentrationHydrogenRoom((prevState) => ({
      ...prevState,
      value: FCController.concentrationHydrogenRoom,
    }))
    fuelCellSetStates.setConcentrationSystemRoom((prevState) => ({
      ...prevState,
      value: FCController.concentrationSystemRoom,
    }))
    fuelCellSetStates.setPressureMainHydrogenBottle((prevState) => ({
      ...prevState,
      value: FCController.pressureMainHydrogenBottle,
    }))
    fuelCellSetStates.setPressureAttachedHydrogenBottle((prevState) => ({
      ...prevState,
      value: FCController.pressureAttachedHydrogenBottle,
    }))
    fuelCellSetStates.setPressureCoolingWater((prevState) => ({
      ...prevState,
      value: FCController.pressureCoolingWater,
    }))
    fuelCellSetStates.setPressureGas((prevState) => ({
      ...prevState,
      value: FCController.pressureGas,
    }))
    fuelCellSetStates.setPressureHydrogen((prevState) => ({
      ...prevState,
      value: FCController.pressureHydrogen,
    }))
    fuelCellSetStates.setLoadCurrent((prevState) => ({
      ...prevState,
      value: FCController.loadCurrent,
    }))
    fuelCellSetStates.setLoadVolt((prevState) => ({
      ...prevState,
      value: FCController.loadVolt,
    }))
    fuelCellSetStates.setTemperatureCoolingWaterIn((prevState) => ({
      ...prevState,
      value: FCController.temperatureCoolingWaterIn,
    }))
    fuelCellSetStates.setTemperatureCoolingWaterOut((prevState) => ({
      ...prevState,
      value: FCController.temperatureCoolingWaterOut,
    }))
    fuelCellSetStates.setTemperatureGasIn((prevState) => ({
      ...prevState,
      value: FCController.temperatureGasIn,
    }))
    fuelCellSetStates.setTemperatureGasOut((prevState) => ({
      ...prevState,
      value: FCController.temperatureGasOut,
    }))
    fuelCellSetStates.setTemperatureSystemCabinet((prevState) => ({
      ...prevState,
      value: FCController.temperatureSystemCabinet,
    }))
    fuelCellSetStates.setHour((prevState) => ({
      ...prevState,
      value: FCController.hour,
    }))
    fuelCellSetStates.setMinute((prevState) => ({
      ...prevState,
      value: FCController.minute,
    }))
    fuelCellSetStates.setSecond((prevState) => ({
      ...prevState,
      value: FCController.second,
    }))
  }

  useEffect(() => {
    const updateData = setInterval(() => {
      if (isStart) {
        handleUpdateDate()
      }
    }, 500)
    return () => clearInterval(updateData)
  }, [isStart])

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

  const handleStart = () => {
    setStart(true)

    toast({
      title: 'Done!',
      description: `Fuel cell is initialized with demand power ${power} W`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleStop = () => {
    setStart(false)
    toast({
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
    toast({
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
              handleSave={handleSave}
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
