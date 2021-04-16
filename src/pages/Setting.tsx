import React, { useState } from 'react'
import {
  VStack,
  HStack,
  Text,
  Button,
  Spacer,
  Divider,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Switch,
  Icon,
  useColorMode,
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'

import RadioGroup from '../components/RadioGroup/RadioGroup'
import { SettingCard, SettingItem } from '../components/SettingCard'
import useSystemColorMode from '../hooks/useSystemColorMode'

const LogLevelOptions = ['debug', 'info', 'warning', 'error']

const Setting: React.FC = () => {
  const [logLevel, setLogLevel] = useState<string>('info')
  const [fetchingInterval, setFetchingInterval] = useState<number>(100)
  const {
    isUseSystemColorMode,
    toggleIsUseSystemColorMode,
  } = useSystemColorMode()

  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <VStack py={3} h="full">
      <HStack w="90%">
        <Text fontSize="2xl" fontWeight="semibold">
          Settings
        </Text>
        <Spacer />
        <Button colorScheme="red" variant="outline">
          Reset All Settings
        </Button>
      </HStack>
      <Divider w="90%" />
      <VStack w="90%" overflowY="auto" px={1} pb={2}>
        <SettingCard name="General">
          <SettingItem name="Log Level">
            <RadioGroup
              options={LogLevelOptions}
              defaultValue={logLevel}
              onChange={setLogLevel}
            />
          </SettingItem>
          <SettingItem name="Notifications">
            <Switch size="lg" />
          </SettingItem>
          <SettingItem name="Log Folder">
            <Button
              color="gray"
              size="sm"
              variant="ghost"
              rightIcon={<Icon as={AiOutlineArrowRight} />}
            >
              Open
            </Button>
          </SettingItem>
          <SettingItem name="Data Updating Interval">
            <InputGroup size="sm" w={56}>
              <Input
                // todo set to default value
                placeholder="500"
                textAlign="center"
                type="number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFetchingInterval(Number(event.target.value))
                }}
              />
              <InputRightAddon>ms</InputRightAddon>
            </InputGroup>
          </SettingItem>
        </SettingCard>
        <SettingCard name="Appearance">
          {
            (!isUseSystemColorMode && (
              <SettingItem name="Theme">
                <RadioGroup
                  options={['light', 'dark']}
                  defaultValue={colorMode}
                  onChange={toggleColorMode}
                />
              </SettingItem>
            )) as JSX.Element
          }
          <SettingItem name="Follow System Theme">
            <Switch
              size="lg"
              defaultChecked={isUseSystemColorMode}
              onChange={toggleIsUseSystemColorMode}
            />
          </SettingItem>
          <SettingItem name="Font Family">
            <Input size="sm" placeholder="Microsoft Yahei" textAlign="center" />
          </SettingItem>
        </SettingCard>
        <SettingCard name="USB CAN">
          <SettingItem name="Device Type">
            <RadioGroup
              options={['USB CAN I', 'USB CAN II']}
              defaultValue="USB CAN I"
            />
          </SettingItem>
          <SettingItem name="Device Index">
            <RadioGroup options={['0', '1']} defaultValue="0" />
          </SettingItem>
          <SettingItem name="Baud Rate">
            <Select
              size="sm"
              w="56"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                console.log(event.target.value)
              }}
              defaultValue="500"
            >
              <option value="5">5 kBit/s</option>
              <option value="10">10 kBit/s</option>
              <option value="20">20 kBit/s</option>
              <option value="40">40 kBit/s</option>
              <option value="50">50 kBit/s</option>
              <option value="80">80 kBit/s</option>
              <option value="100">100 kBit/s</option>
              <option value="125">125 kBit/s</option>
              <option value="200">200 kBit/s</option>
              <option value="250">250 kBit/s</option>
              <option value="400">400 kBit/s</option>
              <option value="500">500 kBit/s</option>
              <option value="666">600 kBit/s</option>
              <option value="800">800 kBit/s</option>
              <option value="1000">1 MBit/s</option>
            </Select>
          </SettingItem>
          <SettingItem name="Fetching Interval">
            <InputGroup size="sm" w={56}>
              <Input
                // todo set to default value
                placeholder="100"
                textAlign="center"
                type="number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFetchingInterval(Number(event.target.value))
                }}
              />
              <InputRightAddon>ms</InputRightAddon>
            </InputGroup>
          </SettingItem>
        </SettingCard>
      </VStack>
    </VStack>
  )
}

export default Setting
