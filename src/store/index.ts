import { createContext } from 'react'

// state 默认值
export const operateState: StoreType.IOperateState = {
  operate: undefined,
  operateType: undefined,
  shiftX: 0,
  shiftY: 0
}

// context
export const EditorContext = createContext(operateState)

// 修改 ctx 的方法
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
