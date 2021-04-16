import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import ElectronStore from 'electron-store'

const store = new ElectronStore()

const theme = extendTheme({
  config: {
    useSystemColorMode: store.get('useSystemColorMode', false) as boolean,
    initialColorMode: 'light',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'gray.700')(props),
      },
    }),
  },
})

export default theme
