import React from 'react'
import { Icon, Spacer, Tab, Text, useColorModeValue } from '@chakra-ui/react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export interface TabItemProps {
  leftIcon: React.ElementType
  text: string
  isSub?: boolean
  isOpen?: boolean
  toggleOpen?: () => void
}

const TabItem = ({
  leftIcon,
  text,
  isSub = false,
  isOpen,
  toggleOpen,
}: TabItemProps) => {
  const tabSelectedColor = useColorModeValue(
    { bg: 'white', color: 'black' },
    { bg: 'gray.700', color: 'white' }
  )
  return (
    <Tab
      w="full"
      pl={isSub ? 8 : 'auto'}
      my={2}
      justifyContent="flex-start"
      color="white"
      boxShadow="none"
      _selected={tabSelectedColor}
      onClick={toggleOpen}
    >
      <Icon mr={4} as={leftIcon} boxSize={isSub ? 6 : 8} />
      <Text
        fontSize={isSub ? 'md' : 'lg'}
        fontWeight="semibold"
        letterSpacing="wider"
      >
        {text}
      </Text>
      <Spacer />
      {toggleOpen !== undefined &&
        (isOpen ? (
          <Icon as={MdExpandMore} boxSize={8} />
        ) : (
          <Icon as={MdExpandLess} boxSize={8} />
        ))}
    </Tab>
  )
}

export default TabItem
