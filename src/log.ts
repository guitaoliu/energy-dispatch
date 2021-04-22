import { ipcRenderer } from 'electron'
import { LogLevel } from 'electron-log'

import { LOG } from './constant'

const log = (level: LogLevel) => (text: string) => {
  ipcRenderer.invoke(LOG, level, text)
}

export default {
  info: log('info'),
  debug: log('debug'),
  error: log('error'),
  warn: log('warn'),
}
