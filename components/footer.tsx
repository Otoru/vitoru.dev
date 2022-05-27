import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Brand } from 'components'

const Footer: React.FC = () => {
  const gray = useColorModeValue('blue.300', 'blue.700')
  const { t } = useTranslation()
  const before = {
    content: '""',
    borderBottom: '1px solid',
    borderColor: gray,
    flexGrow: 1,
  }
  return (
    <footer>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            ...before,
            mr: 8,
          }}
          _after={{
            ...before,
            ml: 8,
          }}
        >
          <Brand />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2022 Vitoru LTDA. {t('license')}
        </Text>
      </Box>
    </footer>
  )
}

export default Footer
