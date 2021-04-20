import { useEffect } from 'react'
import { useColorMode, useMediaQuery } from '@chakra-ui/react'

import store from '../store'
import { IS_USE_SYSTEM_COLOR_MODE } from '../constant'

const useColorSyncSystem = () => {
  const [isSystemDark] = useMediaQuery('(prefers-color-scheme: dark)')
  const { setColorMode } = useColorMode()

  useEffect(() => {
    const isUseSystemColorMode = store.get(IS_USE_SYSTEM_COLOR_MODE)
    if (isUseSystemColorMode) {
      setColorMode(isSystemDark ? 'dark' : 'light')
    }
  }, [isSystemDark])
}

export default useColorSyncSystem
