import React, { useState } from 'react'

import { Table, Thead, Tbody, TableCaption, Tr, Th, Td } from '@chakra-ui/react'

import * as FuelCellType from './dataTypes'

export interface DataTableProps {
  name: string
  data: FuelCellType.DataRecord[]
}

const DataTable = ({ name, data }: DataTableProps): JSX.Element => (
  <Table variant="simple" size="sm" colorScheme="blue">
    <TableCaption placement="top">{name}</TableCaption>
    <Thead>
      <Tr>
        <Th>Data</Th>
        <Th isNumeric>Value</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((d) => (
        <Tr key={d.id}>
          <Td>{d.name}</Td>
          <Td isNumeric>
            {d.unit === undefined ? d.value : `${d.value} ${d?.unit}`}
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export default DataTable
