import { createContext } from 'react'

export const operateState: StoreType.IOperateState = {
  operate: undefined,
  operateType: undefined,
  shiftX: 0,
  shiftY: 0
}

export const EditorContext = createContext(operateState)

export const changeCtxHandler = (
  ctx: StoreType.IOperateState,
  data: StoreType.IOperateStateObj
) => {
  const { setCtxObj } = ctx
  if (setCtxObj) {
    setCtxObj({ ...ctx, ...data })
  } else {
    console.error('cannot find setCtxObj method')
  }
}
