import React from 'react'
import { SimpleGrid, Button, Icon } from '@chakra-ui/react'
import { MdSave } from 'react-icons/md'
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'
import { BiLineChart } from 'react-icons/bi'

export interface ControllerProps {
  isStart: boolean
  handleStart: () => void
  handleStop: () => void
  handleSave: () => void
  handleChartOpen: () => void
}

const Controller = ({
  isStart,
  handleStart,
  handleStop,
  handleSave,
  handleChartOpen,
}: ControllerProps): JSX.Element => (
  <SimpleGrid columns={2} spacing={2}>
    <Button
      leftIcon={<Icon as={VscDebugStart} boxSize={5} />}
      colorScheme="green"
      w="24"
      letterSpacing="wider"
      isDisabled={isStart}
      onClick={handleStart}
    >
      START
    </Button>
    <Button
      leftIcon={<Icon as={MdSave} boxSize={5} />}
      colorScheme="blue"
      w="24"
      letterSpacing="wider"
      onClick={handleSave}
    >
      SAVE
    </Button>
    <Button
      leftIcon={<Icon as={VscDebugStop} boxSize={5} />}
      colorScheme="red"
      w="24"
      letterSpacing="wider"
      isDisabled={!isStart}
      onClick={handleStop}
    >
      STOP
    </Button>
    <Button
      leftIcon={<Icon as={BiLineChart} boxSize={5} />}
      colorScheme="blue"
      variant="outline"
      w="24"
      letterSpacing="wider"
      onClick={handleChartOpen}
    >
      Charts
    </Button>
  </SimpleGrid>
)

export default Controller
