import React, { useState } from 'react'

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
  useDisclosure,
} from '@chakra-ui/react'

import { GoDashboard, GoSettings, GoServer } from 'react-icons/go'
import { GiCarBattery } from 'react-icons/gi'
import { BsFillLightningFill } from 'react-icons/bs'

import FuelCell from './pages/FuelCell'
import Home from './pages/Home'
import Devices from './pages/Devices'
import Setting from './pages/Setting'
import ACDC from './pages/ADDC'

const App = (): JSX.Element => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Tabs variant="enclosed" isLazy orientation="vertical" h="100%">
      <TabList py={3} bg="blue.400" w="60">
        <Tab
          _selected={{ bg: 'white', color: 'black' }}
          onClick={onClose}
          color="white"
          my={2}
          justifyContent="space-between"
        >
          <Icon as={GoDashboard} boxSize={5} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wide">
            Dashboard
          </Text>
        </Tab>
        <Tab
          _selected={{ bg: 'white', color: 'black' }}
          onClick={onToggle}
          color="white"
          my={2}
          justifyContent="space-between"
        >
          <Icon as={GoServer} boxSize={5} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wide">
            Devices
          </Text>
        </Tab>
        <Collapse in={isOpen} animateOpacity>
          <Flex direction="column">
            <Tab
              _selected={{ bg: 'white', color: 'black' }}
              color="white"
              pl={8}
              justifyContent="space-between"
            >
              <Icon as={GiCarBattery} boxSize={4} />
              <Text fontSize="md" letterSpacing="wide">
                Fuel Cell
              </Text>
            </Tab>
            <Tab
              _selected={{ bg: 'white', color: 'black' }}
              color="white"
              pl={8}
              justifyContent="space-between"
            >
              <Icon as={BsFillLightningFill} boxSize={4} />
              <Text fontSize="md" letterSpacing="wide">
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
          justifyContent="space-between"
        >
          <Icon as={GoSettings} boxSize={5} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wide">
            Setting
          </Text>
        </Tab>
      </TabList>
      <TabPanels p={2} h="100%">
        <TabPanel>
          <Home />
        </TabPanel>
        <TabPanel h="100%">
          <Devices />
        </TabPanel>
        <TabPanel>
          <FuelCell />
        </TabPanel>
        <TabPanel>
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
