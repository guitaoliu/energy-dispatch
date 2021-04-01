import React, { useState } from 'react'

import { DataRecord } from '../types/fuelCell'

export interface FuelCellData {
  outputVolt: DataRecord
  outputCurrent: DataRecord
  outputPower: DataRecord
  DCDCVolt: DataRecord
  DCDCCurrent: DataRecord
  DCDCPower: DataRecord
  powerStackMinVolt: DataRecord
  powerStackMinNumber: DataRecord
  powerStackMaxVolt: DataRecord
  powerStackMaxNumber: DataRecord
  pressureHydrogen: DataRecord
  pressureCoolingWater: DataRecord
  pressureGas: DataRecord
  pressureMainHydrogenBottle: DataRecord
  pressureAttachedHydrogenBottle: DataRecord
  loadVolt: DataRecord
  loadCurrent: DataRecord
  concentrationSystemRoom: DataRecord
  concentrationHydrogenRoom: DataRecord
  temperatureGasIn: DataRecord
  temperatureGasOut: DataRecord
  temperatureCoolingWaterIn: DataRecord
  temperatureCoolingWaterOut: DataRecord
  temperatureSystemCabinet: DataRecord
  hour: DataRecord
  minute: DataRecord
  second: DataRecord
}

export interface FuelCellSetState {
  setOutputVolt: React.Dispatch<React.SetStateAction<DataRecord>>
  setOutputCurrent: React.Dispatch<React.SetStateAction<DataRecord>>
  setOutputPower: React.Dispatch<React.SetStateAction<DataRecord>>
  setDCDCVolt: React.Dispatch<React.SetStateAction<DataRecord>>
  setDCDCCurrent: React.Dispatch<React.SetStateAction<DataRecord>>
  setDCDCPower: React.Dispatch<React.SetStateAction<DataRecord>>
  setPowerStackMinVolt: React.Dispatch<React.SetStateAction<DataRecord>>
  setPowerStackMinNumber: React.Dispatch<React.SetStateAction<DataRecord>>
  setPowerStackMaxVolt: React.Dispatch<React.SetStateAction<DataRecord>>
  setPowerStackMaxNumber: React.Dispatch<React.SetStateAction<DataRecord>>
  setPressureHydrogen: React.Dispatch<React.SetStateAction<DataRecord>>
  setPressureCoolingWater: React.Dispatch<React.SetStateAction<DataRecord>>
  setPressureGas: React.Dispatch<React.SetStateAction<DataRecord>>
  setPressureMainHydrogenBottle: React.Dispatch<
    React.SetStateAction<DataRecord>
  >
  setPressureAttachedHydrogenBottle: React.Dispatch<
    React.SetStateAction<DataRecord>
  >
  setLoadVolt: React.Dispatch<React.SetStateAction<DataRecord>>
  setLoadCurrent: React.Dispatch<React.SetStateAction<DataRecord>>
  setConcentrationSystemRoom: React.Dispatch<React.SetStateAction<DataRecord>>
  setConcentrationHydrogenRoom: React.Dispatch<React.SetStateAction<DataRecord>>
  setTemperatureGasIn: React.Dispatch<React.SetStateAction<DataRecord>>
  setTemperatureGasOut: React.Dispatch<React.SetStateAction<DataRecord>>
  setTemperatureCoolingWaterIn: React.Dispatch<React.SetStateAction<DataRecord>>
  setTemperatureCoolingWaterOut: React.Dispatch<
    React.SetStateAction<DataRecord>
  >
  setTemperatureSystemCabinet: React.Dispatch<React.SetStateAction<DataRecord>>
  setHour: React.Dispatch<React.SetStateAction<DataRecord>>
  setMinute: React.Dispatch<React.SetStateAction<DataRecord>>
  setSecond: React.Dispatch<React.SetStateAction<DataRecord>>
}

export interface FuelCellStatue {
  states: FuelCellData
  setStates: FuelCellSetState
}

