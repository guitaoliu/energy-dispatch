import { useEffect, useMemo } from 'react'
import { ipcRenderer } from 'electron'

import { LogLevel } from 'electron-log'
import { CHANGE_LOG_LEVEL, LOG_LEVEL } from '../constant'
import useStore from './useStore'

const useLogLevel = () => {
  const logLevelOptions: LogLevel[] = useMemo(
    () => ['error', 'warn', 'info', 'debug'],
    []
  )
  const [logLevel, setLogLevel] = useStore<string>(LOG_LEVEL, 'info')

  useEffect(() => {
    ipcRenderer.invoke(CHANGE_LOG_LEVEL, logLevel)
  }, [logLevel])

  return { logLevel, setLogLevel, logLevelOptions }
}

export default useLogLevel
