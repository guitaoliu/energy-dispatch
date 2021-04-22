import { ipcRenderer } from 'electron'
import { LogLevel } from 'electron-log'

import { LOG } from './constant'

const log = (level: LogLevel) => (text: string) => {
  ipcRenderer.invoke(LOG, level, text)
}

export interface Log {
  info: (text: string) => void
  debug: (text: string) => void
  error: (text: string) => void
  warn: (text: string) => void
}

export default {
  info: log('info'),
  debug: log('debug'),
  error: log('error'),
  warn: log('warn'),
}
