import { remote } from 'electron'
import fs from 'fs'

export default (
  data: string,
  title: string,
  defaultPath: string
): NodeJS.ErrnoException | null => {
  remote.dialog
    .showSaveDialog({
      title,
      defaultPath,
      buttonLabel: 'Save',
      filters: [
        {
          name: 'JSON file',
          extensions: ['json', 'text'],
        },
      ],
      properties: [],
    })
    .then((file) => {
      const saveFilePath = file.filePath?.toString()
      if (saveFilePath !== undefined) {
        fs.writeFile(saveFilePath.toString(), data, (err) => err)
        return null
      }
      throw new Error('Cannot save to selected path')
    })
    .catch((err) => {
      return err
    })
  return null
}
