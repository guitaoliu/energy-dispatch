import { remote } from 'electron'
import fs from 'fs'

export default function saveData(
  data: string,
  title: string,
  defaultPath: string,
): NodeJS.ErrnoException | null {
  remote.dialog
    .showSaveDialog({
      title,
      defaultPath,
      buttonLabel: 'Save',
      filters: [
        {
          name: 'CSV file',
          extensions: ['csv', 'text'],
        },
      ],
      properties: [],
    })
    .then((file) => {
      const saveFilePath = file.filePath?.toString()
      if (saveFilePath !== undefined) {
        fs.writeFile(saveFilePath.toString(), data, (err) => err)
      }
    })
  return null
}
