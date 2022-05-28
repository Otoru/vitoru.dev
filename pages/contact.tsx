import {
  Box,
  Text,
  Stack,
  Image,
  Button,
  Heading,
  Container,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MdEmail as EmailIcon } from 'react-icons/md'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Navbar, Footer } from 'components'

const Contact: NextPage = () => {
  const { t } = useTranslation('contact')
  const { colorMode } = useColorMode()
  const { locale } = useRouter()

  const text: Array<string> = t('description', { returnObjects: true })

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
              src={`/assets/${colorMode}/hello.svg`}
            />
            <Stack spacing={6}>
              <Heading
                textAlign={['center', 'left']}
                color={useColorModeValue('blue.700', 'blue.100')}
              >
                {t('title')}
              </Heading>
              {text.map((content, index) => (
                <Text key={index} textAlign={['center', 'left']}>
                  {content}
                </Text>
              ))}
            </Stack>
            <Box margin={'auto'} py={8}>
              <a href={`mailto:${t('email')}`}>
                <Button leftIcon={<EmailIcon />} colorScheme={'blue'}>
                  {t('email')}
                </Button>
              </a>
            </Box>
          </Stack>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let props = {}

  if (locale) {
    const namespaces = ['contact', 'common']
    const translations = await serverSideTranslations(locale, namespaces)
    props = { ...props, ...translations }
  }

  return { props }
}

export default Contact
