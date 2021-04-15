import React, { useEffect, useMemo, useState } from 'react'

import { DataRecord } from '../types/fuelCell'
import FuelCellController, { CanStatus, DeviceType } from '../utils/fuelCell'

export interface FuelCellData {
  outputVolt: DataRecord
  outputCurrent: DataRecord
  outputPower: DataRecord
  DCDCVolt: DataRecord
  DCDCCurrent: DataRecord
  DCDCPower: DataRecord
  DCDCTemperature: DataRecord
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

export interface FuelCellStatue {
  states: FuelCellData
  err: CanStatus
  baudRate: number
  setBaudRate: React.Dispatch<React.SetStateAction<number>>
  isUpdating: boolean
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
  isWork: boolean
  setIsWork: React.Dispatch<React.SetStateAction<boolean>>
  power: number
  setPower: React.Dispatch<React.SetStateAction<number>>
  deviceType: DeviceType
  setDeviceType: React.Dispatch<React.SetStateAction<DeviceType>>
}

const useFuelCell = (initValue = 0, interval = 50): FuelCellStatue => {
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
  const [DCDCTemperature, setDCDCTemperature] = useState<DataRecord>({
    id: 7,
    source: 'DCDC',
    name: 'Temperature',
    value: initValue,
    unit: '℃',
  })
  const [powerStackMinVolt, setPowerStackMinVolt] = useState<DataRecord>({
    id: 8,
    source: 'Power Stack',
    name: 'Min Volt',
    value: initValue,
    unit: 'V',
  })
  const [powerStackMinNumber, setPowerStackMinNumber] = useState<DataRecord>({
    id: 9,
    source: 'Power Stack',
    name: 'Min Number',
    value: initValue,
  })
  const [powerStackMaxVolt, setPowerStackMaxVolt] = useState<DataRecord>({
    id: 10,
    source: 'Power Stack',
    name: 'Max Volt',
    value: initValue,
    unit: 'V',
  })
  const [powerStackMaxNumber, setPowerStackMaxNumber] = useState<DataRecord>({
    id: 11,
    source: 'Power Stack',
    name: 'Max Number',
    value: initValue,
  })
  const [pressureHydrogen, setPressureHydrogen] = useState<DataRecord>({
    id: 12,
    source: 'Pressure',
    name: 'Hydrogen',
    value: initValue,
    unit: 'bar',
  })
  const [pressureCoolingWater, setPressureCoolingWater] = useState<DataRecord>({
    id: 13,
    source: 'Pressure',
    name: 'Cooling Water',
    value: initValue,
    unit: 'bar',
  })
  const [pressureGas, setPressureGas] = useState<DataRecord>({
    id: 14,
    source: 'Pressure',
    name: 'Gas',
    value: initValue,
    unit: 'bar',
  })
  const [pressureMainHydrogenBottle, setPressureMainHydrogenBottle] = useState<
    DataRecord
  >({
    id: 15,
    source: 'Pressure',
    name: 'Main Hydrogen Bottle',
    value: initValue,
    unit: 'Mpa',
  })
  const [
    pressureAttachedHydrogenBottle,
    setPressureAttachedHydrogenBottle,
  ] = useState<DataRecord>({
    id: 16,
    source: 'Pressure',
    name: 'Attached Hydrogen Bottle',
    value: initValue,
    unit: 'Mpa',
  })
  const [loadVolt, setLoadVolt] = useState<DataRecord>({
    id: 17,
    source: 'Load',
    name: 'Volt',
    value: initValue,
    unit: 'V',
  })
  const [loadCurrent, setLoadCurrent] = useState<DataRecord>({
    id: 18,
    source: 'Load',
    name: 'Current',
    value: initValue,
    unit: 'A',
  })
  const [concentrationSystemRoom, setConcentrationSystemRoom] = useState<
    DataRecord
  >({
    id: 19,
    source: 'Concentration',
    name: 'System Room',
    value: initValue,
    unit: 'ppm',
  })
  const [concentrationHydrogenRoom, setConcentrationHydrogenRoom] = useState<
    DataRecord
  >({
    id: 20,
    source: 'Concentration',
    name: 'Hydrogen Room',
    value: initValue,
    unit: 'ppm',
  })
  const [temperatureGasIn, setTemperatureGasIn] = useState<DataRecord>({
    id: 21,
    source: 'Temperature',
    name: 'Gas In',
    value: initValue,
    unit: '℃',
  })
  const [temperatureGasOut, setTemperatureGasOut] = useState<DataRecord>({
    id: 22,
    source: 'Temperature',
    name: 'Gas Out',
    value: initValue,
    unit: '℃',
  })
  const [temperatureCoolingWaterIn, setTemperatureCoolingWaterIn] = useState<
    DataRecord
  >({
    id: 23,
    source: 'Temperature',
    name: 'Cooling Water In',
    value: initValue,
    unit: '℃',
  })
  const [temperatureCoolingWaterOut, setTemperatureCoolingWaterOut] = useState<
    DataRecord
  >({
    id: 24,
    source: 'Temperature',
    name: 'Cooling Water Out',
    value: initValue,
    unit: '℃',
  })
  const [temperatureSystemCabinet, setTemperatureSystemCabinet] = useState<
    DataRecord
  >({
    id: 25,
    source: 'Temperature',
    name: 'System Cabinet',
    value: initValue,
    unit: '℃',
  })
  const [hour, setHour] = useState<DataRecord>({
    id: 26,
    source: 'Up Time',
    name: 'hour',
    value: initValue,
  })
  const [minute, setMinute] = useState<DataRecord>({
    id: 27,
    source: 'Up Time',
    name: 'minute',
    value: initValue,
  })
  const [second, setSecond] = useState<DataRecord>({
    id: 28,
    source: 'Up Time',
    name: 'minute',
    value: initValue,
  })

  // Setting control
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [isWork, setIsWork] = useState<boolean>(false)
  const [baudRate, setBaudRate] = useState<number>(500000)
  const [power, setPower] = useState<number>(500)
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.USBCANII)

