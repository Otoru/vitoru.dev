import {
  Box,
  Icon,
  Flex,
  Text,
  Stack,
  HStack,
  Tooltip,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  FaAws as AwsIcon,
  FaGitAlt as GitIcon,
  FaReact as ReactIcon,
  FaGithub as GithubIcon,
  FaPython as PythonIcon,
  FaDocker as DockerIcon,
  FaQuestion as QuestionIcon,
  FaBitbucket as BitbucketIcon,
} from 'react-icons/fa'
import {
  SiGnubash as BashIcon,
  SiGitlab as GitlabIcon,
  SiNextdotjs as NextIcon,
  SiAnsible as AnsibleIcon,
  SiTerraform as TerraformIcon,
} from 'react-icons/si'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { IoLogoJavascript as JavascriptIcon } from 'react-icons/io'
import { GrGolang as GolangIcon } from 'react-icons/gr'
import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

import { Navbar } from 'components'

interface CardProps {
  title: string
  text: string
  icons: Array<string>
}

const tagMaker = ({
  tag,
}: {
  tag: string
}): { icon: React.ElementType; color: string } => {
  switch (tag) {
    case 'Python': {
      return { color: 'blue', icon: PythonIcon }
    }
    case 'React': {
      return { color: 'cyan', icon: ReactIcon }
    }
    case 'Next': {
      return { color: 'green', icon: NextIcon }
    }
    case 'Javascript': {
      return { color: 'yellow', icon: JavascriptIcon }
    }
    case 'AWS': {
      return { color: 'orange', icon: AwsIcon }
    }
    case 'Ansible': {
      return { color: 'red', icon: AnsibleIcon }
    }
    case 'Bitbucket': {
      return { color: 'blue', icon: BitbucketIcon }
    }
    case 'Docker': {
      return { color: 'blue', icon: DockerIcon }
    }
    case 'Git': {
      return { color: 'orange', icon: GitIcon }
    }
    case 'Github': {
      return { color: 'gray', icon: GithubIcon }
    }
    case 'Bash': {
      return { color: 'gray', icon: BashIcon }
    }
    case 'Terraform': {
      return { color: 'purple', icon: TerraformIcon }
    }
    case 'Gitlab': {
      return { color: 'orange', icon: GitlabIcon }
    }
    default: {
      return { color: 'yellow', icon: QuestionIcon }
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
        <Icon color={'gray.200'} m={2} as={icon} boxSize={4} />
      </Flex>
    </Tooltip>
  )
}

const Card: React.FC<CardProps> = ({ title, icons, text }) => {
  const background = useColorModeValue('gray.100', 'gray.900')
  const border = useColorModeValue('blue.600', 'blue.200')

  return (
    <Box
      m={2}
      maxW={'320px'}
      rounded={'md'}
      bg={background}
      shadow={'base'}
      borderWidth={2}
      _hover={{
        transform: 'scale(1.01)',
        transition: '.1s',
      }}
    >
      <Box px={4} py={4}>
        <Heading fontWeight={'900'} size={'md'}>
          {title}
          <Icon as={GolangIcon} />
        </Heading>
        <Text fontWeight={'300'} marginTop={2}>
          {text}
        </Text>
      </Box>
      <Stack p={4} paddingTop={2} borderColor={border} borderTopWidth={2}>
        <HStack paddingTop={2}>
          {icons.map((tag, index) => {
            const { icon, color } = tagMaker({ tag })
            return <Tag key={index} label={tag} color={color} icon={icon} />
          })}
        </HStack>
      </Stack>
    </Box>
  )
}

const Services: NextPage = () => {
  const { t } = useTranslation('services')
  const { locale } = useRouter()

  const cards: Array<CardProps> = t('cards', { returnObjects: true })

  return (
    <div>
      <Head>
        <title>{t('head')}</title>
      </Head>
      <Navbar locale={locale} />
      <main>
        <Box mx={8} py={16}>
          {cards.map(({ title, text, icons }, index) => (
            <Card key={index} title={title} text={text} icons={icons} />
          ))}
        </Box>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const props = locale
    ? await serverSideTranslations(locale, ['services', 'common'])
    : {}
  return { props }
}

export default Services
