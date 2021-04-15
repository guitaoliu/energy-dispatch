import ECANVic, {
  INIT_CONFIG,
  CAN_OBJ,
  DATA_ARRAY,
  RESERVED_ARRAY,
} from './eCan'

/**
 * return result of most ECANVic functions
 */

export enum CanStatus {
  ERR = 0,
  OK = 1,
}

/**
 * Used in ECANVic related controlling functions
 */
export enum DeviceType {
  USBCANI = 3,
  USBCANII = 4,
}

/**
 * Timing0 and Timing1
 */
export interface Timing {
  timing0: number
  timing1: number
}

/**
 * convert baud rate into timing of CAN_OBJ struct
 * @param baudRate target baud rate
 * @returns converted timing0 and timing1
 */
export const getTimingFromBaudRate = (baudRate: number): Timing => {
  switch (baudRate) {
    case 50000:
      return {
        timing0: 0xbf,
        timing1: 0xff,
      }
    case 100000:
      return {
        timing0: 0x31,
        timing1: 0x1c,
      }
    case 200000:
      return {
        timing0: 0x18,
        timing1: 0x1c,
      }
    case 400000:
      return {
        timing0: 0x87,
        timing1: 0xff,
      }
    case 500000:
      return {
        timing0: 0x09,
        timing1: 0x1c,
      }
    case 800000:
      return {
        timing0: 0x83,
        timing1: 0xff,
      }
    case 1000000:
      return {
        timing0: 0x04,
        timing1: 0x1c,
      }
    case 1250000:
      return {
        timing0: 0x03,
        timing1: 0x1c,
      }
    case 2000000:
      return {
        timing0: 0x81,
        timing1: 0xfa,
      }
    case 2500000:
      return {
        timing0: 0x01,
        timing1: 0x1c,
      }
    case 4000000:
      return {
        timing0: 0x80,
        timing1: 0xfa,
      }
    case 5000000:
      return {
        timing0: 0x00,
        timing1: 0x1c,
      }
    case 6660000:
      return {
        timing0: 0x80,
        timing1: 0xb6,
      }
    case 8000000:
      return {
        timing0: 0x00,
        timing1: 0x16,
      }
    case 10000000:
      return {
        timing0: 0x00,
        timing1: 0x14,
      }
    default:
      return {
        timing0: 0x00,
        timing1: 0x00,
      }
  }
}

export default class FuelCellController {
  deviceType: DeviceType

  devIndex: number

  canIndex: number

  outputVolt = 0

  outputCurrent = 0

  outputPower = 0

  dcdcVolt = 0

  dcdcCurrent = 0

  dcdcPower = 0

  dcdcTemperature = 0

  powerStackMinVolt = 0

  powerStackMaxVolt = 0

  powerStackMinNumber = 0

  powerStackMaxNumber = 0

  pressureHydrogen = 0

  pressureCoolingWater = 0

  pressureGas = 0

  pressureMainHydrogenBottle = 0

  pressureAttachedHydrogenBottle = 0

  loadVolt = 0

  loadCurrent = 0

  concentrationSystemRoom = 0

  concentrationHydrogenRoom = 0

  temperatureGasIn = 0

  temperatureGasOut = 0

  temperatureCoolingWaterIn = 0

  temperatureCoolingWaterOut = 0

  temperatureSystemCabinet = 0

  hour = 0

  minute = 0

  second = 0

  power = 0

  isStart = false

  constructor(deviceType = DeviceType.USBCANII, devIndex = 0, canIndex = 0) {
    this.deviceType = deviceType
    this.devIndex = devIndex
    this.canIndex = canIndex
  }

  changeStatus(power: number, isStart: boolean) {
    const data = [
      isStart ? 1 : 0,
      // eslint-disable-next-line no-bitwise
      power & 0x000000ff,
      // eslint-disable-next-line no-bitwise
      (power & 0x0000ff00) >> 8,
      0,
      0,
      0,
      0,
      0,
    ]
    this.transmit(0x104, data)
  }

  open(): CanStatus {
    return ECANVic.OpenDevice(this.deviceType, this.devIndex, 0)
  }

  close(): CanStatus {
    return ECANVic.CloseDevice(this.deviceType, this.devIndex)
  }

