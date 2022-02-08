declare namespace StoreType {
  interface IOperateStateObj {
    operate: 'ADD' | 'DELETE' | 'MOVE' | 'MODIFY' | undefined
    operateType: SharedType.IToolTypes | undefined
  }

  interface IOperateState extends IOperateStateObj {
    setCtxObj?: (data: IOperateStateObj) => void
  }
}
