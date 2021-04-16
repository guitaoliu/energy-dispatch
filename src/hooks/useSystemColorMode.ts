import { useEffect, useState } from 'react'

import ElectronStore from 'electron-store'
import { useColorMode, useMediaQuery } from '@chakra-ui/react'

const store = new ElectronStore()
const KEY = 'useSystemColorMode'

const useSystemColorMode = () => {
  const [isSystemDark] = useMediaQuery('(prefers-color-scheme: dark)')
  const [isUseSystemColorMode, setIsUseSystemColorMode] = useState<boolean>(
    store.get(KEY, false) as boolean
  )
  const { setColorMode } = useColorMode()

  useEffect(() => {
    store.set(KEY, isUseSystemColorMode)
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
