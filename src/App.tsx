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
  useColorModeValue,
  Divider,
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
  const { isOpen, onToggle } = useDisclosure()
  const bgColor = useColorModeValue('blue.500', 'whiteAlpha.300')
  const tabSelectedColor = useColorModeValue(
    { bg: 'white', color: 'black' },
    { bg: 'gray.700', color: 'white' }
  )
  return (
    <Tabs variant="enclosed" isLazy orientation="vertical" h="full">
      <TabList py={3} bg={bgColor} w="64">
        <Tab
          _selected={tabSelectedColor}
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
          _selected={tabSelectedColor}
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
        <Collapse in={!isOpen} animateOpacity>
          <Flex direction="column">
            <Tab
              _selected={tabSelectedColor}
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
              _selected={tabSelectedColor}
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
          _selected={tabSelectedColor}
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
