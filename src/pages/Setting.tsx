import React from 'react'
import {
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Spacer,
  Switch,
  Text,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { ipcRenderer } from 'electron'
import ElectronStore from 'electron-store'
import { LogLevel } from 'electron-log'

import RadioGroup from '../components/RadioGroup/RadioGroup'
import { SettingCard, SettingItem } from '../components/SettingCard'

import useSystemColorMode from '../hooks/useSystemColorMode'
import useUsbCan from '../hooks/useUsbCan'
import useLogLevel from '../hooks/useLogLevel'
import { DeviceType } from '../utils/eCan'
import log from '../log'

const store = new ElectronStore()

const Setting: React.FC = () => {
  const toast = useToast()
  const { logLevel, setLogLevel, logLevelOptions } = useLogLevel()
  const {
    deviceType,
    deviceIndex,
    canIndex,
    baudRate,
    fetchingInterval,
    setDeviceType,
    setDeviceIndex,
    setCanIndex,
    setBaudRate,
    setFetchingInterval,
  } = useUsbCan()
  const {
    isUseSystemColorMode,
    toggleIsUseSystemColorMode,
  } = useSystemColorMode()

  const { colorMode, toggleColorMode, setColorMode } = useColorMode()

  const handleResetAllSettings = () => {
    // todo fix reload
    store.clear()
    log.info('Reset all settings')
    setColorMode('light')
    toast({
      title: 'Reset!',
      description: 'Successfully reset all settings, please reload this page',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack py={3} h="full">
      <HStack w="90%">
        <Text fontSize="2xl" fontWeight="semibold">
          Settings
        </Text>
        <Spacer />
        <Button
          colorScheme="red"
          variant="outline"
          onClick={handleResetAllSettings}
        >
          Reset All Settings
        </Button>
      </HStack>
      <Divider w="90%" />
      <VStack w="90%" overflowY="auto" overflowX="hidden" px={1} pb={2}>
        <SettingCard name="General">
          <SettingItem name="Log Level">
            <RadioGroup
              options={logLevelOptions}
              defaultValue={logLevel}
              onChange={(value) => setLogLevel(value as LogLevel)}
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
              onClick={() => ipcRenderer.invoke('open-log-folder')}
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
              options={[
                DeviceType[DeviceType.USBCANI],
                DeviceType[DeviceType.USBCANII],
              ]}
              defaultValue={DeviceType[deviceType]}
              onChange={(value) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setDeviceType(Number(DeviceType[value as any]))
              }}
            />
          </SettingItem>
          <SettingItem name="Device Index">
            <RadioGroup
              options={['0', '1']}
              defaultValue={deviceIndex.toString()}
              onChange={(value) => {
                setDeviceIndex(Number(value))
              }}
            />
          </SettingItem>
          <SettingItem name="CAN Index">
            <RadioGroup
              options={['0', '1']}
              defaultValue={canIndex.toString()}
              onChange={(value) => {
                setCanIndex(Number(value))
              }}
            />
          </SettingItem>
          <SettingItem name="Baud Rate">
            <Select
              size="sm"
              w="56"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setBaudRate(Number(event.target.value))
              }}
              defaultValue={baudRate}
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
                placeholder={fetchingInterval.toString()}
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
