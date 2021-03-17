export type CellOutputVolt = number
export type CellOutputCurrent = number
export type CellOutputPower = number
export type PowerStackMinVolt = number
export type PowerStackMinNumber = number
export type PowerStackMaxVolt = number
export type PowerStackMaxNumber = number
export type PressureHydrogen = number
export type PressureCoolingWater = number
export type PressureGas = number
export type PressureMainHydrogenBottle = number
export type PressureAttachedHydrogenBottle = number
export type DCDCVolt = number
export type DCDCCurrent = number
export type DCDCPower = number
export type LoadVolt = number
export type LoadCurrent = number
export type ConcentrationSystemRoom = number
export type ConcentrationHydrogenRoom = number
export type TemperatureGasIn = number
export type TemperatureGasOut = number
export type TemperatureCoolingWaterIn = number
export type TemperatureCoolingWaterOut = number
export type TemperatureSystemCabinet = number
export type TemperatureDCDC = number
export type SystemRuntimeHour = number
export type SystemRuntimeMinute = number
export type SystemRuntimeSecond = number

export type FuelCellData =
  | CellOutputVolt
  | CellOutputCurrent
  | CellOutputPower
  | PowerStackMinVolt
  | PowerStackMinNumber
  | PowerStackMaxVolt
  | PowerStackMaxNumber
  | PressureHydrogen
  | PressureCoolingWater
  | PressureGas
  | PressureMainHydrogenBottle
  | PressureAttachedHydrogenBottle
  | DCDCVolt
  | DCDCCurrent
  | DCDCPower
  | LoadVolt
  | LoadCurrent
  | ConcentrationSystemRoom
  | ConcentrationHydrogenRoom
  | TemperatureGasIn
  | TemperatureGasOut
  | TemperatureCoolingWaterIn
  | TemperatureCoolingWaterOut
  | TemperatureSystemCabinet
  | TemperatureDCDC
  | SystemRuntimeHour
  | SystemRuntimeMinute
  | SystemRuntimeSecond

export interface DataRecord {
  id: number
  name: string
  value: FuelCellData
  unit?: string
}
