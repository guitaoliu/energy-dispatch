import React from 'react'

import { SimpleGrid, Button, Icon } from '@chakra-ui/react'
import { MdSave, MdDelete } from 'react-icons/md'
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'

export interface ControllerProps {
  handleClear: () => void
  isStart: boolean
  setStart: React.Dispatch<React.SetStateAction<boolean>>
}

const Controller = ({
  handleClear,
  isStart,
  setStart,
}: ControllerProps): JSX.Element => (
  <SimpleGrid columns={2} spacing={1}>
    <Button
      leftIcon={<Icon as={VscDebugStart} boxSize={5} />}
      colorScheme="green"
      w="28"
      isDisabled={isStart}
      onClick={() => setStart(true)}
    >
      START
    </Button>
    <Button
      leftIcon={<Icon as={VscDebugStop} boxSize={5} />}
      colorScheme="red"
      variant="outline"
      w="28"
      isDisabled={!isStart}
      onClick={() => setStart(false)}
    >
      STOP
    </Button>
    <Button
      leftIcon={<Icon as={MdSave} boxSize={5} />}
      colorScheme="blue"
      w="28"
    >
      SAVE
    </Button>
    <Button
      leftIcon={<Icon as={MdDelete} boxSize={5} />}
      colorScheme="red"
      variant="outline"
      onClick={handleClear}
      w="28"
    >
      CLEAR
    </Button>
  </SimpleGrid>
)

export default Controller
