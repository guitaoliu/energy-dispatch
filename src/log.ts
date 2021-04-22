import { ipcRenderer } from 'electron'
import { LogLevel } from 'electron-log'

import { LOG } from './constant'

/**
 * write log with ipcRenderer
 * @param level log level
 */
const log = (level: LogLevel) => (text: string) => {
  ipcRenderer.invoke(LOG, level, text)
}

/**
 * Log precess interface
 */
export interface Log {
  info: (text: string) => void
  debug: (text: string) => void
  error: (text: string) => void
  warn: (text: string) => void
}

/**
 * functions for different log level
 */
export default {
  info: log('info'),
  debug: log('debug'),
  error: log('error'),
  warn: log('warn'),
}
