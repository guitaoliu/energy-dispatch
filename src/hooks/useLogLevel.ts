import { useEffect, useMemo, useState } from 'react'

import { LogLevel } from 'electron-log'
import log from '../log'
import { LOG_LEVEL } from '../constant'
import store from '../store'

const useLogLevel = () => {
  const logLevelOptions: LogLevel[] = useMemo(
    () => ['error', 'warn', 'info', 'debug'],
    []
  )
  const [logLevel, setLogLevel] = useState<LogLevel>(
    store.get(LOG_LEVEL, 'info') as LogLevel
  )

  useEffect(() => {
    store.set(LOG_LEVEL, logLevel)
    log.info(`Log Level was change to ${logLevel}`)
  }, [logLevel])

  return { logLevel, setLogLevel, logLevelOptions }
}

export default useLogLevel
