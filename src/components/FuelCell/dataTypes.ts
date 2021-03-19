export type FuelCellData =
  | 'CellOutputVolt'
  | 'CellOutputCurrent'
  | 'CellOutputPower'
  | 'PowerStackMinVolt'
  | 'PowerStackMinNumber'
  | 'PowerStackMaxVolt'
  | 'PowerStackMaxNumber'
  | 'PressureHydrogen'
  | 'PressureCoolingWater'
  | 'PressureGas'
  | 'PressureMainHydrogenBottle'
  | 'PressureAttachedHydrogenBottle'
  | 'DCDCVolt'
  | 'DCDCCurrent'
  | 'DCDCPower'
  | 'LoadVolt'
  | 'LoadCurrent'
  | 'ConcentrationSystemRoom'
  | 'ConcentrationHydrogenRoom'
  | 'TemperatureGasIn'
  | 'TemperatureGasOut'
  | 'TemperatureCoolingWaterIn'
  | 'TemperatureCoolingWaterOut'
  | 'TemperatureSystemCabinet'
  | 'TemperatureDCDC'
  | 'SystemRuntimeHour'
  | 'SystemRuntimeMinute'
  | 'SystemRuntimeSecond'

export interface DataRecord {
  id: number
  name: string
  value: number
  unit?: string
}
