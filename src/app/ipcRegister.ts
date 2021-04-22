import { app, dialog, ipcMain, IpcMainInvokeEvent, shell } from 'electron'
import fs from 'fs'
import log, { LogLevel } from 'electron-log'
import path from 'path'

import { SaveDataResponse } from '../types'
import { LOG, OPEN_LOG_FOLDER, SAVE_DATA } from '../constant'

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

const handleOpenLogFolder = async () => {
  const logFolder = app.getPath('logs')
  log.info('Open log folder')
  const err = await shell.openPath(logFolder)
  if (err !== '') {
    log.error('Can not open log folder')
  }
}

const handleLog = (
  _event: IpcMainInvokeEvent,
  level: LogLevel,
  text: string
) => {
  log[level](text)
}

export default () => {
  ipcMain.handle(SAVE_DATA, handleSaveDate)
  ipcMain.handle(OPEN_LOG_FOLDER, handleOpenLogFolder)
  ipcMain.handle(LOG, handleLog)
}
