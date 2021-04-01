import React from 'react'

import { SimpleGrid, Button, Icon } from '@chakra-ui/react'
import { MdSave, MdDelete } from 'react-icons/md'
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'

export interface ControllerProps {
  handleClear: () => void
  isStart: boolean
  handleStart: () => void
  handleStop: () => void
}

const Controller = ({
  handleClear,
  isStart,
  handleStart,
  handleStop,
}: ControllerProps): JSX.Element => (
  <SimpleGrid columns={2} spacing={3}>
    <Button
      leftIcon={<Icon as={VscDebugStart} boxSize={5} />}
      colorScheme="green"
      w="24"
      isDisabled={isStart}
      onClick={handleStart}
    >
      START
    </Button>
    <Button
      leftIcon={<Icon as={MdSave} boxSize={5} />}
      colorScheme="blue"
      w="24"
    >
      SAVE
    </Button>
    <Button
      leftIcon={<Icon as={VscDebugStop} boxSize={5} />}
      colorScheme="red"
      variant="outline"
      w="24"
      isDisabled={!isStart}
      onClick={handleStop}
    >
      STOP
    </Button>
    <Button
      leftIcon={<Icon as={MdDelete} boxSize={5} />}
      colorScheme="red"
      variant="outline"
      onClick={handleClear}
      w="24"
    >
      CLEAR
    </Button>
  </SimpleGrid>
)

export default Controller
