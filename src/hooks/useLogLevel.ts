import { useMemo } from 'react'

import { LogLevel } from 'electron-log'
import { LOG_LEVEL } from '../constant'
import useStore from './useStore'

const useLogLevel = () => {
  const logLevelOptions: LogLevel[] = useMemo(
    () => ['error', 'warn', 'info', 'debug'],
    []
  )
  const [logLevel, setLogLevel] = useStore<string>(LOG_LEVEL, 'info')

  return { logLevel, setLogLevel, logLevelOptions }
}

export default useLogLevel
