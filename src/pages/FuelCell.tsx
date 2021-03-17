import React, { useEffect, useState } from 'react'
import * as FuelCellData from '../components/FuelCell/dataTypes'

const FuelCell: React.FC = () => {
  const [output, setOutput] = useState<FuelCellData.Output>({
    volt: 0,
    current: 0,
    power: 0,
  })
  const [powerStack, setPowerStack] = useState<FuelCellData.PowerStack>({
    minVolt: 0,
    minNumber: 0,
    maxVolt: 0,
    maxNumber: 0,
  })
  const [pressure, setPressure] = useState<FuelCellData.Pressure>({
    hydrogen: 0,
    coolingWater: 0,
    gas: 0,
    mainHydrogenBottle: 0,
    attachedHydrogenBottle: 0,
  })
  const [DCDC, setDCDC] = useState<FuelCellData.DCDC>({
    volt: 0,
    current: 0,
    power: 0,
  })
  const [loads, setLoads] = useState<FuelCellData.Loads>({
    volt: 0,
    current: 0,
  })
  const [
    concentration,
    setConcentration,
  ] = useState<FuelCellData.Concentration>({
    systemRoom: 0,
    hydrogenRoom: 0,
  })
  const [temperature, setTemperature] = useState<FuelCellData.Temperature>({
    gasIn: 0,
    gasOut: 0,
    coolingWaterIn: 0,
    coolingWaterOut: 0,
    systemCabinet: 0,
    DCDC: 0,
  })
  const [
    systemRuntime,
    setSystemRuntime,
  ] = useState<FuelCellData.SystemRuntime>({
    hour: 0,
    minute: 0,
    second: 0,
  })

  useEffect(() => {
    setOutput((o) => o)
    setPowerStack((p) => p)
    setPressure((p) => p)
    setDCDC((d) => d)
    setLoads((l) => l)
    setConcentration((c) => c)
    setTemperature((t) => t)
    setSystemRuntime((s) => s)
  }, [])

  return <div>aaa</div>
}

export default FuelCell
