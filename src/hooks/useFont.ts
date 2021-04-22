import useStore from './useStore'

import { FONT_FAMILY } from '../constant'

const useFont = () => {
  const [font, setFont] = useStore<string>(FONT_FAMILY, 'Microsoft Yahei')
  return { font, setFont }
}

export default useFont
