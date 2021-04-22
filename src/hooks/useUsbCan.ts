import useStore from './useStore'

import { DeviceType } from '../utils/eCan'
import {
  DEVICE_TYPE,
  DEVICE_INDEX,
  BAUD_RATE,
  FETCHING_INTERVAL,
  CAN_INDEX,
} from '../constant'

const useUsbCan = () => {
  const [deviceType, setDeviceType] = useStore<DeviceType>(
    DEVICE_TYPE,
    DeviceType.USBCANI
  )
  const [deviceIndex, setDeviceIndex] = useStore<number>(DEVICE_INDEX, 0)
  const [canIndex, setCanIndex] = useStore<number>(CAN_INDEX, 0)
  const [baudRate, setBaudRate] = useStore<number>(BAUD_RATE, 500)
  const [fetchingInterval, setFetchingInterval] = useStore<number>(
    FETCHING_INTERVAL,
    100
  )

  return {
    deviceType,
    deviceIndex,
    canIndex,
    baudRate,
    fetchingInterval,
    setDeviceType,
    setDeviceIndex,
    setCanIndex,
    setBaudRate,
    setFetchingInterval,
  }
}

export default useUsbCan
