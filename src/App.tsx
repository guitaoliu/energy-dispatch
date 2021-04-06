import React from 'react'

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Text,
  Flex,
  Collapse,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'

import { GoDashboard, GoSettings, GoDeviceDesktop } from 'react-icons/go'
import { GiCarBattery } from 'react-icons/gi'
import { BsFillLightningFill } from 'react-icons/bs'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

import FuelCell from './pages/FuelCell'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import Setting from './pages/Setting'
import ACDC from './pages/ADDC'

const App: React.FC = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Tabs variant="enclosed" isLazy orientation="vertical" h="100%">
      <TabList py={3} bg="blue.400" w="64" shadow="2xl">
        <Tab
          _selected={{ bg: 'white', color: 'black' }}
          onClick={onClose}
          color="white"
          my={2}
          justifyContent="flex-start"
        >
          <Icon mr={4} as={GoDashboard} boxSize={8} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wider">
            Dashboard
          </Text>
        </Tab>
        <Tab
          _selected={{ bg: 'white', color: 'black' }}
          onClick={onToggle}
          color="white"
          my={2}
          justifyContent="flex-start"
        >
          <Icon mr={4} as={GoDeviceDesktop} boxSize={8} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wider">
            Devices
          </Text>
          <Spacer />
          {isOpen ? (
            <Icon as={MdExpandMore} boxSize={8} />
          ) : (
            <Icon as={MdExpandLess} boxSize={8} />
          )}
        </Tab>
        <Collapse in={isOpen} animateOpacity>
          <Flex direction="column">
            <Tab
              _selected={{ bg: 'white', color: 'black' }}
              color="white"
              pl={8}
              justifyContent="flex-start"
            >
              <Icon mr={4} as={GiCarBattery} boxSize={6} />
              <Text fontSize="md" fontWeight="semibold" letterSpacing="wider">
                Fuel Cell
              </Text>
            </Tab>
            <Tab
              _selected={{ bg: 'white', color: 'black' }}
              color="white"
              pl={8}
              justifyContent="flex-start"
            >
              <Icon mr={4} as={BsFillLightningFill} boxSize={6} />
              <Text fontSize="md" fontWeight="semibold" letterSpacing="wider">
                AC/DC
              </Text>
            </Tab>
          </Flex>{' '}
        </Collapse>
        <Tab
          _selected={{ bg: 'white', color: 'black' }}
          onClick={onClose}
          color="white"
          my={2}
          justifyContent="flex-start"
        >
          <Icon mr={4} as={GoSettings} boxSize={8} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wider">
            Setting
          </Text>
        </Tab>
        <Spacer />
        <Text
          color="white"
          textAlign="center"
          mb={4}
          fontSize="lg"
          fontWeight="semibold"
          letterSpacing="wider"
        >
          © Xi&#39;an Jiaotong University
        </Text>
      </TabList>
      <TabPanels h="100%" bg="gray.50">
        <TabPanel h="100%">
          <Dashboard />
        </TabPanel>
        <TabPanel h="100%">
          <Devices />
        </TabPanel>
        <TabPanel h="100%">
          <FuelCell />
        </TabPanel>
        <TabPanel h="100%">
          <ACDC />
        </TabPanel>
        <TabPanel>
          <Setting />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default App
