import { useCallback, useEffect, useState } from 'react'

import store from '../utils/store'
import log from '../log'

const useStore = <T>(key: string, defaultValue: T) => {
  const getStore = useCallback(() => {
    return store.get(key, defaultValue) as T
  }, [key, defaultValue])
  const setStore = useCallback(
    (value: T) => {
      store.set(key, value)
    },
    [key]
  )
  const [state, setState] = useState<T>(getStore())

  useEffect(() => {
    if (getStore() !== state) {
      setStore(state)
      log.info(`${key} was changed to ${state}`)
    }
  }, [state])

  return [state, setState] as const
}

export default useStore
