import { useEffect, useState } from 'react'

import store from '../utils/store'
import log from '../log'

const useStore = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(store.get(key, defaultValue) as T)

  useEffect(() => {
    store.set(key, state)
    log.info(`${key} was changed to ${state}`)
  }, [state])

  return [state, setState] as const
}

export default useStore
