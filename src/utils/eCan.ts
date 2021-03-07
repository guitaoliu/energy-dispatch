import * as ffi from 'ffi-napi'
import * as ref from 'ref-napi'
import Struct from 'ref-struct-di'
import RefArray from 'ref-array-di'

const CANObj = Struct({
  ID: ref.types.uint,
  TimeStamp: ref.types.uint,
  TimeFlag: ref.types.byte,
  SendType: ref.types.byte,
  RemoteFlag: ref.types.byte,
  ExternFlag: ref.types.byte,
  DataLen: ref.types.byte,
  data: RefArray(ref.types.byte, 8),
  Reserved: RefArray(ref.types.byte, 3),
})

const CANErrInfo = Struct({
  ErrCode: RefArray(ref.types.uint, 3),
  PassiveErrData: RefArray(ref.types.byte),
  ArLostErrData: ref.types.byte,
})

const InitConfig = Struct({
  AccCode: ref.types.uint,
  AccMask: ref.types.uint,
  Reserved: ref.types.uint,
  Filter: ref.types.byte,
  Timing0: ref.types.byte,
  Timing1: ref.types.byte,
  Mode: ref.types.byte,
})

const BoardInfo = Struct({
  hw_Version: ref.types.ushort,
  fw_Version: ref.types.ushort,
  dr_Version: ref.types.ushort,
  in_Version: ref.types.ushort,
  irq_Num: ref.types.ushort,
  can_Num: ref.types.byte,
  str_Serial_Num: RefArray(ref.types.byte, 20),
  str_hw_Type: RefArray(ref.types.byte, 40),
  Reserved: RefArray(ref.types.ushort, 4),
})

const eCan = ffi.Library(`./ECanVic64.dll`, {
  OpenDevice: [
    ref.types.uint,
    [ref.types.uint32, ref.types.uint32, ref.types.uint32],
  ],
  CloseDevice: [ref.types.uint, [ref.types.uint32, ref.types.uint32]],
  InitCAN: [
    ref.types.uint,
    [
      ref.types.uint32,
      ref.types.uint32,
      ref.types.uint32,
      ref.refType(InitConfig),
    ],
  ],
  StartCAN: [
    ref.types.uint,
    [ref.types.uint32, ref.types.uint32, ref.types.uint32],
  ],
  ResetCAN: [
    ref.types.uint,
    [ref.types.uint32, ref.types.uint32, ref.types.uint32],
  ],
  Transmit: [
    ref.types.uint,
    [
      ref.types.uint32,
      ref.types.uint32,
      ref.types.uint32,
      RefArray(ref.refType(CANObj)),
      ref.types.uint16,
    ],
  ],
  Receive: [
    ref.types.uint,
    [
      ref.types.uint32,
      ref.types.uint32,
      ref.types.uint32,
      ref.refType(CANObj),
      ref.types.uint32,
      ref.types.uint32,
    ],
  ],
  ReadErrInfo: [
    ref.types.uint,
    [
      ref.types.uint32,
      ref.types.uint32,
      ref.types.uint32,
      ref.refType(CANErrInfo),
    ],
  ],
  ReadBoardInfo: [
    ref.types.uint,
    [ref.types.uint32, ref.types.uint32, ref.refType(BoardInfo)],
  ],
})

export default eCan
