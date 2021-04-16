import { useEffect } from 'react'
import { useColorMode, useMediaQuery } from '@chakra-ui/react'

import ElectronStore from 'electron-store'

const store = new ElectronStore()

const useColorSyncSystem = () => {
  const [isSystemDark] = useMediaQuery('(prefers-color-scheme: dark)')
  const { setColorMode } = useColorMode()

  useEffect(() => {
    const isUseSystemColorMode = store.get('useSystemColorMode')
    if (isUseSystemColorMode) {
      setColorMode(isSystemDark ? 'dark' : 'light')
    }
  }, [isSystemDark])
}

export default useColorSyncSystem
