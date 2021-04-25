import ElectronStore from 'electron-store'
import log, { LogLevel } from 'electron-log'
import { LOG_LEVEL } from '../constant'

const store = new ElectronStore()

export const setLogLevel = () => {
  const logLevel = store.get(LOG_LEVEL, 'info') as LogLevel
  log.info(`Read log level as ${logLevel}`)
  log.transports.file.level = logLevel
  log.info(`Set log level to ${logLevel}`)
}

export default { setLogLevel }