  init(
    baudRate: number,
    filterEnabled = false,
    accCode = 0x00000000,
    accMask = 0xffffffff,
    mode = 0
  ): CanStatus {
    const { timing0, timing1 } = getTimingFromBaudRate(baudRate)
    const initConfig = new INIT_CONFIG({
      AccCode: accCode,
      AccMask: accMask,
      Reserved: 0,
      Filter: filterEnabled ? 1 : 0,
      Timing0: timing0,
      Timing1: timing1,
      Mode: mode,
    })
    return ECANVic.InitCAN(
      this.deviceType,
      this.devIndex,
      this.canIndex,
      initConfig.ref()
    )
  }

  start(): CanStatus {
    return ECANVic.StartCAN(this.deviceType, this.devIndex, this.canIndex)
  }

  transmit(
    id: number,
    data: number[],
    sendType = 0,
    remote = false,
    extern = false,
    dataLen = 8
  ): number {
    const reserved = new RESERVED_ARRAY([0, 0, 0])
    const dataArray = new DATA_ARRAY(data)
    const canObj = new CAN_OBJ({
      ID: id,
      SendType: sendType,
      RemoteFlag: remote ? 1 : 0,
      ExternFlag: extern ? 1 : 0,
      DataLen: dataLen,
      Data: dataArray,
      Reserved: reserved,
    })
    return ECANVic.Transmit(
      this.deviceType,
      this.devIndex,
      this.canIndex,
      canObj.ref(),
      1
    )
  }

  receive(id: number, sendType = 0, remote = false, extern = false): number {
    const reserved = new RESERVED_ARRAY([0, 0, 0])
    const data = new DATA_ARRAY([0, 0, 0, 0, 0, 0, 0, 0])
    const canObj = new CAN_OBJ({
      ID: id,
      SendType: sendType,
      RemoteFlag: remote ? 1 : 0,
      ExternFlag: extern ? 1 : 0,
      DataLen: data.length,
      Data: data,
      Reserved: reserved,
    })
    const canObjPtr = canObj.ref()
    const len = ECANVic.Receive(
      this.deviceType,
      this.devIndex,
      this.canIndex,
      canObjPtr,
      1,
      10
    )
    this.parseData(canObjPtr.deref())
    return len
  }

  parseData(canObj: typeof CAN_OBJ): void {
    const data = canObj.Data
    switch (canObj.ID) {
      case 0x401:
        this.outputVolt = (data[0] + data[1] * 256) * 0.1
        this.outputCurrent = (data[2] + data[3] * 256) * 0.1 - 350
        this.outputPower = data[4] + data[5] * 256
        break
      case 0x402:
        this.powerStackMinVolt = data[0] * 0.01
        this.powerStackMinNumber = data[1] * 1
        this.powerStackMaxVolt = data[2] * 0.01
        this.powerStackMaxNumber = data[3] * 1
        break
      case 0x403:
        this.pressureGas = (data[0] + data[1] * 256) * 0.001
        this.pressureCoolingWater = (data[2] + data[3] * 256) * 0.001
        this.temperatureSystemCabinet = (data[4] + data[5] * 256) * 0.1 - 55
        this.pressureGas = (data[6] + data[7] * 256) * 0.001
        break
      case 0x404:
        this.temperatureGasIn = (data[0] + data[1] * 256) * 0.1 - 55
        this.temperatureGasOut = (data[2] + data[3] * 256) * 0.1 - 55
        this.temperatureCoolingWaterIn = (data[4] + data[5] * 256) * 0.1 - 55
        this.temperatureCoolingWaterOut = (data[6] + data[7] * 256) * 0.1 - 55
        break
      case 0x405:
        this.loadVolt = (data[4] + data[5] * 256) * 0.1
        this.loadCurrent = (data[6] + data[7] * 256) * 0.1 - 300
        break
      case 0x406:
        this.pressureMainHydrogenBottle = (data[0] + data[1] * 256) * 0.01
        this.pressureAttachedHydrogenBottle = (data[2] + data[3] * 256) * 0.01
        this.concentrationSystemRoom = data[4] + data[5] * 256
        this.concentrationHydrogenRoom = data[6] + data[7] * 256
        break
      case 0x407:
        this.hour = data[0] * 1
        this.minute = data[1] * 1
        this.second = data[2] * 1
        break
      case 0x408:
        this.dcdcVolt = (data[0] + data[1] * 256) * 0.1
        this.dcdcCurrent = (data[2] + data[3] * 256) * 0.1 - 300
        this.dcdcPower = data[4] + data[5] * 256
        this.dcdcTemperature = (data[6] + data[7] * 256) * 0.1 - 55
        break
      default:
        break
    }
  }

  update(): CanStatus {
    const rec = this.receive(0x16)
    if (rec) {
      return CanStatus.ERR
    }
    return CanStatus.OK
  }
}
