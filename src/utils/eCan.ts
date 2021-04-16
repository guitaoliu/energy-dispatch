import * as ffi from 'ffi-napi'
import * as ref from 'ref-napi'

const StructType = require('ref-struct-di')(ref)
const ArrayType = require('ref-array-di')(ref)

/**
 * types definition
 */
export const INT = ref.types.int
export const UINT = ref.types.uint
export const USHORT = ref.types.ushort
export const ULONG = ref.types.ulong
export const DWORD = ref.types.ulong
export const CHAR = ref.types.char
export const UCHAR = ref.types.uchar
export const BYTE = ref.types.byte

export const DATA_ARRAY = ArrayType(BYTE, 8)
export const RESERVED_ARRAY = ArrayType(BYTE, 3)

/**
 * ECAN serial board information
 * Used in ReadBoardInfo
 */
export const BOARD_INFO = StructType({
  dw_Version: USHORT,
  fw_Version: USHORT,
  dr_Version: USHORT,
  in_Version: USHORT,
  irq_Num: USHORT,
  can_Num: BYTE,
  str_Serial_Num: ArrayType(CHAR, 20),
  str_hw_Type: ArrayType(CHAR, 40),
  Reserved: ArrayType(USHORT, 4),
})

/**
 * ECAN serial board information
 * Used in transmit
 */
export const CAN_OBJ = StructType({
  ID: UINT,
  TimeStamp: UINT,
  TimeFlag: BYTE,
  SendType: BYTE,
  RemoteFlag: BYTE,
  ExternFlag: BYTE,
  DataLen: BYTE,
  Data: DATA_ARRAY,
  Reserved: RESERVED_ARRAY,
})

/**
 * can controller status
 * Used in ReadCanStatus
 */
export const CAN_STATUS = StructType({
  errInterrupt: UCHAR,
  regMode: UCHAR,
  regStatus: UCHAR,
  regALCapture: UCHAR,
  regECCapture: UCHAR,
  regEWLimit: UCHAR,
  regRECounter: UCHAR,
  regTECounter: UCHAR,
  Reserved: DWORD,
})

/**
 * ErrInfo VCI library error information
 * Used in ReadErrInfo
 */
export const ERR_INFO = StructType({
  ErrCode: UINT,
  Passive_ErrData: ArrayType(BYTE, 3),
  ArLost_ErrData: BYTE,
})

/**
 * Initialization Configuration for CAN
 * Used in InitCAN
 */
export const INIT_CONFIG = new StructType({
  AccCode: DWORD,
  AccMask: DWORD,
  Reserved: DWORD,
  Filter: UCHAR,
  Timing0: UCHAR,
  Timing1: UCHAR,
  Mode: UCHAR,
})

/**
 * get ECanVci lib file name depending on platform and arch
 */
export const getLibFileName = (): string => {
  switch (process.platform) {
    case 'win32':
      return process.arch === 'x64' ? 'ECanVci64.dll' : 'ECanVci.dll'
    case 'linux':
      return 'libECanVci.so.1'
    default:
      return ''
  }
}

/**
 * return result of most ECANVic functions
 */

export enum CanStatus {
  ERR = 0,
  OK = 1,
}

/**
 * Used in ECANVic related controlling functions
 */
export enum DeviceType {
  USBCANI = 3,
  USBCANII = 4,
}

/**
 * Timing0 and Timing1
 */
export interface Timing {
  timing0: number
  timing1: number
}

/**
 * convert baud rate into timing of CAN_OBJ struct
 * @param baudRate target baud rate
 * @returns converted timing0 and timing1
 */
