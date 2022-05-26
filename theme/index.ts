import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'Lato', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
})

export default theme
