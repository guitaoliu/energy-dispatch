import React from 'react'

import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  Collapse,
  Spacer,
  useDisclosure,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'

import { GoDashboard, GoSettings, GoDeviceDesktop } from 'react-icons/go'
import { GiCarBattery } from 'react-icons/gi'
import { BsFillLightningFill } from 'react-icons/bs'

import TabItem from './components/TabItem'

import FuelCell from './pages/FuelCell'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import Setting from './pages/Setting'
import ACDC from './pages/ADDC'

import useColorSyncSystem from './hooks/useColorSyncSystem'

const App: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure()
  const bgColor = useColorModeValue('blue.500', 'whiteAlpha.300')

  useColorSyncSystem()
  return (
    <Tabs variant="unstyled" isLazy orientation="vertical" h="full">
      <TabList py={3} bg={bgColor} w="64">
        <TabItem leftIcon={GoDashboard} text="Dashboard" />
        <TabItem
          leftIcon={GoDeviceDesktop}
          text="Devices"
          isOpen={isOpen}
          toggleOpen={onToggle}
        />
        <Collapse in={!isOpen} animateOpacity>
          <VStack
            justifyContent="center"
            alignItems="flex-start"
            w="full"
            py={1}
          >
            <TabItem leftIcon={GiCarBattery} text="Fuel Cell" isSub />
            <TabItem leftIcon={BsFillLightningFill} text="AC/DC" isSub />
          </VStack>
        </Collapse>
        <TabItem leftIcon={GoSettings} text="Setting" />
        <Spacer />
        <Divider />
        <Text
          color="white"
          textAlign="center"
          mt={4}
          mb={2}
          fontSize="lg"
          fontWeight="semibold"
          letterSpacing="wider"
        >
          © Xi&#39;an Jiaotong University
        </Text>
      </TabList>
      <TabPanels h="full">
        <TabPanel h="full">
          <Dashboard />
        </TabPanel>
        <TabPanel h="full">
          <Devices />
        </TabPanel>
        <TabPanel h="full">
          <FuelCell />
        </TabPanel>
        <TabPanel h="full">
          <ACDC />
        </TabPanel>
        <TabPanel h="full">
          <Setting />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default App
