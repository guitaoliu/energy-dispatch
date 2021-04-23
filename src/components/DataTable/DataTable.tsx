import React from 'react'

import {
  Table,
  Thead,
  Tbody,
  TableCaption,
  Tr,
  Th,
  Td,
  useBreakpointValue,
} from '@chakra-ui/react'

import { DataRecord } from '../../types'

export interface DataTableProps {
  name: string
  data: DataRecord[]
}

const DataTable = ({ name, data }: DataTableProps): JSX.Element => {
  const size = useBreakpointValue({ md: 'sm', '2xl': 'md' })
  return (
    <Table variant="simple" size={size} colorScheme="blue">
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
              {d.unit === undefined
                ? d.value.toFixed(0)
                : `${d.value.toFixed(d.value === 0 ? 0 : 3)} ${d?.unit}`}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

const dataTablePropsAreEqual = (
  prevProps: DataTableProps,
  nextProps: DataTableProps
): boolean => {
  for (let i = 0; i < prevProps.data.length; i += 1) {
    if (
      prevProps.data[i].value.toFixed(3) !== nextProps.data[i].value.toFixed(3)
    ) {
      return false
    }
  }
  return true
}

export default React.memo(DataTable, dataTablePropsAreEqual)
