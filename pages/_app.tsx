import { appWithTranslation } from 'next-i18next'
import { ChakraProvider } from 'lib/chakra'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'

import theme from 'theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          ({ scope }) => {
            console.log(`🔔 Successful registration of SW with scope: ${scope}`)
          },
          (err) => {
            console.error('⚠️ SW Registration failed:', err)
          },
        )
      })
    }
  })

  return (
    <ChakraProvider theme={theme} cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default appWithTranslation(App)
