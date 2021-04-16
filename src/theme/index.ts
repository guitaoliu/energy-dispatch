import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
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
