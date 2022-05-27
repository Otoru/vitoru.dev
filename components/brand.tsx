import { Image, HStack, Heading, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Brand: React.FC = () => {
  const text = useColorModeValue('gray.600', 'gray.200')
  return (
    <HStack>
      <Image h={10} aria-label="logo" src={'/logo.png'} />
      <Heading fontFamily={'Maven Pro'} color={text} size={'md'}>
        vitoru.dev
      </Heading>
    </HStack>
  )
}

export default Brand
