import { ipcRenderer } from 'electron'
import React, { useEffect } from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'

import { MdSave, MdSettings } from 'react-icons/md'
import { BiLineChart } from 'react-icons/bi'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'

import DataTableGroup from '../components/DataTable/DataTableGroup'
import FCChart from '../components/FCChart'

import useFuelCell from '../hooks/useFuelCell'
import timeToString from '../utils/timeToString'
import { CanStatus, DeviceType } from '../lib/eCan'

const FuelCell: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Fuel Cell Data
  const {
    states: fuelCellStates,
    err: FCErr,
    deviceType,
    deviceIndex,
    canIndex,
    baudRate,
    isWork,
    setIsWork,
    isUpdating,
    setIsUpdating,
    power,
    setPower,
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
    <>
      <VStack h="full" justifyContent="center" alignItems="center">
        <VStack w="90%" justifyContent="center">
          <HStack>
            <Text>Demand Power:</Text>
            <NumberInput
              w={24}
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
            <Spacer />
            {isWork ? (
              <Button
                leftIcon={<Icon as={BsToggleOn} boxSize={5} />}
                colorScheme="red"
                variant="outline"
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
                letterSpacing="wider"
                onClick={handleToggleFC}
              >
                START
              </Button>
            )}
            <IconButton
              aria-label="Save Current Data"
              colorScheme="blue"
              icon={<Icon as={MdSave} boxSize={5} />}
              onClick={handleSave}
            />
            <IconButton
              aria-label="Show data charts"
              colorScheme="teal"
              icon={<Icon as={BiLineChart} boxSize={5} />}
              onClick={() => {
                setIsUpdating(false)
                chartOnOpen()
              }}
            />
            <IconButton
              aria-label="USB CAN Settings"
              colorScheme="gray"
              icon={<Icon as={MdSettings} boxSize={5} />}
              onClick={onOpen}
            />
          </HStack>
          <HStack justifyContent="center" alignItems="center">
            <Text fontSize="xl">Fuel cell start-up time:</Text>
            <Text fontSize="xl">
              {timeToString(fuelCellStates.hour.value)}:
              {timeToString(fuelCellStates.minute.value)}:
              {timeToString(fuelCellStates.second.value)}
            </Text>
          </HStack>
        </VStack>
        <DataTableGroup tablesData={Object.values(fuelCellStates)} />
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>USB CAN Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack w="full">
              <Text>Device Type:</Text>
              <Spacer />
              <Text> {DeviceType[deviceType].toString()}</Text>
            </HStack>
            <HStack w="full">
              <Text>Device Index:</Text>
              <Spacer />
              <Text> {deviceIndex}</Text>
            </HStack>
            <HStack w="full">
              <Text>CAN Index:</Text>
              <Spacer />
              <Text> {canIndex}</Text>
            </HStack>
            <HStack w="full">
              <Text>CAN Baud Rate:</Text>
              <Spacer />
              <Text> {baudRate}</Text>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Text fontWeight="bold">
              Please go to the settings page to change the relevant
              configuration.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tooltip
        hasArrow
        bg="cyan.600"
        label="Toggle this to updating data."
        placement="bottom"
        defaultIsOpen
        m={2}
      >
        <HStack pos="absolute" top={5} right={5}>
          <Text fontSize="lg">Updating</Text>
          <Switch
            onChange={handleToggleUpdating}
            isChecked={isUpdating}
            size="lg"
          />
        </HStack>
      </Tooltip>
    </>
  )
}

export default FuelCell
