import { useEffect, useState } from 'react'
import ElectronStore from 'electron-store'
import { DeviceType } from '../utils/eCan'

const store = new ElectronStore()

const useUsbCan = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>(
    store.get('deviceType', DeviceType.USBCANI) as DeviceType
  )
  const [deviceIndex, setDeviceIndex] = useState<number>(
    store.get('deviceIndex', 0) as number
  )
  const [baudRate, setBaudRate] = useState<number>(
    store.get('baudRate', 500) as number
  )
  const [fetchingInterval, setFetchingInterval] = useState<number>(
    store.get('fetchingInterval', 100) as number
  )

  useEffect(() => {
    store.set('deviceType', deviceType)
  }, [deviceType])

  useEffect(() => {
    store.set('deviceIndex', deviceIndex)
  }, [deviceIndex])

  useEffect(() => {
    store.set('baudRate', baudRate)
  }, [baudRate])

  useEffect(() => {
    store.set('fetchingInterval', fetchingInterval)
  }, [fetchingInterval])

  return {
    deviceType,
    deviceIndex,
    baudRate,
    fetchingInterval,
    setDeviceType,
    setDeviceIndex,
    setBaudRate,
    setFetchingInterval,
  }
}

export default useUsbCan