export const getTimingFromBaudRate = (baudRate: number): Timing => {
  switch (baudRate) {
    case 50000:
      return {
        timing0: 0xbf,
        timing1: 0xff,
      }
    case 100000:
      return {
        timing0: 0x31,
        timing1: 0x1c,
      }
    case 200000:
      return {
        timing0: 0x18,
        timing1: 0x1c,
      }
    case 400000:
      return {
        timing0: 0x87,
        timing1: 0xff,
      }
    case 500000:
      return {
        timing0: 0x09,
        timing1: 0x1c,
      }
    case 800000:
      return {
        timing0: 0x83,
        timing1: 0xff,
      }
    case 1000000:
      return {
        timing0: 0x04,
        timing1: 0x1c,
      }
    case 1250000:
      return {
        timing0: 0x03,
        timing1: 0x1c,
      }
    case 2000000:
      return {
        timing0: 0x81,
        timing1: 0xfa,
      }
    case 2500000:
      return {
        timing0: 0x01,
        timing1: 0x1c,
      }
    case 4000000:
      return {
        timing0: 0x80,
        timing1: 0xfa,
      }
    case 5000000:
      return {
        timing0: 0x00,
        timing1: 0x1c,
      }
    case 6660000:
      return {
        timing0: 0x80,
        timing1: 0xb6,
      }
    case 8000000:
      return {
        timing0: 0x00,
        timing1: 0x16,
      }
    case 10000000:
      return {
        timing0: 0x00,
        timing1: 0x14,
      }
    default:
      return {
        timing0: 0x00,
        timing1: 0x00,
      }
  }
}

/**
 * ffi binding for ECanVic64.dll
 */
const ECANVic = ffi.Library(getLibFileName(), {
  // EXTERNC DllAPI DWORD CALL OpenDevice(DWORD DeviceType, DWORD DeviceInd, DWORD Reserved);
  OpenDevice: [DWORD, [DWORD, DWORD, DWORD]],
  // EXTERNC DllAPI DWORD CALL CloseDevice(DWORD DeviceType, DWORD DeviceInd);
  CloseDevice: [DWORD, [DWORD, DWORD]],
  // EXTERNC DllAPI DWORD CALL InitCAN(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, P_INIT_CONFIG pInitConfig
  InitCAN: [DWORD, [DWORD, DWORD, DWORD, ref.refType(INIT_CONFIG)]],
  // EXTERNC DllAPI DWORD CALL ReadBoardInfo(DWORD DeviceType, DWORD DeviceInd, P_BOARD_INFO pInfo);
  ReadBoardInfo: [DWORD, [DWORD, DWORD, ref.refType(BOARD_INFO)]],
  // EXTERNC DllAPI DWORD CALL ReadErrInfo(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, P_ERR_INFO pErrInfo);
  ReadErrInfo: [DWORD, [DWORD, DWORD, DWORD, ref.refType(ERR_INFO)]],
  // EXTERNC DllAPI DWORD CALL ReadCANStatus(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, P_CAN_STATUS pCANStatus);
  ReadCANStatus: [DWORD, [DWORD, DWORD, DWORD, ref.refType(CAN_STATUS)]],
  // EXTERNC DllAPI DWORD CALL GetReference(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, DWORD RefType, PVOID pData);
  GetReference: [DWORD, [DWORD, DWORD, DWORD, ref.refType(ref.types.void)]],
  // EXTERNC DllAPI DWORD CALL SetReference(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, DWORD RefType, PVOID pData);
  SetReference: [DWORD, [DWORD, DWORD, DWORD, ref.refType(ref.types.void)]],
  // EXTERNC DllAPI ULONG CALL GetReceiveNum(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd);
  GetReceiveNum: [DWORD, [DWORD, DWORD, DWORD]],
  // EXTERNC DllAPI DWORD CALL ClearBuffer(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd);
  ClearBuffer: [DWORD, [DWORD, DWORD, DWORD]],
  // EXTERNC DllAPI DWORD CALL StartCAN(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd);
  StartCAN: [DWORD, [DWORD, DWORD, DWORD]],
  // EXTERNC DllAPI DWORD CALL ResetCAN(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd);
  ResetCAN: [DWORD, [DWORD, DWORD, DWORD]],
  // EXTERNC DllAPI ULONG CALL Transmit(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, P_CAN_OBJ pSend, ULONG Len);
  Transmit: [ULONG, [DWORD, DWORD, DWORD, ref.refType(CAN_OBJ), ULONG]],
  // EXTERNC DllAPI ULONG CALL Receive(DWORD DeviceType, DWORD DeviceInd, DWORD CANInd, P_CAN_OBJ pReceive, ULONG Len, INT WaitTime);
  Receive: [ULONG, [DWORD, DWORD, DWORD, ref.refType(CAN_OBJ), ULONG, INT]],
})

export default ECANVic
