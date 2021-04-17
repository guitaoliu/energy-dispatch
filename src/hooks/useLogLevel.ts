import { useEffect, useMemo, useState } from 'react'
import ElectronStore from 'electron-store'

import { LogLevel } from 'electron-log'
import log from '../log'

const store = new ElectronStore()

const useLogLevel = () => {
  const logLevelOptions: LogLevel[] = useMemo(
    () => ['error', 'warn', 'info', 'debug'],
    []
  )
  const [logLevel, setLogLevel] = useState<LogLevel>(
    store.get('logLevel', 'info') as LogLevel
  )

  useEffect(() => {
    store.set('logLevel', logLevel)
    log.info(`Log Level was change to ${logLevel}`)
  }, [logLevel])

  return { logLevel, setLogLevel, logLevelOptions }
}

export default useLogLevel
