import { useEffect, useState } from 'react'

import { DeviceType } from '../utils/eCan'
import store from '../store'
import {
  DEVICE_TYPE,
  DEVICE_INDEX,
  BAUD_RATE,
  FETCHING_INTERVAL,
  CAN_INDEX,
} from '../constant'

const useUsbCan = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(
    store.get(DEVICE_TYPE, DeviceType.USBCANI) as DeviceType
  )
  const [deviceIndex, setDeviceIndex] = useState<number>(
    store.get(DEVICE_INDEX, 0) as number
  )
  const [canIndex, setCanIndex] = useState<number>(
    store.get(CAN_INDEX, 0) as number
  )
  const [baudRate, setBaudRate] = useState<number>(
    store.get(BAUD_RATE, 500) as number
  )
  const [fetchingInterval, setFetchingInterval] = useState<number>(
    store.get(FETCHING_INTERVAL, 100) as number
  )

  useEffect(() => {
    store.set(DEVICE_TYPE, deviceType)
  }, [deviceType])

  useEffect(() => {
    store.set(DEVICE_INDEX, deviceIndex)
  }, [deviceIndex])

  useEffect(() => {
    store.set(CAN_INDEX, canIndex)
  }, [canIndex])

  useEffect(() => {
    store.set(BAUD_RATE, baudRate)
  }, [baudRate])

  useEffect(() => {
    store.set(FETCHING_INTERVAL, fetchingInterval)
  }, [fetchingInterval])

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
