import React, { useEffect, useState } from 'react'

import { VStack, HStack, Select, Text, Spinner } from '@chakra-ui/react'
import { Chart } from 'react-google-charts'
import { DataRecord } from '../types/fuelCell'

interface FCChartProps {
  fuelCellStates: DataRecord[]
}

const FCChart = ({ fuelCellStates }: FCChartProps): JSX.Element => {
  const [data, setData] = useState<number[][]>([[0, 0]])
  const [source, setSource] = useState<number>(1)
  const [currentRecord, setCurrentRecord] = useState<DataRecord>(
    fuelCellStates.filter((record) => record.id === source)[0]
  )

  useEffect(() => {
    const selectedRecord = fuelCellStates.find((record) => record.id === source)
    if (selectedRecord !== undefined) {
      setCurrentRecord(selectedRecord)
    }
    const update = setInterval(() => {
      setData((prevState) =>
        prevState.length < 20
          ? [
              ...prevState,
              [prevState[prevState.length - 1][0] + 1, currentRecord.value],
            ]
          : [
              ...prevState.slice(1),
              [prevState[prevState.length - 1][0] + 1, currentRecord.value],
            ]
      )
    }, 500)
    return () => clearInterval(update)
  }, [source])

  return (
    <VStack justifyContent="center" alignItems="center" mt={10}>
      <HStack>
        <Text fontSize="xl" mr={2}>
          Please Select Source:
        </Text>
        <Select
          w="64"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSource(Number(event.target.value))
            setData([[0, 0]])
          }}
          defaultValue={source}
        >
          {fuelCellStates.map((record) => (
            <option
              key={record.id}
              value={record.id}
            >{`${record.source} - ${record.name}`}</option>
          ))}
        </Select>
      </HStack>

      <Chart
        width="600px"
        height="400px"
        chartType="LineChart"
        loader={<Spinner size="xl" color="blue.400" />}
        data={[['x', currentRecord.name], ...data]}
        options={{
          hAxis: {
            title: 'Time',
          },
          vAxis: {
            title: currentRecord.unit,
          },
        }}
        rootProps={{ 'data-id': '1' }}
      />
    </VStack>
  )
}
export default FCChart