  // Error
  const [err, setErr] = useState<CanStatus>(CanStatus.OK)

  const FCController = useMemo(
    () => new FuelCellController(DeviceType.USBCANII),
    []
  )

  const updateState = () => {
    FCController.update()
    setOutputCurrent((prevState) => ({
      ...prevState,
      value: FCController.outputCurrent,
    }))
    setOutputPower((prevState) => ({
      ...prevState,
      value: FCController.outputPower,
    }))
    setOutputVolt((prevState) => ({
      ...prevState,
      value: FCController.outputVolt,
    }))
    setDCDCVolt((prevState) => ({
      ...prevState,
      value: FCController.dcdcVolt,
    }))
    setDCDCCurrent((prevState) => ({
      ...prevState,
      value: FCController.dcdcCurrent,
    }))
    setDCDCPower((prevState) => ({
      ...prevState,
      value: FCController.dcdcVolt,
    }))
    setDCDCTemperature((prevState) => ({
      ...prevState,
      value: FCController.dcdcTemperature,
    }))
    setPowerStackMaxNumber((prevState) => ({
      ...prevState,
      value: FCController.powerStackMaxNumber,
    }))
    setPowerStackMaxVolt((prevState) => ({
      ...prevState,
      value: FCController.powerStackMaxVolt,
    }))
    setPowerStackMinNumber((prevState) => ({
      ...prevState,
      value: FCController.powerStackMinNumber,
    }))
    setPowerStackMinVolt((prevState) => ({
      ...prevState,
      value: FCController.powerStackMinVolt,
    }))
    setConcentrationHydrogenRoom((prevState) => ({
      ...prevState,
      value: FCController.concentrationHydrogenRoom,
    }))
    setConcentrationSystemRoom((prevState) => ({
      ...prevState,
      value: FCController.concentrationSystemRoom,
    }))
    setPressureMainHydrogenBottle((prevState) => ({
      ...prevState,
      value: FCController.pressureMainHydrogenBottle,
    }))
    setPressureAttachedHydrogenBottle((prevState) => ({
      ...prevState,
      value: FCController.pressureAttachedHydrogenBottle,
    }))
    setPressureCoolingWater((prevState) => ({
      ...prevState,
      value: FCController.pressureCoolingWater,
    }))
    setPressureGas((prevState) => ({
      ...prevState,
      value: FCController.pressureGas,
    }))
    setPressureHydrogen((prevState) => ({
      ...prevState,
      value: FCController.pressureHydrogen,
    }))
    setLoadCurrent((prevState) => ({
      ...prevState,
      value: FCController.loadCurrent,
    }))
    setLoadVolt((prevState) => ({
      ...prevState,
      value: FCController.loadVolt,
    }))
    setTemperatureCoolingWaterIn((prevState) => ({
      ...prevState,
      value: FCController.temperatureCoolingWaterIn,
    }))
    setTemperatureCoolingWaterOut((prevState) => ({
      ...prevState,
      value: FCController.temperatureCoolingWaterOut,
    }))
    setTemperatureGasIn((prevState) => ({
      ...prevState,
      value: FCController.temperatureGasIn,
    }))
    setTemperatureGasOut((prevState) => ({
      ...prevState,
      value: FCController.temperatureGasOut,
    }))
    setTemperatureSystemCabinet((prevState) => ({
      ...prevState,
      value: FCController.temperatureSystemCabinet,
    }))
    setHour((prevState) => ({
      ...prevState,
      value: FCController.hour,
    }))
    setMinute((prevState) => ({
      ...prevState,
      value: FCController.minute,
    }))
    setSecond((prevState) => ({
      ...prevState,
      value: FCController.second,
    }))
  }

  // Initialize CAN bus while rendering the page
  useEffect(() => {
    const errStart =
      FCController.open() && FCController.init(baudRate) && FCController.start()
    setErr(errStart)
    return () => {
      FCController.close()
    }
  }, [])

  // Listen to demand power and start state change
  useEffect(() => {
    FCController.changeStatus(power, isWork)
  }, [isWork])

  // Set interval for update states
  useEffect(() => {
    const update = setInterval(() => {
      if (isUpdating) {
        updateState()
      }
    }, interval)
    return () => clearInterval(update)
  }, [isUpdating])

  // Listen to device type change
  useEffect(() => {
    FCController.deviceType = deviceType
  }, [deviceType])

  return {
    states: {
      outputPower,
      outputCurrent,
      outputVolt,

      DCDCCurrent,
      DCDCVolt,
      DCDCPower,
      DCDCTemperature,

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
    err,
    baudRate,
    setBaudRate,
    isUpdating,
    setIsUpdating,
    isWork,
    setIsWork,
    power,
    setPower,
    deviceType,
    setDeviceType,
  }
}

export default useFuelCell
