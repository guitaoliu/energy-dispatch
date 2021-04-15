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
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'

import RadioGroup from '../components/RadioGroup/RadioGroup'
import { SettingCard, SettingItem } from '../components/SettingCard'

const LogLevelOptions = ['debug', 'info', 'warning', 'error']

const Setting: React.FC = () => {
  const [logLevel, setLogLevel] = useState<string>('info')
  const [fetchingInterval, setFetchingInterval] = useState<number>(100)
  const [followSystemTheme, setFollowSystemTheme] = useState<boolean>(false)
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
          <SettingItem
            name="Log Level"
            controller={
              <RadioGroup
                options={LogLevelOptions}
                defaultValue={logLevel}
                onChange={setLogLevel}
              />
            }
          />
          <SettingItem name="Notifications" controller={<Switch size="lg" />} />
          <SettingItem
            name="Log Folder"
            controller={
              <Button
                color="gray"
                size="sm"
                variant="ghost"
                rightIcon={<Icon as={AiOutlineArrowRight} />}
              >
                Open
              </Button>
            }
          />
          <SettingItem
            name="Data Updating Interval"
            controller={
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
            }
          />
        </SettingCard>
        <SettingCard name="Appearance">
          {
            (!followSystemTheme && (
              <SettingItem
                name="Theme"
                controller={
                  <RadioGroup
                    options={['Light', 'Dark']}
                    defaultValue="Light"
                    onChange={setLogLevel}
                  />
                }
              />
            )) as JSX.Element
          }
          <SettingItem
            name="Follow System Theme"
            controller={
              <Switch
                size="lg"
                defaultChecked={followSystemTheme}
                onChange={() => setFollowSystemTheme(!followSystemTheme)}
              />
            }
          />
          <SettingItem
            name="Font Family"
            controller={
              <Input
                size="sm"
                placeholder="Microsoft Yahei"
                textAlign="center"
              />
            }
          />
        </SettingCard>
        <SettingCard name="USB CAN">
          <SettingItem
            name="Device Type"
            controller={
              <RadioGroup
                options={['USB CAN I', 'USB CAN II']}
                defaultValue="USB CAN I"
              />
            }
          />
          <SettingItem
            name="Device Index"
            controller={<RadioGroup options={['0', '1']} defaultValue="0" />}
          />
          <SettingItem
            name="Baud Rate"
            controller={
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
            }
          />
          <SettingItem
            name="Fetching Interval"
            controller={
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
            }
          />
        </SettingCard>
      </VStack>
    </VStack>
  )
}

export default Setting
