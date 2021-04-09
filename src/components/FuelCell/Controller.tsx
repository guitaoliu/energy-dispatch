import React from 'react'
import { SimpleGrid, Button, Icon } from '@chakra-ui/react'

import { MdSave } from 'react-icons/md'
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'
import { BiLineChart } from 'react-icons/bi'
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'

export interface ControllerProps {
  isUpdating: boolean
  isWork: boolean
  handleToggleUpdating: () => void
  handleSave: () => void
  handleChartOpen: () => void
  handleToggleFC: () => void
}

const Controller = ({
  isUpdating,
  isWork,
  handleToggleUpdating,
  handleSave,
  handleChartOpen,
  handleToggleFC,
}: ControllerProps): JSX.Element => (
  <SimpleGrid columns={2} spacing={2}>
    {isUpdating ? (
      <Button
        leftIcon={<Icon as={VscDebugStop} boxSize={5} />}
        colorScheme="red"
        w={28}
        letterSpacing="wider"
        onClick={handleToggleUpdating}
      >
        STOP
      </Button>
    ) : (
      <Button
        leftIcon={<Icon as={VscDebugStart} boxSize={5} />}
        colorScheme="green"
        w={28}
        letterSpacing="wider"
        onClick={handleToggleUpdating}
      >
        UPDATE
      </Button>
    )}
    <Button
      leftIcon={<Icon as={MdSave} boxSize={5} />}
      colorScheme="blue"
      w={28}
      letterSpacing="wider"
      onClick={handleSave}
    >
      SAVE
    </Button>
    <Button
      leftIcon={<Icon as={BiLineChart} boxSize={5} />}
      colorScheme="blue"
      variant="outline"
      w={28}
      letterSpacing="wider"
      onClick={handleChartOpen}
    >
      CHARTS
    </Button>
    {isWork ? (
      <Button
        leftIcon={<Icon as={BsToggleOn} boxSize={5} />}
        colorScheme="red"
        variant="outline"
        w={28}
        letterSpacing="wider"
        onClick={handleToggleFC}
      >
        STOP
      </Button>
    ) : (
      <Button
        leftIcon={<Icon as={BsToggleOff} boxSize={5} />}
        colorScheme="green"
        variant="outline"
        w={28}
        letterSpacing="wider"
        onClick={handleToggleFC}
      >
        START
      </Button>
    )}
  </SimpleGrid>
)

export default Controller
