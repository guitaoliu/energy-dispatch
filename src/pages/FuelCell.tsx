import { ipcRenderer } from 'electron'
import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'
import { MdSave } from 'react-icons/md'
import { BiLineChart } from 'react-icons/bi'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'

import DataTableGrid from '../components/DataTableGrid'
import FCChart from '../components/FCChart'

import useFuelCell from '../hooks/useFuelCell'

import timeToString from '../utils/timeToString'
import { CanStatus } from '../utils/fuelCell'

const FuelCell: React.FC = () => {
  // Fuel Cell Data
  const {
    states: fuelCellStates,
    err: FCErr,
    baudRate,
    setBaudRate,
    isWork,
    setIsWork,
    isUpdating,
    setIsUpdating,
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

  const handleSave = async () => {
    const data = Object.values(fuelCellStates)
    const resp = await ipcRenderer.invoke(
      'device-save-data',
      'Fuel Cell Current State',
      JSON.stringify(data, null, 2)
    )
    if (resp.msg === 'error') {
      toast({
        title: 'Error!',
        description: 'Cannot save to that path',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Done!',
        description: `Success save to ${resp.path}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleToggleUpdating = () => setIsUpdating(!isUpdating)
  const handleToggleFC = () => setIsWork(!isWork)

  useEffect(() => {
    const checkErr = setInterval(() => {
      if (FCErr === CanStatus.ERR) {
        toast({
          title: 'Warning!',
          description: 'Something went wrong, checking after 5s.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
      }
    }, 5000)
    return () => clearInterval(checkErr)
  }, [])

  useEffect(() => {
    return setIsUpdating(false)
  }, [])

  return (
    <Box my={3} h="full">
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
            <HStack justifyContent="space-between" w={64}>
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
                isDisabled={isWork}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>

            <HStack justifyContent="space-between" w={64}>
              <Text fontSize="sm">Device Type:</Text>
              <Select
                size="sm"
                w="50%"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setDeviceType(Number(event.target.value))
                }}
                defaultValue={deviceType}
                isDisabled
              >
                <option value="3">USB CAN I</option>
                <option value="4">USB CAN II</option>
              </Select>
            </HStack>

            <HStack justifyContent="space-between" w={64}>
              <Text fontSize="sm">CAN Baud Rate:</Text>
              <Select
                size="sm"
                w="50%"
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setBaudRate(Number(event.target.value) * 1000)
                }}
                defaultValue={baudRate / 1000}
                isDisabled
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
          </VStack>
          <VStack w="40%" justifyContent="center">
            <SimpleGrid columns={2} spacing={2}>
              {isUpdating ? (
                <Button
                  leftIcon={<Icon as={VscDebugStop} boxSize={5} />}
                  colorScheme="red"
                  w={28}
                  letterSpacing="wider"
                  onClick={handleToggleUpdating}
                >
                  STOP
                </Button>
              ) : (
                <Button
                  leftIcon={<Icon as={VscDebugStart} boxSize={5} />}
                  colorScheme="green"
                  w={28}
                  letterSpacing="wider"
                  onClick={handleToggleUpdating}
                >
                  UPDATE
                </Button>
              )}
              <Button
                leftIcon={<Icon as={MdSave} boxSize={5} />}
                colorScheme="blue"
                w={28}
                letterSpacing="wider"
                onClick={handleSave}
              >
                SAVE
              </Button>
              <Button
                leftIcon={<Icon as={BiLineChart} boxSize={5} />}
                colorScheme="blue"
                variant="outline"
                w={28}
                letterSpacing="wider"
                onClick={() => {
                  setIsUpdating(false)
                  chartOnOpen()
                }}
              >
                CHARTS
              </Button>
              {isWork ? (
                <Button
                  leftIcon={<Icon as={BsToggleOn} boxSize={5} />}
                  colorScheme="red"
                  variant="outline"
                  w={28}
                  letterSpacing="wider"
                  onClick={handleToggleFC}
                >
                  STOP
                </Button>
              ) : (
                <Button
                  leftIcon={<Icon as={BsToggleOff} boxSize={5} />}
                  colorScheme="green"
                  variant="outline"
                  w={28}
                  letterSpacing="wider"
                  onClick={handleToggleFC}
                >
                  START
                </Button>
              )}
            </SimpleGrid>
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
