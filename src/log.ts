import { ipcRenderer } from 'electron'
import { LogLevel } from 'electron-log'

const log = (level: LogLevel) => (text: string) => {
  ipcRenderer.invoke('log', level, text)
}

export default {
  info: log('info'),
  debug: log('debug'),
  error: log('error'),
  warn: log('warn'),
}
