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
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'

import { GoDashboard, GoSettings, GoServer } from 'react-icons/go'
import { GiCarBattery } from 'react-icons/gi'
import { BsFillLightningFill } from 'react-icons/bs'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

import FuelCell from './pages/FuelCell'
import Home from './pages/Home'
import Devices from './pages/Devices'
import Setting from './pages/Setting'
import ACDC from './pages/ADDC'

const App = (): JSX.Element => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  return (
    <Tabs variant="enclosed" isLazy orientation="vertical" h="100%">
      <TabList py={3} bg="blue.400" w="60" shadow="2xl">
        <Tab
          _selected={{ bg: 'white', color: 'black' }}
          onClick={onClose}
          color="white"
          my={2}
          justifyContent="flex-start"
        >
          <Icon mr={2} as={GoDashboard} boxSize={5} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wide">
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
          <Icon mr={2} as={GoServer} boxSize={5} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wide">
            Devices
          </Text>
          <Spacer />
          {isOpen ? (
            <Icon as={MdExpandMore} boxSize={5} />
          ) : (
            <Icon as={MdExpandLess} boxSize={5} />
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
              <Icon mr={2} as={GiCarBattery} boxSize={4} />
              <Text fontSize="md" letterSpacing="wide">
                Fuel Cell
              </Text>
            </Tab>
            <Tab
              _selected={{ bg: 'white', color: 'black' }}
              color="white"
              pl={8}
              justifyContent="flex-start"
            >
              <Icon mr={2} as={BsFillLightningFill} boxSize={4} />
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
          justifyContent="flex-start"
        >
          <Icon mr={2} as={GoSettings} boxSize={5} />
          <Text fontSize="lg" fontWeight="semibold" letterSpacing="wide">
            Setting
          </Text>
        </Tab>
        <Spacer />
        <Tab color="white" isDisabled _hover={{ cursor: 'content-menu' }}>
          © Xi'an Jiaotong University
        </Tab>
      </TabList>
      <TabPanels py={3} h="100%">
        <TabPanel>
          <Home />
        </TabPanel>
        <TabPanel h="100%">
          <Devices />
        </TabPanel>
        <TabPanel h="100%">
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
