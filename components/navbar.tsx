import {
  Box,
  Flex,
  Icon,
  Link,
  Text,
  Menu,
  Stack,
  Button,
  Drawer,
  HStack,
  Tooltip,
  Heading,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  DrawerBody,
  DrawerHeader,
  useColorMode,
  DrawerFooter,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
} from '@chakra-ui/react'
import { BsTranslate as Translate } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { IconType } from 'react-icons'
import NextLink from 'next/link'
import React from 'react'

import { Sun, Mail, Moon, Home, Bars, Tools, Close } from 'lib/icons'
import { Brand } from 'components'

interface Item {
  key: string
  icon: IconType
  href: string
}

interface Props {
  locale?: string
}

const menu: Array<Item> = [
  {
    key: 'home',
    icon: Home,
    href: '/',
  },
  {
    key: 'services',
    icon: Tools,
    href: '/services',
  },
  {
    key: 'contact',
    icon: Mail,
    href: '/contact',
  },
]

const Navbar: React.FC<Props> = ({ locale }) => {
  const background = useColorModeValue(
    'whiteAlpha.800',
    'rgba(26, 32, 44, 0.9)',
  )
  const blue = useColorModeValue('blue.600', 'blue.200')
  const gray = useColorModeValue('gray.200', 'gray.600')
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { pathname } = useRouter()
  const { t } = useTranslation()

  return (
    <header>
      <Box position={'fixed'} w={'100%'} bg={background} zIndex={'banner'}>
        <Flex
          px={4}
          minH={'64px'}
          align={'center'}
          borderTopWidth={3}
          borderColor={useColorModeValue('blue.600', 'blue.200')}
        >
          <Brand />
          <HStack
            w={'100%'}
            spacing={8}
            justify={'right'}
            display={{ base: 'none', md: 'flex' }}
          >
            {menu.map(({ key, href }, index) => {
              const { label, description } = t(key, { returnObjects: true })
              return (
                <NextLink href={href} key={index} locale={locale} passHref>
                  <Box
                    as={Link}
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Tooltip label={description}>
                      <Button variant={'ghost'} colorScheme={'blue'}>
                        {t(label)}
                      </Button>
                    </Tooltip>
                  </Box>
                </NextLink>
              )
            })}
          </HStack>
          <Stack
            flex={1}
            spacing={6}
            paddingLeft={8}
            direction={'row'}
            justify={'flex-end'}
          >
            <Flex align={'end'}>
              <Menu autoSelect={false}>
                <MenuButton
                  as={IconButton}
                  variant={'ghost'}
                  colorScheme={'blue'}
                  icon={<Icon as={Translate} />}
                />
                <MenuList py={0}>
                  <NextLink href={pathname} locale="pt-BR">
                    <MenuItem py={2}>{t('portuguese')}</MenuItem>
                  </NextLink>
                  <NextLink href={pathname} locale="en">
                    <MenuItem py={2}>{t('english')}</MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
              <IconButton
                variant={'ghost'}
                colorScheme={'blue'}
                onClick={toggleColorMode}
                aria-label={
                  colorMode === 'light' ? 'turn off lights' : 'turn on lights'
                }
                icon={
                  colorMode === 'light' ? <Icon as={Moon} /> : <Icon as={Sun} />
                }
              />
              <IconButton
                onClick={onToggle}
                colorScheme={'blue'}
                display={{ base: 'flex', md: 'none' }}
                icon={
                  isOpen ? (
                    <Icon as={Close} w={5} h={5} />
                  ) : (
                    <Icon as={Bars} w={5} h={5} />
                  )
                }
                variant={'ghost'}
                aria-label={isOpen ? 'close menu' : 'open menu'}
              />
            </Flex>
          </Stack>
        </Flex>
        <Drawer
          size={'full'}
          isOpen={isOpen}
          onClose={onClose}
          placement={'left'}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Brand />
              </DrawerHeader>
              <DrawerBody>
                <Stack>
                  {menu.map(({ key, href, icon }, index) => {
                    const { label, description } = t(key, {
                      returnObjects: true,
                    })
                    return (
                      <NextLink
                        passHref
                        href={href}
                        key={index}
                        locale={locale}
                      >
                        <HStack
                          p={4}
                          as={Link}
                          borderWidth={1}
                          borderRadius={4}
                          alignContent={'center'}
                          bg={href === pathname ? gray : 'transparent'}
                          _hover={{
                            textDecoration: 'none',
                          }}
                        >
                          <Flex>
                            <Icon color={blue} as={icon} w={6} h={6} />
                          </Flex>
                          <Box px={2}>
                            <Heading
                              size={'sm'}
                              color={blue}
                              fontWeight={'medium'}
                            >
                              {label}
                            </Heading>
                            <Text fontWeight={'light'} fontSize={'xs'}>
                              {description}
                            </Text>
                          </Box>
                        </HStack>
                      </NextLink>
                    )
                  })}
                </Stack>
              </DrawerBody>
              <DrawerFooter color={blue} borderTopWidth={'1px'}>
                <a href={`mailto:${t('email')}`}>{t('email')}</a>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </header>
  )
}

export default Navbar
