import {
  Box,
  Text,
  Image,
  Stack,
  Heading,
  Container,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Navbar } from 'components'

const Home: NextPage = () => {
  const { t } = useTranslation('index')
  const { colorMode } = useColorMode()
  const { locale } = useRouter()

  return (
    <div>
      <Head>
        <title>{t('head')}</title>
      </Head>
      <Navbar locale={locale} />
      <main>
        <Container maxW={['container.sm', 'container.md']}>
          <Stack align={'center'} py={16}>
            <Image
              alt="pair programming log"
              boxSize={['256px', '384px', '512px']}
              src={`/assets/${colorMode}/pair-programming.svg`}
            />
            <Heading fontWeight={'black'} display={'flex'} fontFamily={'Lato'}>
              {t('title')}{' '}
              <Box
                paddingLeft={2}
                color={useColorModeValue('blue.600', 'blue.200')}
              >
                software
              </Box>
            </Heading>
            <Text fontWeight={'light'} align={'center'} p={8}>
              {t('description')}
            </Text>
          </Stack>
        </Container>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let props = {}

  if (locale) {
    const namespaces = ['index', 'common']
    const translations = await serverSideTranslations(locale, namespaces)
    props = { ...props, ...translations }
  }

  return { props }
}

export default Home
