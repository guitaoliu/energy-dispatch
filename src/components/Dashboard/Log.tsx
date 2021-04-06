import React from 'react'
import {
  Button,
  Divider,
  HStack,
  Spacer,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { GoFile } from 'react-icons/go'

export type LogRecord = {
  id: string
  content: string
  level: string
  time: number
}

export interface LogProps {
  logs: LogRecord[]
  isLogStart: boolean
  setIsLogStart: React.Dispatch<React.SetStateAction<boolean>>
  setLogs: React.Dispatch<React.SetStateAction<LogRecord[]>>
}

const Log = ({
  logs,
  isLogStart,
  setIsLogStart,
  setLogs,
}: LogProps): JSX.Element => {
  return (
    <VStack
      w="90%"
      bg="white"
      p={3}
      justifyContent="center"
      alignItems="center"
      boxShadow="base"
    >
      <HStack w="full">
        <Icon as={GoFile} boxSize={5} />
        <Text fontSize="lg" letterSpacing="wide">
          Log
        </Text>
        <Spacer />
        <Button
          letterSpacing="wider"
          size="sm"
          colorScheme="green"
          onClick={() => {
            setLogs([])
          }}
        >
          Clear
        </Button>
        {isLogStart ? (
          <Button
            size="sm"
            letterSpacing="wider"
            colorScheme="red"
            onClick={() => {
              setIsLogStart(false)
            }}
          >
            Stop
          </Button>
        ) : (
          <Button
            size="sm"
            letterSpacing="wider"
            colorScheme="blue"
            onClick={() => {
              setIsLogStart(true)
            }}
          >
            Start
          </Button>
        )}
      </HStack>
      <Divider />
      <VStack w="100%" h={48} overflowY="auto">
        {logs.map((log, idx) => (
          <>
            {idx !== 0 && <Divider size="sm" />}
            <HStack w="98%" key={log.id} fontSize="sm">
              <Text w={16}>{log.level.toUpperCase()}</Text>
              <Text>{log.content}</Text>
              <Spacer />
              <Text>{new Date(log.time).toLocaleString()}</Text>
            </HStack>
          </>
        ))}
      </VStack>
    </VStack>
  )
}

export default Log