const useFuelCell = (initValue = 0): FuelCellStatue => {
  const [outputVolt, setOutputVolt] = useState<DataRecord>({
    id: 1,
    source: 'Output',
    name: 'Volt',
    value: initValue,
    unit: 'V',
  })
  const [outputCurrent, setOutputCurrent] = useState<DataRecord>({
    id: 2,
    source: 'Output',
    name: 'Current',
    value: initValue,
    unit: 'A',
  })
  const [outputPower, setOutputPower] = useState<DataRecord>({
    id: 3,
    source: 'Output',
    name: 'Power',
    value: initValue,
    unit: 'W',
  })
  const [DCDCVolt, setDCDCVolt] = useState<DataRecord>({
    id: 4,
    source: 'DCDC',
    name: 'Volt',
    value: initValue,
    unit: 'V',
  })
  const [DCDCCurrent, setDCDCCurrent] = useState<DataRecord>({
    id: 5,
    source: 'DCDC',
    name: 'Current',
    value: initValue,
    unit: 'A',
  })
  const [DCDCPower, setDCDCPower] = useState<DataRecord>({
    id: 6,
    source: 'DCDC',
    name: 'Power',
    value: initValue,
    unit: 'W',
  })
  const [powerStackMinVolt, setPowerStackMinVolt] = useState<DataRecord>({
    id: 7,
    source: 'Power Stack',
    name: 'Min Volt',
    value: initValue,
    unit: 'V',
  })
  const [powerStackMinNumber, setPowerStackMinNumber] = useState<DataRecord>({
    id: 8,
    source: 'Power Stack',
    name: 'Min Number',
    value: initValue,
  })
  const [powerStackMaxVolt, setPowerStackMaxVolt] = useState<DataRecord>({
    id: 9,
    source: 'Power Stack',
    name: 'Max Volt',
    value: initValue,
    unit: 'V',
  })
  const [powerStackMaxNumber, setPowerStackMaxNumber] = useState<DataRecord>({
    id: 10,
    source: 'Power Stack',
    name: 'Max Number',
    value: initValue,
  })
  const [pressureHydrogen, setPressureHydrogen] = useState<DataRecord>({
    id: 11,
    source: 'Pressure',
    name: 'Hydrogen',
    value: initValue,
    unit: 'bar',
  })
  const [pressureCoolingWater, setPressureCoolingWater] = useState<DataRecord>({
    id: 12,
    source: 'Pressure',
    name: 'Cooling Water',
    value: initValue,
    unit: 'bar',
  })
  const [pressureGas, setPressureGas] = useState<DataRecord>({
    id: 13,
    source: 'Pressure',
    name: 'Gas',
    value: initValue,
    unit: 'bar',
  })
  const [pressureMainHydrogenBottle, setPressureMainHydrogenBottle] = useState<
    DataRecord
  >({
    id: 14,
    source: 'Pressure',
    name: 'Main Hydrogen Bottle',
    value: initValue,
    unit: 'Mpa',
  })
  const [
    pressureAttachedHydrogenBottle,
    setPressureAttachedHydrogenBottle,
  ] = useState<DataRecord>({
    id: 15,
    source: 'Pressure',
    name: 'Attached Hydrogen Bottle',
    value: initValue,
    unit: 'Mpa',
  })
  const [loadVolt, setLoadVolt] = useState<DataRecord>({
    id: 16,
    source: 'Load',
    name: 'Volt',
    value: initValue,
    unit: 'V',
  })
  const [loadCurrent, setLoadCurrent] = useState<DataRecord>({
    id: 17,
    source: 'Load',
    name: 'Current',
    value: initValue,
    unit: 'A',
  })
  const [concentrationSystemRoom, setConcentrationSystemRoom] = useState<
    DataRecord
  >({
    id: 18,
    source: 'Concentration',
    name: 'System Room',
    value: initValue,
    unit: 'ppm',
  })
  const [concentrationHydrogenRoom, setConcentrationHydrogenRoom] = useState<
    DataRecord
  >({
    id: 19,
    source: 'Concentration',
    name: 'Hydrogen Room',
    value: initValue,
    unit: 'ppm',
  })
  const [temperatureGasIn, setTemperatureGasIn] = useState<DataRecord>({
    id: 20,
    source: 'Temperature',
    name: 'Gas In',
    value: initValue,
    unit: '℃',
  })
  const [temperatureGasOut, setTemperatureGasOut] = useState<DataRecord>({
    id: 21,
    source: 'Temperature',
    name: 'Gas Out',
    value: initValue,
    unit: '℃',
  })
  const [temperatureCoolingWaterIn, setTemperatureCoolingWaterIn] = useState<
    DataRecord
  >({
    id: 22,
    source: 'Temperature',
    name: 'Cooling Water In',
    value: initValue,
    unit: '℃',
  })
  const [temperatureCoolingWaterOut, setTemperatureCoolingWaterOut] = useState<
    DataRecord
  >({
    id: 23,
    source: 'Temperature',
    name: 'Cooling Water Out',
    value: initValue,
    unit: '℃',
  })
  const [temperatureSystemCabinet, setTemperatureSystemCabinet] = useState<
    DataRecord
  >({
    id: 24,
    source: 'Temperature',
    name: 'System Cabinet',
    value: initValue,
    unit: '℃',
  })
  const [hour, setHour] = useState<DataRecord>({
    id: 25,
    source: 'Up Time',
    name: 'hour',
    value: initValue,
  })
  const [minute, setMinute] = useState<DataRecord>({
    id: 26,
    source: 'Up Time',
    name: 'minute',
    value: initValue,
  })
  const [second, setSecond] = useState<DataRecord>({
    id: 27,
    source: 'Up Time',
    name: 'minute',
    value: initValue,
  })
  return {
    states: {
      outputPower,
      outputCurrent,
      outputVolt,

      DCDCCurrent,
      DCDCVolt,
      DCDCPower,

      powerStackMaxNumber,
      powerStackMaxVolt,
      powerStackMinVolt,
      powerStackMinNumber,

      pressureAttachedHydrogenBottle,
      pressureCoolingWater,
      pressureGas,
      pressureHydrogen,
      pressureMainHydrogenBottle,

      loadCurrent,
      loadVolt,

      concentrationSystemRoom,
      concentrationHydrogenRoom,

      temperatureCoolingWaterIn,
      temperatureCoolingWaterOut,
      temperatureGasIn,
      temperatureGasOut,
      temperatureSystemCabinet,

      hour,
      minute,
      second,
    },
    setStates: {
      setOutputPower,
      setOutputCurrent,
      setOutputVolt,

      setDCDCPower,
      setDCDCCurrent,
      setDCDCVolt,

      setPowerStackMaxNumber,
      setPowerStackMaxVolt,
      setPowerStackMinVolt,
      setPowerStackMinNumber,

      setPressureAttachedHydrogenBottle,
      setPressureCoolingWater,
      setPressureGas,
      setPressureHydrogen,
      setPressureMainHydrogenBottle,

      setLoadCurrent,
      setLoadVolt,

      setConcentrationSystemRoom,
      setConcentrationHydrogenRoom,

      setTemperatureCoolingWaterIn,
      setTemperatureCoolingWaterOut,
      setTemperatureGasIn,
      setTemperatureGasOut,
      setTemperatureSystemCabinet,

      setHour,
      setMinute,
      setSecond,
    },
  }
}

export default useFuelCell
