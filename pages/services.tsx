import {
  Grid,
  Icon,
  Flex,
  Text,
  Stack,
  Image,
  Spacer,
  HStack,
  Tooltip,
  Heading,
  GridItem,
  Container,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

import { Navbar, Footer } from 'components'
import * as icons from 'lib/icons'

interface CardProps {
  title: string
  text: Array<string>
  icons: Array<string>
}

const tagMaker = ({
  tag,
}: {
  tag: string
}): { icon: React.ElementType; color: string } => {
  switch (tag) {
    case 'Python': {
      return { color: 'blue', icon: icons.Python }
    }
    case 'React': {
      return { color: 'cyan', icon: icons.React }
    }
    case 'Next': {
      return { color: 'green', icon: icons.Next }
    }
    case 'Javascript': {
      return { color: 'yellow', icon: icons.Javascript }
    }
    case 'AWS': {
      return { color: 'orange', icon: icons.Aws }
    }
    case 'Ansible': {
      return { color: 'red', icon: icons.Ansible }
    }
    case 'Bitbucket': {
      return { color: 'blue', icon: icons.Bitbucket }
    }
    case 'Docker': {
      return { color: 'blue', icon: icons.Docker }
    }
    case 'Git': {
      return { color: 'orange', icon: icons.Git }
    }
    case 'Github': {
      return { color: 'gray', icon: icons.Github }
    }
    case 'Bash': {
      return { color: 'pink', icon: icons.Bash }
    }
    case 'Terraform': {
      return { color: 'purple', icon: icons.Terraform }
    }
    case 'Gitlab': {
      return { color: 'orange', icon: icons.Gitlab }
    }
    case 'Kubernetes': {
      return { color: 'blue', icon: icons.Kubernetes }
    }
    case 'Ubuntu': {
      return { color: 'orange', icon: icons.Ubuntu }
    }
    case 'Debian': {
      return { color: 'pink', icon: icons.Debian }
    }
    case 'Centos': {
      return { color: 'green', icon: icons.Centos }
    }
    case 'Arch': {
      return { color: 'blue', icon: icons.Arch }
    }
    default: {
      return { color: 'yellow', icon: icons.Question }
    }
  }
}

interface TagProps {
  label: string
  color: string
  icon: React.ElementType
}

const Tag: React.FC<TagProps> = ({ label, color, icon }) => {
  const background = useColorModeValue(`${color}.400`, `${color}.600`)
  return (
    <Tooltip label={label}>
      <Flex bg={background} borderRadius={'full'}>
        <Icon color={'gray.100'} m={2} as={icon} boxSize={4} />
      </Flex>
    </Tooltip>
  )
}

const Card: React.FC<CardProps> = ({ title, icons, text }) => {
  const background = useColorModeValue('gray.100', 'gray.900')
  const base = useColorModeValue('blue.100', 'blue.900')

  return (
    <Stack
      w={'100%'}
      h={'100%'}
      rounded={'md'}
      bg={background}
      shadow={'base'}
      borderWidth={2}
      _hover={{
        transform: 'scale(1.01)',
        transition: '.1s',
      }}
    >
      <Stack p={6} paddingBottom={4}>
        <Heading fontWeight={'900'} size={'md'} paddingBottom={2}>
          {title}
        </Heading>
        {text.map((content, index) => (
          <Text key={index} fontWeight={'300'}>
            {content}
          </Text>
        ))}
      </Stack>
      <Spacer />
      <HStack bg={base} px={6} py={4}>
        {icons.map((tag, index) => {
          const { icon, color } = tagMaker({ tag })
          return <Tag key={index} label={tag} color={color} icon={icon} />
        })}
      </HStack>
    </Stack>
  )
}

const Services: NextPage = () => {
  const { t } = useTranslation('services')
  const { colorMode } = useColorMode()
  const { locale } = useRouter()

  const services: Array<CardProps> = t('services', { returnObjects: true })

  return (
    <div>
      <Head>
        <title>{t('head')}</title>
      </Head>
      <Navbar locale={locale} />
      <main>
        <Container maxW={['container.sm', 'container.md']} p={4}>
          <Stack spacing={12} paddingTop={12}>
            <Image
              m={'auto'}
              alt="pair programming log"
              boxSize={['256px', '256px', '384px']}
              src={`/assets/${colorMode}/dev-producity.svg`}
            />
            <Stack spacing={6}>
              <Heading
                textAlign={'center'}
                color={useColorModeValue('blue.700', 'blue.100')}
              >
                {t('title')}
              </Heading>
              <Text textAlign={'center'}>{t('description')}</Text>
            </Stack>
            <Grid
              gap={4}
              m={'auto'}
              templateColumns={'repeat(auto-fit, minmax(20rem, 1fr));'}
            >
              {services.map(({ title, text, icons }, index) => (
                <GridItem key={index}>
                  <Card title={title} text={text} icons={icons} />
                </GridItem>
              ))}
            </Grid>
            <Stack spacing={6}>
              <Heading color={useColorModeValue('blue.700', 'blue.100')}>
                {t('subtitle')}
              </Heading>
              <Text>{t('call-to-action')}</Text>
            </Stack>
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
    const namespaces = ['services', 'common']
    const translations = await serverSideTranslations(locale, namespaces)
    props = { ...props, ...translations }
  }

  return { props }
}

export default Services
