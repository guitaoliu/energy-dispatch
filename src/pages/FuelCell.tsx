import React, { useState } from 'react'

import {
  Grid,
  GridItem,
  HStack,
  VStack,
  Spacer,
  Icon,
  Text,
  Select,
  Button,
} from '@chakra-ui/react'
import { MdSave, MdDelete } from 'react-icons/md'

import DataTable, { DataTableProps } from '../components/FuelCell/DataTable'

const FuelCell: React.FC = () => {
  const [output, setOutput] = useState<DataTableProps>({
    name: 'Output',
    data: [
      { id: 1, name: 'Cell Volt', value: 0, unit: 'V' },
      { id: 2, name: 'Cell Current', value: 0, unit: 'A' },
      { id: 3, name: 'Cell Power', value: 0, unit: 'W' },
      { id: 4, name: 'DCDC Volt', value: 0, unit: 'V' },
      { id: 5, name: 'DCDC Current', value: 0, unit: 'A' },
      { id: 6, name: 'DCDC Power', value: 0, unit: 'W' },
    ],
  })
  const [powerStack, setPowerStack] = useState<DataTableProps>({
    name: 'Power Stack',
    data: [
      { id: 1, name: 'Min Volt', value: 0, unit: 'V' },
      { id: 2, name: 'Min Number', value: 0 },
      { id: 3, name: 'Max Volt', value: 0, unit: 'V' },
      { id: 4, name: 'Max Number', value: 0 },
    ],
  })
  const [pressure, setPressure] = useState<DataTableProps>({
    name: 'Pressure',
    data: [
      { id: 1, name: 'Hydrogen', value: 0, unit: 'bar' },
      {
        id: 2,
        name: 'Cooling Water',
        value: 0,
        unit: 'bar',
      },
      { id: 3, name: 'Gas', value: 0, unit: 'bar' },
      {
        id: 4,
        name: 'Main Hydrogen Bottle',
        value: 0,
        unit: 'Mpa',
      },
      {
        id: 5,
        name: 'Attached Hydrogen Bottle',
        value: 0,
        unit: 'Mpa',
      },
    ],
  })
  const [load, setLoad] = useState<DataTableProps>({
    name: 'Load',
    data: [
      { id: 1, name: 'Volt', value: 0, unit: 'V' },
      { id: 2, name: 'Current', value: 0, unit: 'A' },
    ],
  })
  const [concentration, setConcentration] = useState<DataTableProps>({
    name: 'Concentration',
    data: [
      {
        id: 1,
        name: 'System Room',
        value: 0,
        unit: 'ppm',
      },
      {
        id: 2,
        name: 'Hydrogen Room',
        value: 0,
        unit: 'ppm',
      },
    ],
  })
  const [temperature, setTemperature] = useState<DataTableProps>({
    name: 'Temperature',
    data: [
      { id: 1, name: 'Gas In', value: 0, unit: '℃' },
      { id: 2, name: 'Gas Out', value: 0, unit: '℃' },
      { id: 3, name: 'Cooling Water In', value: 0, unit: '℃' },
      { id: 4, name: 'Cooling Water Out', value: 0, unit: '℃' },
      { id: 5, name: 'System Cabinet', value: 0, unit: '℃' },
    ],
  })

  const [baudRate, setBaudRate] = useState<number>(500000)
  const [isConnected, setIsConnected] = useState<boolean>(false)

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
    setIsConnected(false)
  }

  return (
    <VStack justifyContent="center">
      <HStack>
        <HStack w="100%" maxW="800px">
          <Text fontSize="sm" w="25%">
            CAN Baud Rate:
          </Text>
          <Select
            w="35%"
            fontSize="sm"
            onChange={(event) => {
              setBaudRate(Number(event.target.value) * 1000)
            }}
            defaultValue="500"
          >
            <option value="50">50 kBit/sec</option>
            <option value="80">80 kBit/sec</option>
            <option value="100">100 kBit/sec</option>
            <option value="125">125 kBit/sec</option>
            <option value="200">200 kBit/sec</option>
            <option value="250">250 kBit/sec</option>
            <option value="400">400 kBit/sec</option>
            <option value="500">500 kBit/sec</option>
            <option value="600">600 kBit/sec</option>
            <option value="800">800 kBit/sec</option>
            <option value="1000">1 MBit/sec</option>
          </Select>
          <Spacer />
          <Button
            leftIcon={<Icon as={MdSave} boxSize={5} />}
            colorScheme="blue"
          >
            Save
          </Button>
          <Button
            leftIcon={<Icon as={MdDelete} boxSize={5} />}
            colorScheme="red"
            variant="outline"
            onClick={handleClear}
          >
            Clear
          </Button>
        </HStack>
      </HStack>
      <Grid
        h="60%"
        maxW="800px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={1}
      >
        <GridItem>
          <DataTable name={output.name} data={output.data} />
        </GridItem>
        <GridItem>
          <DataTable name={powerStack.name} data={powerStack.data} />
        </GridItem>
        <GridItem>
          <DataTable name={load.name} data={load.data} />
        </GridItem>
        <GridItem>
          <DataTable name={concentration.name} data={concentration.data} />
        </GridItem>
        <GridItem>
          <DataTable name={pressure.name} data={pressure.data} />
        </GridItem>
        <GridItem>
          <DataTable name={temperature.name} data={temperature.data} />
        </GridItem>
      </Grid>
    </VStack>
  )
}

export default FuelCell
