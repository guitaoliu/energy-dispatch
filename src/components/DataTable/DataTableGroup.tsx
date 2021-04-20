import React from 'react'

import { Grid, GridItem } from '@chakra-ui/react'

import DataTable from './DataTable'
import { DataRecord } from '../../types/fuelCell'

export interface DataTableGridProps {
  tablesData: DataRecord[]
}

const DataTableGroup = ({ tablesData }: DataTableGridProps): JSX.Element => {
  const output = {
    name: 'Output and Load',
    data: tablesData
      .filter((data) => data.source === 'Output' || data.source === 'Load')
      .map((data) => ({
        ...data,
        name: `${data.source} ${data.name}`,
      })),
  }
  const powerStack = {
    name: 'Power Stack',
    data: tablesData.filter((data) => data.source === 'Power Stack'),
  }
  const dcdc = {
    name: 'DCDC',
    data: tablesData.filter((data) => data.source === 'DCDC'),
  }
  const concentration = {
    name: 'Concentration',
    data: tablesData.filter((data) => data.source === 'Concentration'),
  }
  const pressure = {
    name: 'Pressure',
    data: tablesData.filter((data) => data.source === 'Pressure'),
  }
  const temperature = {
    name: 'Temperature',
    data: tablesData.filter((data) => data.source === 'Temperature'),
  }
  return (
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
        <DataTable name={dcdc.name} data={dcdc.data} />
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
}

export default DataTableGroup
