import { useState, useEffect } from 'react'
import * as csv from 'fast-csv'
import path from 'path'
import fs from 'fs'
import log from '../log'

export type UsbCanDataType = {
  index: number
  time: string
  name: string
  id: number
  type: string
  format: string
  len: number
  data: string
}

const readCsv = (): Promise<UsbCanDataType[]> => {
  const data: UsbCanDataType[] = []
  return new Promise((resolve) =>
    fs
      .createReadStream(path.resolve(__dirname, 'lib', 'data.csv'))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error: any) => log.error(error.message))
      .on('data', (row: UsbCanDataType) => {
        data.push(row)
      })
      .on('end', () => {
        resolve(data)
      })
  )
}

export default () => {
  const [testData, setTestData] = useState<UsbCanDataType[]>([])

  useEffect(() => {
    readCsv()
      // eslint-disable-next-line promise/always-return
      .then((usbCanTestData) => {
        setTestData(usbCanTestData)
      })
      .catch((error) => {
        log.error(error)
      })
  }, [])

  return testData
}
