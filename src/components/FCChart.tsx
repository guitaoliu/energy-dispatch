import React, { useEffect, useMemo, useState } from 'react'
import { VStack, HStack, Select, Text, Spinner } from '@chakra-ui/react'
import { Chart } from 'react-google-charts'

import useDataUpdatingInterval from '../hooks/useDataUpdatingInterval'
import { DataRecord } from '../types'

interface FCChartProps {
  fuelCellStates: DataRecord[]
}

const FCChart = ({ fuelCellStates }: FCChartProps): JSX.Element => {
  const { dataUpdatingInterval } = useDataUpdatingInterval()
  const [source, setSource] = useState<number>(1)
  const [currentRecord, setCurrentRecord] = useState<DataRecord>(
    fuelCellStates.filter((record) => record.id === source)[0]
  )
  const [data, setData] = useState<number[][]>([[0, 0]])

  const fuelCellDataList = useMemo(
    () =>
      fuelCellStates.map((record) => ({
        id: record.id,
        name: record.name,
        source: record.source,
      })),
    []
  )

  useEffect(() => {
    const selectedRecord = fuelCellStates.find((record) => record.id === source)
    if (selectedRecord !== undefined) {
      setCurrentRecord(selectedRecord)
    }
  }, [source])

  useEffect(() => {
    const update = setInterval(() => {
      setData((prevState) => {
        if (prevState[0][0] === 0) {
          return [[1, currentRecord.value]]
        }
        return prevState.length < 20
          ? [
              ...prevState,
              [prevState[prevState.length - 1][0] + 1, currentRecord.value],
            ]
          : [
              ...prevState.slice(1),
              [prevState[prevState.length - 1][0] + 1, currentRecord.value],
            ]
      })
    }, dataUpdatingInterval)
    return () => clearInterval(update)
  }, [currentRecord])

  const handleSourceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(Number(event.target.value))
    setData([[0, 0]])
  }

  return (
    <VStack justifyContent="center" alignItems="center" mt={10}>
      <HStack>
        <Text fontSize="xl" mr={2}>
          Please Select Source:
        </Text>
        <Select w="64" onChange={handleSourceChange} defaultValue={source}>
          {fuelCellDataList.map((record) => (
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
