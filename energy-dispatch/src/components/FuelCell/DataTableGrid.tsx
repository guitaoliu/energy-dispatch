import React, { useState } from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import DataTable, { DataTableProps } from './DataTable'

export interface DataTableGridProps {
  output: DataTableProps
  powerStack: DataTableProps
  load: DataTableProps
  concentration: DataTableProps
  pressure: DataTableProps
  temperature: DataTableProps
}

export interface FuelCellStatue extends DataTableGridProps {
  setOutput: React.Dispatch<React.SetStateAction<DataTableProps>>
  setPowerStack: React.Dispatch<React.SetStateAction<DataTableProps>>
  setLoad: React.Dispatch<React.SetStateAction<DataTableProps>>
  setConcentration: React.Dispatch<React.SetStateAction<DataTableProps>>
  setPressure: React.Dispatch<React.SetStateAction<DataTableProps>>
  setTemperature: React.Dispatch<React.SetStateAction<DataTableProps>>
}

export function useFuelCell(initValue = 0): FuelCellStatue {
  const [output, setOutput] = useState<DataTableProps>({
    name: 'Output',
    data: [
      {
        id: 1,
        name: 'Cell Volt',
        value: initValue,
        unit: 'V',
      },
      {
        id: 2,
        name: 'Cell Current',
        value: initValue,
        unit: 'A',
      },
      {
        id: 3,
        name: 'Cell Power',
        value: initValue,
        unit: 'W',
      },
      {
        id: 4,
        name: 'DCDC Volt',
        value: initValue,
        unit: 'V',
      },
      {
        id: 5,
        name: 'DCDC Current',
        value: initValue,
        unit: 'A',
      },
      {
        id: 6,
        name: 'DCDC Power',
        value: initValue,
        unit: 'W',
      },
    ],
  })
  const [powerStack, setPowerStack] = useState<DataTableProps>({
    name: 'Power Stack',
    data: [
      {
        id: 1,
        name: 'Min Volt',
        value: initValue,
        unit: 'V',
      },
      {
        id: 2,
        name: 'Min Number',
        value: initValue,
      },
      {
        id: 3,
        name: 'Max Volt',
        value: initValue,
        unit: 'V',
      },
      {
        id: 4,
        name: 'Max Number',
        value: initValue,
      },
    ],
  })
  const [pressure, setPressure] = useState<DataTableProps>({
    name: 'Pressure',
    data: [
      {
        id: 1,
        name: 'Hydrogen',
        value: initValue,
        unit: 'bar',
      },
      {
        id: 2,
        name: 'Cooling Water',
        value: initValue,
        unit: 'bar',
      },
      {
        id: 3,
        name: 'Gas',
        value: initValue,
        unit: 'bar',
      },
      {
        id: 4,
        name: 'Main Hydrogen Bottle',
        value: initValue,
        unit: 'Mpa',
      },
      {
        id: 5,
        name: 'Attached Hydrogen Bottle',
        value: initValue,
        unit: 'Mpa',
      },
    ],
  })
  const [load, setLoad] = useState<DataTableProps>({
    name: 'Load',
    data: [
      { id: 1, name: 'Volt', value: initValue, unit: 'V' },
      {
        id: 2,
        name: 'Current',
        value: initValue,
        unit: 'A',
      },
    ],
  })
  const [concentration, setConcentration] = useState<DataTableProps>({
    name: 'Concentration',
    data: [
      {
        id: 1,
        name: 'System Room',
        value: initValue,
        unit: 'ppm',
      },
      {
        id: 2,
        name: 'Hydrogen Room',
        value: initValue,
        unit: 'ppm',
      },
    ],
  })
  const [temperature, setTemperature] = useState<DataTableProps>({
    name: 'Temperature',
    data: [
      {
        id: 1,
        name: 'Gas In',
        value: initValue,
        unit: '℃',
      },
      {
        id: 2,
        name: 'Gas Out',
        value: initValue,
        unit: '℃',
      },
      {
        id: 3,
        name: 'Cooling Water In',
        value: initValue,
        unit: '℃',
      },
      {
        id: 4,
        name: 'Cooling Water Out',
        value: initValue,
        unit: '℃',
      },
      {
        id: 5,
        name: 'System Cabinet',
        value: initValue,
        unit: '℃',
      },
    ],
  })
  return {
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
  }
}

const DataTableGrid = ({
  output,
  powerStack,
  load,
  concentration,
  pressure,
  temperature,
}: DataTableGridProps): JSX.Element => (
  <Grid
    h="6initValue%"
    maxW="8initValue%"
    templateRows={{ base: 'repeat(2, 1fr)', '2xl': 'repeat(3, 1fr)' }}
    templateColumns={{ base: 'repeat(3, 1fr)', '2xl': 'repeat(2, 1fr)' }}
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
)

export default DataTableGrid
