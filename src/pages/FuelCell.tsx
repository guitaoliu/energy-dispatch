import React, { useState } from 'react'

import {
  HStack,
  VStack,
  Text,
  Box,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react'

import DataTableGrid, {
  useFuelCell,
} from '../components/FuelCell/DataTableGrid'
import Controller from '../components/FuelCell/Controller'
import CANSetting from '../components/FuelCell/CANSetting'

const FuelCell: React.FC = () => {
  const {
    output,
    setOutput,
    powerStack,
    setPowerStack,
    load,
    setLoad,
    concentration,
    setConcentration,
    pressure,
    setPressure,
    temperature,
    setTemperature,
  } = useFuelCell(0)

  const [upHour, setUpdateHour] = useState<number>(0)
  const [upMinute, setUpdateMinute] = useState<number>(0)
  const [upSecond, setUpdateSecond] = useState<number>(0)

  const [baudRate, setBaudRate] = useState<number>(500000)
  const [canChannel, setCanChannel] = useState<number>(0)
  const [isStart, setStart] = useState<boolean>(false)

  const clearToast = useToast()
  const [showCharts] = useMediaQuery('(min-width: 1536px)')

  const handleClear = () => {
    setOutput(() => {
      const updatedOutput = { ...output }
      updatedOutput.data = output.data.map((data) => ({
        ...data,
        value: 0,
      }))
      return updatedOutput
    })
    setPowerStack(() => {
      const updatedPowerStack = { ...powerStack }
      updatedPowerStack.data = updatedPowerStack.data.map((data) => ({
        ...data,
        value: 0,
      }))
      return updatedPowerStack
    })
    setLoad(() => {
      const updatedLoad = { ...load }
      updatedLoad.data = updatedLoad.data.map((data) => ({
        ...data,
        value: 0,
      }))
      return updatedLoad
    })
    setConcentration(() => {
      const updatedConcentration = { ...concentration }
      updatedConcentration.data = updatedConcentration.data.map((data) => ({
        ...data,
        value: 0,
      }))
      return updatedConcentration
    })
    setPressure(() => {
      const updatedPressure = { ...pressure }
      updatedPressure.data = updatedPressure.data.map((data) => ({
        ...data,
        value: 0,
      }))
      return updatedPressure
    })
    setTemperature(() => {
      const updatedTemperature = { ...temperature }
      updatedTemperature.data = updatedTemperature.data.map((data) => ({
        ...data,
        value: 0,
      }))
      return updatedTemperature
    })
    setUpdateSecond(0)
    setUpdateMinute(0)
    setUpdateHour(0)
    setStart(false)
    clearToast({
      title: 'Done!',
      description: 'Data is cleared and the connection is closed.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <VStack justifyContent="center">
      <HStack w="80%" justifyContent="center">
        <VStack w="30%" justifyContent="center" alignItems="center">
          <Text fontSize="3xl">UP TIME</Text>
          <Text fontSize="3xl" fontWeight="bold" letterSpacing="wider">
            {upHour < 10 ? `0${upHour}` : upHour}:
            {upMinute < 10 ? `0${upMinute}` : upMinute}:
            {upSecond < 10 ? `0${upSecond}` : upSecond}
          </Text>
        </VStack>
        <VStack w="40%" justifyContent="center">
          <CANSetting setCanChannel={setCanChannel} setBaudRate={setBaudRate} />
        </VStack>
        <VStack w="30%" justifyContent="center">
          <Controller
            handleClear={handleClear}
            isStart={isStart}
            setStart={setStart}
          />
        </VStack>
      </HStack>

      <HStack w="80%" justifyContent="center" spacing={2}>
        <DataTableGrid
          output={output}
          powerStack={powerStack}
          load={load}
          concentration={concentration}
          pressure={pressure}
          temperature={temperature}
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
