import useStore from './useStore'

import { DATA_UPDATING_INTERVAL } from '../constant'

const useDataUpdatingInterval = () => {
  const [dataUpdatingInterval, setDataUpdatingInterval] = useStore<number>(
    DATA_UPDATING_INTERVAL,
    500
  )
  return { dataUpdatingInterval, setDataUpdatingInterval }
}

export default useDataUpdatingInterval
