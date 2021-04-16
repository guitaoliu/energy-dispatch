import { useEffect, useState } from 'react'

import Store from 'electron-store'
import { useColorMode, useMediaQuery } from '@chakra-ui/react'

const store = new Store()
const KEY = 'useSystemColorMode'

const useSystemColorMode = () => {
  const [isDark] = useMediaQuery('(prefers-color-scheme: dark)')
  const [isUseSystemColorMode, setIsUseSystemColorMode] = useState<boolean>(
    store.get(KEY, false) as boolean
  )
  const { setColorMode } = useColorMode()

  useEffect(() => {
    store.set(KEY, isUseSystemColorMode)
    if (isUseSystemColorMode) {
      setColorMode(isDark ? 'dark' : 'light')
    }
  }, [isUseSystemColorMode, setColorMode, isDark])

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
