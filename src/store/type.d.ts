declare namespace StoreType {
  interface IOperateStateObj {
    operate: 'ADD' | 'DELETE' | 'MOVE' | 'MODIFY' | undefined
    operateType: SharedType.IToolTypes
    id: string
    shiftX: number
    shiftY: number
  }

  interface IOperateState extends IOperateStateObj {
    setCtxObj?: (data: Partial<IOperateStateObj>) => void
  }
}
