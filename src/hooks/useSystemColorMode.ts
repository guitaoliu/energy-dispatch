import { useEffect } from 'react'

import { useColorMode, useMediaQuery } from '@chakra-ui/react'

import { IS_USE_SYSTEM_COLOR_MODE } from '../constant'
import useStore from './useStore'

const useSystemColorMode = () => {
  const [isSystemDark] = useMediaQuery('(prefers-color-scheme: dark)')
  const [isUseSystemColorMode, setIsUseSystemColorMode] = useStore<boolean>(
    IS_USE_SYSTEM_COLOR_MODE,
    false
  )
  const { setColorMode } = useColorMode()

  useEffect(() => {
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
