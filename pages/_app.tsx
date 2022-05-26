import { appWithTranslation } from 'next-i18next'
import { ChakraProvider } from 'lib/chakra'
import type { AppProps } from 'next/app'
import React from 'react'

import theme from 'theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme} cookies={pageProps.cookies}>
    <Component {...pageProps} />
  </ChakraProvider>
)

export default appWithTranslation(App)
