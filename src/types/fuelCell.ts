/**
 * All data names from fuel cell
 */
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
  | 'DCDCTemperature'
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

/**
 * data type that used to construct table
 */
export type DataRecord = {
  id: number
  source: string
  name: string
  value: number
  unit?: string
}
