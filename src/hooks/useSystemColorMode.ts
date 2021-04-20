import { useEffect, useState } from 'react'

import { useColorMode, useMediaQuery } from '@chakra-ui/react'

import store from '../store'
import { IS_USE_SYSTEM_COLOR_MODE } from '../constant'

const useSystemColorMode = () => {
  const [isSystemDark] = useMediaQuery('(prefers-color-scheme: dark)')
  const [isUseSystemColorMode, setIsUseSystemColorMode] = useState<boolean>(
    store.get(IS_USE_SYSTEM_COLOR_MODE, false) as boolean
  )
  const { setColorMode } = useColorMode()

  useEffect(() => {
    store.set(IS_USE_SYSTEM_COLOR_MODE, isUseSystemColorMode)
    if (isUseSystemColorMode) {
      setColorMode(isSystemDark ? 'dark' : 'light')
    }
  }, [isUseSystemColorMode])

  const toggleIsUseSystemColorMode = () => {
    setIsUseSystemColorMode(!isUseSystemColorMode)
  }

  return {
    isUseSystemColorMode,
    setIsUseSystemColorMode,
    toggleIsUseSystemColorMode,
  }
}

export default useSystemColorMode
