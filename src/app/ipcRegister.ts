import { app, dialog, ipcMain, IpcMainInvokeEvent, shell } from 'electron'
import fs from 'fs'
import log, { LogLevel } from 'electron-log'
import path from 'path'
import readLastLines from 'read-last-lines'

import { Log, SaveDataResponse } from '../types'
import { LOG, OPEN_LOG_FOLDER, READ_LATEST_LOGS, SAVE_DATA } from '../constant'

/**
 * save data to designated file path
 * @param _event IpcMainInvokeEvent
 * @param title popup windows title
 * @param data data to save
 */
const handleSaveDate = async (
  _event: IpcMainInvokeEvent,
  title: string,
  data: string
): Promise<SaveDataResponse | undefined> => {
  const homeDir = app.getPath('home')
  const file = await dialog.showSaveDialog({
    title,
    defaultPath: homeDir,
    buttonLabel: 'Save',
    filters: [
      {
        name: 'JSON file',
        extensions: ['json', 'text'],
      },
    ],
    properties: [],
  })
  const filePath = file.filePath ?? ''
  try {
    await fs.promises.writeFile(filePath, data)
    log.info(`Save file to ${path}`)
    return {
      path: filePath,
      msg: 'success',
    }
  } catch (e) {
    return {
      path: filePath,
      msg: 'error',
    }
  }
}

/**
 * open log folder with shell module
 */
const handleOpenLogFolder = async () => {
  const logFolder = app.getPath('logs')
  log.info('Open log folder')
  const err = await shell.openPath(logFolder)
  if (err !== '') {
    log.error('Can not open log folder')
  }
}

/**
 * write log in render process
 * @param _event IpcMainInvokeEvent
 * @param level log level
 * @param text log content
 */
const handleLog = (
  _event: IpcMainInvokeEvent,
  level: LogLevel,
  text: string
) => {
  log[level](text)
}

/**
 * read log file last lines
 * @param _event IpcMainInvokeEvent
 * @param lineCount read lines
 */
const handleReadLastLogs = async (
  _event: IpcMainInvokeEvent,
  lineCount: number
): Promise<Log[]> => {
  const logFolder = app.getPath('logs')
  const logFile = path.join(logFolder, 'main.log')
  let lines = ['']
  try {
    lines = (await readLastLines.read(logFile, lineCount)).split(/\n/)
    lines.pop()
  } catch {
    log.error("Log file doesn't exist")
  }
  return lines
    .map(
      (line, idx): Log => {
        const pos = line.indexOf(' ', 26)
        return {
          id: idx,
          level: line.slice(27, pos - 1),
          content: line.slice(33),
          time: line.slice(1, 24),
        }
      }
    )
    .reverse()
}

/**
 * register ipc handlers
 */
export default () => {
  ipcMain.handle(SAVE_DATA, handleSaveDate)
  ipcMain.handle(OPEN_LOG_FOLDER, handleOpenLogFolder)
  ipcMain.handle(LOG, handleLog)
  ipcMain.handle(READ_LATEST_LOGS, handleReadLastLogs)
}
