import ECANVic, {
  CAN_OBJ,
  CanStatus,
  DATA_ARRAY,
  DeviceType,
  getTimingFromBaudRate,
  INIT_CONFIG,
  RESERVED_ARRAY,
} from './eCan'
import { Log } from '../log'

class FuelCellController {
  deviceType: DeviceType

  devIndex: number

  canIndex: number

  log: Log

  interval: NodeJS.Timeout | undefined

  fetchingInterval: number

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

  constructor(
    deviceType = DeviceType.USBCANII,
    devIndex = 0,
    canIndex = 0,
    log: Log,
    fetchingInterval: number
  ) {
    this.deviceType = deviceType
    this.devIndex = devIndex
    this.canIndex = canIndex
    this.log = log
    this.fetchingInterval = fetchingInterval
  }

  async initialize(baudRate: number): Promise<CanStatus> {
    const openStatus = await this.open()
    if (openStatus !== CanStatus.OK) {
      this.log.error('Failed to connect to USB CAN')
    }
    const initStatus = await this.init(baudRate)
    if (initStatus !== CanStatus.OK) {
      this.log.error('Failed to initialize USB CAN')
    }
    const startStatus = await this.start()
    if (startStatus !== CanStatus.OK) {
      this.log.error('Failed to start USB CAN')
    }
    const status = openStatus && initStatus && startStatus
    if (status === CanStatus.OK) {
      this.interval = setInterval(async () => {
        await this.update()
      }, this.fetchingInterval)
      this.log.info('Start fetching data')
    }
    return status
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

  async open(): Promise<CanStatus> {
    return ECANVic.OpenDevice(this.deviceType, this.devIndex, 0)
  }

  async close(): Promise<CanStatus> {
    clearInterval(this.fetchingInterval)
    return ECANVic.CloseDevice(this.deviceType, this.devIndex)
  }

  async init(
    baudRate: number,
    filterEnabled = false,
    accCode = 0x00000000,
    accMask = 0xffffffff,
    mode = 0
  ): Promise<CanStatus> {
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

  async start(): Promise<CanStatus> {
    return ECANVic.StartCAN(this.deviceType, this.devIndex, this.canIndex)
  }

  transmit(
    id: number,
    data: number[],
    sendType = 0,
    remote = false,
    extern = false,
    dataLen = 8
  ) {
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
    ECANVic.Transmit.async(
      this.deviceType,
      this.devIndex,
      this.canIndex,
      canObj.ref(),
      1,
      () => {}
    )
  }

  async receive(id: number, sendType = 0, remote = false, extern = false) {
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
    ECANVic.Receive.async(
      this.deviceType,
      this.devIndex,
      this.canIndex,
      canObjPtr,
      1,
      10,
      async () => {
        await this.parseData(canObjPtr.deref())
      }
    )
  }

  async parseData(canObj: typeof CAN_OBJ): Promise<void> {
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

  async update() {
    await this.receive(0x16)
  }
}

export default FuelCellController
